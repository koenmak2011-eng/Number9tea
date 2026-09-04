# Menu CMS

Edit `menu.csv` to update the website menu. Each active row must have a matching PNG in `CMS/images/`, named exactly after its three-character ID, for example `A02.png`.

The ID format is one uppercase category letter followed by two digits. Category letters are defined in `categories.csv`; the supplied mapping is:

- `A`: Bubble teas
- `B`: Waffles
- `C`: Ice cream
- `D`: Coffee
- `E`: Fruit teas
- `F`: Café treats

## Menu columns

| Column          | Expected value                                      |
| --------------- | --------------------------------------------------- |
| `id`            | Unique ID matching `^[A-Z][0-9]{2}$`                |
| `name`          | Customer-facing item name                           |
| `description`   | Short description; quote text containing commas     |
| `price`         | GBP number such as `6.50`, or blank for “Ask us”    |
| `tag`           | Short label such as `The classic`                    |
| `featured`      | `true` or `false` for the favourites filter          |
| `hot_available` | `true` or `false`                                    |
| `active`        | `true` to publish; `false` to hide                    |
| `colour`        | `peach`, `lilac`, `butter`, `sage` or `pink`         |
| `sort_order`    | Whole number controlling order within the category   |
| `allergens`     | Brief guidance shown in the ordering window          |

Run `npm run cms:check` before committing. `npm run dev` and `npm run build` automatically validate the CSV, copy active images into the public build and regenerate the menu data. Invalid IDs, duplicate IDs, unknown categories and missing images stop the build with a clear error.

In `categories.csv`, `kind` must be `drink` or `food`. Drink categories receive temperature and sweetness controls in the WhatsApp order window. Add another category by assigning an unused uppercase letter and a unique lowercase slug.
