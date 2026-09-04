import assert from "node:assert/strict";
import test from "node:test";
import {
  filterProducts,
  orderMessage,
  products,
  whatsappUrl,
} from "../src/lib/shop.ts";

test("WhatsApp safely encodes the full order and uses the shop's number", () => {
  const message = orderMessage(
    products[3],
    2,
    "Iced",
    "Less sweet",
    "No ice & ask about allergens",
  );
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/447766628285");
  assert.equal(url.searchParams.get("text"), message);
  assert.match(message, /2 x Peach & Lychee/);
  assert.match(message, /No ice & ask about allergens/);
});

test("fruit teas cannot be ordered hot and quantities remain in range", () => {
  assert.match(
    orderMessage(products[3], 40, "Hot", "Regular", ""),
    /9 x Peach & Lychee\nTemperature: Iced/,
  );
  assert.match(
    orderMessage(products[0], 0, "Hot", "Regular", ""),
    /1 x Brown Sugar/,
  );
});

test("desserts omit drink options and unconfirmed prices", () => {
  const desserts = filterProducts("cafe-treats");
  assert.equal(desserts.length, 2);
  assert.ok(desserts.every((product) => product.price === null));
  const message = orderMessage(desserts[0], 1, "Hot", "Regular", "");
  assert.doesNotMatch(message, /Temperature|Sweetness|£/);
  assert.match(message, /confirm availability/);
});

test("menu filters return only the selected category", () => {
  assert.equal(filterProducts("favourites").length, 4);
  for (const category of ["bubble-tea", "fruit-tea", "cafe-treats"] as const) {
    assert.ok(filterProducts(category).length > 0);
    assert.ok(
      filterProducts(category).every(
        (product) => product.category === category,
      ),
    );
  }
});
