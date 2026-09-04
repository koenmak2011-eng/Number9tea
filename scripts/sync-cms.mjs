import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const cmsDirectory = path.join(root, "CMS");
const sourceImages = path.join(cmsDirectory, "images");
const publicImages = path.join(root, "public", "menu-images");
const generatedFile = path.join(root, "src", "generated", "menu-data.json");
const checkOnly = process.argv.includes("--check");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field.trim());
      field = "";
    } else if (character === "\n") {
      row.push(field.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }
  row.push(field.trim());
  if (row.some(Boolean)) rows.push(row);

  if (quoted) throw new Error("CSV contains an unclosed quoted field.");
  const [headers, ...values] = rows;
  if (!headers) return [];
  return values.map((cells, rowIndex) => {
    if (cells.length !== headers.length) {
      throw new Error(`CSV row ${rowIndex + 2} has ${cells.length} fields; expected ${headers.length}.`);
    }
    return Object.fromEntries(headers.map((header, index) => [header, cells[index]]));
  });
}

function readCsv(name) {
  const file = path.join(cmsDirectory, name);
  if (!fs.existsSync(file)) throw new Error(`Missing CMS/${name}.`);
  return parseCsv(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
}

function required(row, field, context) {
  const value = row[field]?.trim();
  if (!value) throw new Error(`${context}: ${field} is required.`);
  return value;
}

function booleanValue(value, field, context) {
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`${context}: ${field} must be true or false.`);
}

function wholeNumber(value, field, context) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${context}: ${field} must be a positive whole number.`);
  }
  return parsed;
}

const categoryRows = readCsv("categories.csv");
const categoryCodes = new Set();
const categorySlugs = new Set();
const categories = categoryRows.map((row, index) => {
  const context = `categories.csv row ${index + 2}`;
  const code = required(row, "code", context);
  const id = required(row, "slug", context);
  if (!/^[A-Z]$/.test(code)) throw new Error(`${context}: code must be one uppercase letter.`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`${context}: slug must use lowercase kebab-case.`);
  if (categoryCodes.has(code)) throw new Error(`${context}: duplicate code ${code}.`);
  if (categorySlugs.has(id)) throw new Error(`${context}: duplicate slug ${id}.`);
  categoryCodes.add(code);
  categorySlugs.add(id);
  const kind = required(row, "kind", context);
  if (kind !== "drink" && kind !== "food") {
    throw new Error(`${context}: kind must be drink or food.`);
  }
  return {
    code,
    id,
    label: required(row, "label", context),
    kind,
    sortOrder: wholeNumber(required(row, "sort_order", context), "sort_order", context),
  };
}).sort((left, right) => left.sortOrder - right.sortOrder);

const categoryByCode = new Map(categories.map((category) => [category.code, category]));
const allowedColours = new Set(["peach", "lilac", "butter", "sage", "pink"]);
const seenIds = new Set();
const menuRows = readCsv("menu.csv");
const products = [];

for (const [index, row] of menuRows.entries()) {
  const context = `menu.csv row ${index + 2}`;
  const id = required(row, "id", context);
  if (!/^[A-Z][0-9]{2}$/.test(id)) throw new Error(`${context}: id ${id} must match A01, B02 or C12.`);
  if (seenIds.has(id)) throw new Error(`${context}: duplicate id ${id}.`);
  seenIds.add(id);

  const category = categoryByCode.get(id[0]);
  if (!category) throw new Error(`${context}: ${id[0]} is not defined in categories.csv.`);
  const active = booleanValue(required(row, "active", context), "active", context);
  if (!active) continue;

  const colour = required(row, "colour", context);
  if (!allowedColours.has(colour)) throw new Error(`${context}: unsupported colour ${colour}.`);
  const rawPrice = row.price?.trim() ?? "";
  const price = rawPrice === "" ? null : Number(rawPrice);
  if (price !== null && (!Number.isFinite(price) || price < 0)) {
    throw new Error(`${context}: price must be a non-negative number or blank.`);
  }

  const imageName = `${id}.png`;
  const imagePath = path.join(sourceImages, imageName);
  if (!fs.existsSync(imagePath)) throw new Error(`${context}: missing CMS/images/${imageName}.`);

  products.push({
    id,
    name: required(row, "name", context),
    category: category.id,
    description: required(row, "description", context),
    price,
    image: `/menu-images/${imageName}`,
    colour,
    tag: required(row, "tag", context),
    favourite: booleanValue(required(row, "featured", context), "featured", context),
    hotAvailable: booleanValue(required(row, "hot_available", context), "hot_available", context),
    isDrink: category.kind === "drink",
    allergens: row.allergens?.trim() ?? "",
    sortOrder: wholeNumber(required(row, "sort_order", context), "sort_order", context),
  });
}

products.sort((left, right) => {
  const leftCategory = categoryByCode.get(left.id[0])?.sortOrder ?? 0;
  const rightCategory = categoryByCode.get(right.id[0])?.sortOrder ?? 0;
  return leftCategory - rightCategory || left.sortOrder - right.sortOrder;
});

const publishedCategoryIds = new Set(products.map((product) => product.category));
const publishedCategories = categories.filter((category) => publishedCategoryIds.has(category.id));
if (products.length === 0) throw new Error("CMS/menu.csv has no active menu items.");

if (!checkOnly) {
  fs.rmSync(publicImages, { recursive: true, force: true });
  fs.mkdirSync(publicImages, { recursive: true });
  for (const product of products) {
    fs.copyFileSync(path.join(sourceImages, `${product.id}.png`), path.join(publicImages, `${product.id}.png`));
  }
  fs.mkdirSync(path.dirname(generatedFile), { recursive: true });
  fs.writeFileSync(generatedFile, `${JSON.stringify({ categories: publishedCategories, products }, null, 2)}\n`);
}

console.log(`CMS valid: ${products.length} active items across ${publishedCategories.length} categories${checkOnly ? "." : "; website data regenerated."}`);
