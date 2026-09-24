# G-man's Home & Laundry Care — Website

Seven files make up the whole site:
- `index.html` — the page content
- `styles.css` — all the colours, spacing and layout
- `script.js` — the price list, cart logic, house cleaning calculator, and WhatsApp booking link
- `header-bg.jpg` — the banner photo behind the business name at the top
- `badge.jpg` — currently unused (kept in case you want the circular photo back)
- `footer-bg.jpg` — the photo band across the bottom section

## 1. Before you upload: two things to change

Open `script.js` and edit:

1. **`WHATSAPP_NUMBER`** near the top — put your real WhatsApp number here,
   written as digits only, no `+` or spaces (Namibia's country code is `264`,
   so a number like 081 123 4567 becomes `264811234567`).
2. **The `CATEGORIES` list and `HOUSE_CLEANING_RATES`** — every `price:`
   value (and the house cleaning rates) is a placeholder right now. Replace
   each one with your real price. You can also rename items, add new ones,
   or delete ones you don't offer — just keep the same
   `{ name: "...", unit: "...", price: 0 },` shape for each line.

Want a different banner photo later? Just replace `hero.jpg` with a new
image of the same name (or update the filename in `styles.css`, under the
`.site-header` comment).

## 2. Put it on GitHub Pages (free hosting)

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository**. Name it something like `gmans-laundry`. Keep it Public.
3. Click **Add file → Upload files**, then drag in all files
   (`index.html`, `styles.css`, `script.js`, `header-bg.jpg`, `footer-bg.jpg` — `badge.jpg` optional).
4. Click **Commit changes**.
5. Go to the repository's **Settings → Pages**.
6. Under "Build and deployment", set the source branch to `main` (or
   `master`) and folder to `/ (root)`, then **Save**.
7. Wait a minute or two, then refresh — GitHub will show your live link,
   something like `https://yourusername.github.io/gmans-laundry/`.

That link works immediately, on any phone or computer — no domain needed yet.
When you're ready to buy a domain, you point it at this same site through
your domain registrar's settings, and everything keeps working as-is.

## 3. Making changes later

- **Small edits (like a price)**: on GitHub's website, open the file, click
  the pencil (edit) icon, make your change, and click **Commit changes**.
  The live site updates within a minute or two automatically.
- **Bigger changes**: edit the files on your computer (e.g. in VS Code),
  then re-upload them the same way as step 2.3 above.

## What's already built in

- Categories and prices are pulled from one list in `script.js` — no need
  to touch the HTML to add or change services.
- House cleaning has its own quote calculator: bedrooms, ensuite bedrooms,
  walk-in closet bedrooms, and open living area (m²) each add to the price
  live, then get added to the basket as one line.
- The basket remembers what a customer picked even if they navigate away,
  until they clear it or send the booking.
- "Send booking on WhatsApp" opens WhatsApp with the full order and total
  pre-filled — the customer just has to hit send.
- A cart icon in the header is always visible (with a live item count), and
  a floating WhatsApp button sits bottom-right at all times.
- The layout is mobile-first and responsive, so it works properly on
  phones, tablets, and desktop.
