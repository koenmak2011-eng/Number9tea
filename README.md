# No.9 Bubble Tea

A responsive Next.js landing-page project for No.9 Bubble Tea, 50 Lichfield Street, Wolverhampton. It contains three separate visual concepts with real No.9 drink photos, interactive menus, playful collectible reveals and pre-filled WhatsApp ordering.

- `/`: combined flagship with the transparent banner, full filterable menu, detailed WhatsApp ordering, merchandise interactions, social profiles and delivery links.
- `/club`: cobalt, coral and yellow Bubble Tea Social Club concept using the owner-supplied circular logo.
- `/final`: bright yellow, navy and candy-pink concept built around the owner-supplied transparent drink banner.

## Run locally

Requires Node.js 20.9+ for Next.js. Use **Node.js 24+** to run the TypeScript tests directly (the version used for development).

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```bash
npm run build       # Create the production build
npm start           # Serve the production build
npm run lint        # ESLint and Next.js rules
npm run typecheck   # TypeScript checks
npm test            # Menu filtering and WhatsApp message tests
npm run format      # Format application code, tests and root documents
```

Dependencies are locked in `package-lock.json`. No environment variables, API keys or external database are required.

## Structure

- `src/app/`: App Router page, layout, metadata, icon and responsive styles.
- `src/app/club/`: separate Social Club route, metadata and route-scoped styles.
- `src/app/final/`: final banner-led route, metadata and route-scoped styles.
- `src/components/landing-page.tsx`: combined flagship, accessible native order dialog, menu filters, reveal interactions and external social/delivery links.
- `src/components/club-page.tsx`: Social Club layout, menu filters, direct ordering and merchandise interactions.
- `src/components/final-page.tsx`: banner-led layout, flavour stage, direct ordering and merchandise reveal.
- `src/lib/shop.ts`: shop information, products, guide prices and WhatsApp message generation.
- `public/images/`: locally hosted No.9 product photography.
- `public/fonts/`: self-hosted Outfit font and its SIL Open Font License.
- `tests/`: Node test runner tests for ordering and filtering.
- `.agents/skills/`: project-local design skills requested by the owner.

## Updating shop content

The main menu is generated from `CMS/menu.csv`. Each active row uses a unique ID such as `A01` and requires a matching image at `CMS/images/A01.png`. The leading letter maps to a category in `CMS/categories.csv`; categories with no active items are hidden automatically.

```bash
npm run cms:check    # Validate CSV values, IDs and images
npm run cms:sync     # Regenerate web menu data and public images
```

Both `npm run dev` and `npm run build` run the sync automatically. A GitHub-connected deployment therefore rebuilds the menu whenever the CSV or CMS images change. See [CMS/README.md](CMS/README.md) for the complete column guide and category mapping.

General shop information and WhatsApp helpers remain in `src/lib/shop.ts`. To display confirmed opening hours, replace `shop.openingHours: null` with entries such as `{ days: "Monday", hours: "Owner-confirmed hours" }`.

The starter drink names, photos and £6.50 guide prices were sourced from [No.9's public Deliveroo menu](https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/no9-bubble-tea-50-lichfield-street), checked on 4 September 2026. The page clearly identifies these as delivery-menu guide prices, which may differ from collection prices. See [ASSETS.md](ASSETS.md) for asset provenance.

The owner's brief supplies the address, WhatsApp number, dessert names and merchandise categories. **Still needed from the owner:** confirmed opening hours, collection prices, dessert photography and prices, and actual merchandise photographs/current stock. Until supplied, the hours block links to WhatsApp, desserts use decorative artwork with “Ask us” pricing, and the merchandise boxes are an illustrative interaction rather than a representation of actual packaging or stock. The location illustration is decorative; the directions link opens Google Maps for the exact address.

## Behaviour and accessibility

Product selection opens a keyboard-accessible configuration dialog. Customers can add several configured products to a basket, adjust quantities, remove lines and continue shopping. The complete basket—including CMS IDs, drink preferences and notes—is URL-encoded into one message to `https://wa.me/447766628285`. The customer sends the message in WhatsApp; the website does not send messages, take payment or promise availability. Closing either dialog restores focus and page scrolling.

GSAP provides desktop pinning and scroll-linked text reveals. Motion respects `prefers-reduced-motion`, and the marquee has a pause control. Fonts and product images are self-hosted; there are no analytics or embedded third-party maps.

## Delivery status

Built for local review. It has not been deployed to a public host. Before publishing, confirm the remaining shop content above and configure a canonical domain/social preview image if desired.
