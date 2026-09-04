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

Edit the `shop` and `products` exports in `src/lib/shop.ts`. A product's `image` is a path under `public/`; its `price` is a number or `null` when unconfirmed. To display confirmed opening hours, replace `shop.openingHours: null` with entries such as `{ days: "Monday", hours: "Owner-confirmed hours" }`.

Drink names, photos and £6.50 guide prices were sourced from [No.9's public Deliveroo menu](https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/no9-bubble-tea-50-lichfield-street), checked on 4 September 2026. The page clearly identifies these as delivery-menu guide prices, which may differ from collection prices. See [ASSETS.md](ASSETS.md) for asset provenance.

The owner's brief supplies the address, WhatsApp number, dessert names and merchandise categories. **Still needed from the owner:** confirmed opening hours, collection prices, dessert photography and prices, and actual merchandise photographs/current stock. Until supplied, the hours block links to WhatsApp, desserts use decorative artwork with “Ask us” pricing, and the merchandise boxes are an illustrative interaction rather than a representation of actual packaging or stock. The location illustration is decorative; the directions link opens Google Maps for the exact address.

## Behaviour and accessibility

Product selection opens a keyboard-accessible dialog. Quantity, drink preferences and notes are URL-encoded into a message to `https://wa.me/447766628285`. The customer sends the message in WhatsApp; the website does not send messages, take payment or promise availability. Closing the dialog restores focus and page scrolling.

GSAP provides desktop pinning and scroll-linked text reveals. Motion respects `prefers-reduced-motion`, and the marquee has a pause control. Fonts and product images are self-hosted; there are no analytics or embedded third-party maps.

## Delivery status

Built for local review. It has not been deployed to a public host. Before publishing, confirm the remaining shop content above and configure a canonical domain/social preview image if desired.
