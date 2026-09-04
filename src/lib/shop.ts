export const shop = {
  name: "No.9 Bubble Tea",
  phone: "447766628285",
  displayPhone: "+44 7766 628285",
  address: "50 Lichfield St, Wolverhampton WV1 1DG, United Kingdom",
  openingHours: null as { days: string; hours: string }[] | null,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=No.9+Bubble+Tea+50+Lichfield+Street+Wolverhampton+WV1+1DG",
  menuSource:
    "https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/no9-bubble-tea-50-lichfield-street",
};

export type Category = string;

export type MenuCategory = {
  code: string;
  id: string;
  label: string;
  kind: "drink" | "food";
  sortOrder: number;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number | null;
  image: string | null;
  colour: string;
  tag: string;
  favourite: boolean;
  hotAvailable?: boolean;
  isDrink?: boolean;
  allergens?: string;
  sortOrder?: number;
};

export type CartOrderLine = {
  product: Product;
  quantity: number;
  temperature: "Iced" | "Hot";
  sweetness: string;
  notes: string;
};

export const products: Product[] = [
  {
    id: "brown-sugar",
    name: "Brown Sugar Milk Tea",
    category: "bubble-tea",
    description: "Caramel swirls. Creamy milk tea. Chewy little pearls of joy.",
    price: 6.5,
    image: "/images/brown-sugar.jpg",
    colour: "peach",
    tag: "The classic",
    favourite: true,
    hotAvailable: true,
  },
  {
    id: "taro",
    name: "Taro Milk Tea",
    category: "bubble-tea",
    description: "Soft, nutty and wonderfully purple. Your cosy sip, sorted.",
    price: 6.5,
    image: "/images/taro-milk-tea.jpg",
    colour: "lilac",
    tag: "A little dreamy",
    favourite: true,
    hotAvailable: true,
  },
  {
    id: "mango",
    name: "Mango Milk Tea",
    category: "bubble-tea",
    description: "Sweet mango meets creamy milk. A tiny tropical escape.",
    price: 6.5,
    image: "/images/mango-milk-tea.jpg",
    colour: "butter",
    tag: "Sunshine in a cup",
    favourite: true,
    hotAvailable: true,
  },
  {
    id: "peach-lychee",
    name: "Peach & Lychee",
    category: "fruit-tea",
    description: "Peachy, fragrant and refreshingly fruity. Pop, sip, repeat.",
    price: 6.5,
    image: "/images/peach-lychee.jpg",
    colour: "sage",
    tag: "Feeling fruity",
    favourite: true,
  },
  {
    id: "strawberry",
    name: "Strawberry Fruit Tea",
    category: "fruit-tea",
    description: "A berry-bright tea with popping boba. A very good mood.",
    price: 6.5,
    image: "/images/strawberry-fruit-tea.jpg",
    colour: "pink",
    tag: "Berry good",
    favourite: false,
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    category: "cafe-treats",
    description:
      "Your coffee break, by the spoonful. Ask us for today's slice.",
    price: null,
    image: null,
    colour: "butter",
    tag: "One more spoon",
    favourite: false,
  },
  {
    id: "lava-cake",
    name: "Chocolate Lava Cake",
    category: "cafe-treats",
    description: "A warm chocolate moment. Made for slowing down.",
    price: null,
    image: null,
    colour: "pink",
    tag: "The sweet spot",
    favourite: false,
  },
];

export function filterProducts(
  category: Category,
  source: Product[] = products,
): Product[] {
  return source.filter((product) =>
    category === "favourites"
      ? product.favourite
      : product.category === category,
  );
}

export function whatsappUrl(
  message = "Hi No.9! I'd love to place an order. Could you help me choose?",
) {
  return `https://wa.me/${shop.phone}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(
  product: Product,
  quantity: number,
  temperature: "Iced" | "Hot",
  sweetness: string,
  notes: string,
): string {
  const count = Math.max(1, Math.min(9, Math.floor(quantity) || 1));
  const drink = product.isDrink ?? product.category !== "cafe-treats";
  const lines = [
    "Hi No.9! I'd like to order:",
    `${count} x ${product.name}`,
    ...(drink
      ? [
          `Temperature: ${product.hotAvailable ? temperature : "Iced"}`,
          `Sweetness preference: ${sweetness}`,
        ]
      : []),
    ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
    "Could you confirm availability, options, price and collection time? Thank you!",
  ];
  return lines.join("\n");
}

export function cartMessage(lines: CartOrderLine[]): string {
  const itemLines = lines.flatMap((line, index) => {
    const count = Math.max(1, Math.min(9, Math.floor(line.quantity) || 1));
    const drink =
      line.product.isDrink ?? line.product.category !== "cafe-treats";
    return [
      `${index + 1}. ${count} x ${line.product.name} (${line.product.id})`,
      ...(drink
        ? [
            `   Temperature: ${line.product.hotAvailable ? line.temperature : "Iced"}`,
            `   Sweetness: ${line.sweetness}`,
          ]
        : []),
      ...(line.notes.trim() ? [`   Notes: ${line.notes.trim()}`] : []),
    ];
  });
  const knownTotal = lines.reduce(
    (total, line) => total + (line.product.price ?? 0) * line.quantity,
    0,
  );
  const hasKnownPrice = lines.some((line) => line.product.price !== null);

  return [
    "Hi No.9! I'd like to order:",
    "",
    ...itemLines,
    ...(hasKnownPrice
      ? ["", `Menu price estimate: £${knownTotal.toFixed(2)}`]
      : []),
    "",
    "Could you confirm availability, final price and collection time? Thank you!",
  ].join("\n");
}
