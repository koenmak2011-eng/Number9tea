# Asset sources

## No.9 product photography

The photographs below were downloaded from image URLs displayed in [No.9 Bubble Tea's public Deliveroo menu](https://deliveroo.co.uk/menu/birmingham/wolverhampton-city-centre/no9-bubble-tea-50-lichfield-street) on 4 September 2026. Original imagery is preserved; the interface uses CSS framing and Next.js image optimisation. No stock or AI-generated product photography is used. Confirm permission to reuse the shop's delivery-listing images before public publication.

| Local file                               | Original source                                                                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `public/images/brown-sugar.jpg`          | [Brown sugar milk tea](https://rs-menus-api.roocdn.com/images/54b6ec24-035e-4d9c-8678-65fdae4df6f7/image.jpeg) |
| `public/images/taro-milk-tea.jpg`        | [Taro milk tea](https://rs-menus-api.roocdn.com/images/8d6bdcdd-995c-4d83-86fc-5c1ee50e4857/image.jpeg)        |
| `public/images/mango-milk-tea.jpg`       | [Mango milk tea](https://rs-menus-api.roocdn.com/images/ef31f3eb-c65e-44ed-8fcc-5eaaa3fd95a0/image.jpeg)       |
| `public/images/peach-lychee.jpg`         | [Peach and lychee tea](https://rs-menus-api.roocdn.com/images/798a9fda-3b40-4376-b5ee-fbad6ede4d8c/image.jpeg) |
| `public/images/strawberry-fruit-tea.jpg` | [Strawberry fruit tea](https://rs-menus-api.roocdn.com/images/32fd8ec8-4956-413d-80fb-b1077b155210/image.jpeg) |

The starter files in `CMS/images/` are size-optimised PNG conversions of the matching photographs above. Their CMS IDs are `A01` (brown sugar), `A02` (taro), `A03` (mango), `E01` (peach and lychee) and `E02` (strawberry). `public/menu-images/` is generated from these files and is not committed.

## Owner-supplied logo

`public/images/no9-logo.jpg` is an unchanged copy of the logo supplied by the owner as `OKTEST.jpg` on 4 September 2026. The `/club` route displays it as the primary brand mark.

## Owner-supplied drink banner

`public/images/no9-banner.png` is an unchanged copy of the transparent drink line-up supplied by the owner on 4 September 2026. The `/final` route uses the original alpha channel in its hero, flavour stage and closing call to action; CSS changes the framing without adding a photographic background.

## Typography and graphics

- [Outfit](https://fonts.google.com/specimen/Outfit), distributed under the SIL Open Font License; license included in `public/fonts/OFL.txt`.
- [Phosphor Icons](https://github.com/phosphor-icons/react), MIT licensed dependency.
- Wordmark treatment, cup doodle, illustrative map and CSS surprise boxes were created for this site. The boxes and dessert icons are decorative artwork, not photographs of shop merchandise or desserts.
