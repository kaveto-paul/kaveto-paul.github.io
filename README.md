# G-man's Home & Laundry Care — Website

Three files make up the whole site:
- `index.html` — the page content
- `styles.css` — all the colours, spacing and layout
- `script.js` — the price list, cart logic, and WhatsApp booking link

## 1. Before you upload: two things to change

Open `script.js` and edit:

1. **`WHATSAPP_NUMBER`** near the top — put your real WhatsApp number here,
   written as digits only, no `+` or spaces (Namibia's country code is `264`,
   so a number like 081 123 4567 becomes `264811234567`).
2. **The `CATEGORIES` list** — every `price:` value is a placeholder right
   now. Replace each one with your real price. You can also rename items,
   add new ones, or delete ones you don't offer — just keep the same
   `{ name: "...", unit: "...", price: 0 },` shape for each line.

## 2. Put it on GitHub Pages (free hosting)

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository**. Name it something like `gmans-laundry`. Keep it Public.
3. Click **Add file → Upload files**, then drag in all three files
   (`index.html`, `styles.css`, `script.js`).
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
- The basket remembers what a customer picked even if they navigate away,
  until they clear it or send the booking.
- "Send booking on WhatsApp" opens WhatsApp with the full order and total
  pre-filled — the customer just has to hit send.
- The layout is mobile-first and responsive, so it works properly on
  phones, tablets, and desktop.
