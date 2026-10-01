/* =========================================================
   G-man's Home & Laundry Care — site data & cart logic
   =========================================================
   EDIT PRICES HERE (all amounts in N$). Add or remove items/categories
   freely; the site rebuilds itself from this list.
   ========================================================= */

const WHATSAPP_NUMBER = "264812797483"; // Business WhatsApp number

const CATEGORIES = [
  {
    id: "wash-fold",
    label: "Wash & Fold",
    note: "Washed, dried and folded — priced per piece. Pick a group below.",
    unit: "per piece",
    groups: [
      {
        id: "tops",
        label: "T-shirts & Tops",
        items: [
          { name: "T-shirt", price: 15 },
          { name: "Vest / singlet", price: 12 },
          { name: "Polo shirt", price: 18 },
          { name: "Long-sleeve top", price: 18 },
          { name: "Casual shirt", price: 20 },
          { name: "Top / blouse (casual)", price: 20 },
          { name: "Hoodie", price: 30 },
          { name: "Sweater", price: 28 },
          { name: "Jersey / jumper", price: 28 },
          { name: "Tracksuit top", price: 25 },
        ],
      },
      {
        id: "bottoms",
        label: "Bottoms",
        items: [
          { name: "Jeans", price: 25 },
          { name: "Trousers", price: 22 },
          { name: "Shorts", price: 18 },
          { name: "Leggings", price: 15 },
          { name: "Tracksuit pants / joggers", price: 22 },
          { name: "Casual skirt", price: 20 },
          { name: "Cargo pants", price: 25 },
        ],
      },
      {
        id: "dresses",
        label: "Dresses, Socks & One-piece",
        items: [
          { name: "Casual dress", price: 30 },
          { name: "Nightdress", price: 22 },
          { name: "Pyjama set (2-piece)", price: 30 },
          { name: "Pyjama top or bottom (single)", price: 15 },
          { name: "Jumpsuit", price: 35 },
          { name: "Overall / coverall", price: 35 },
          { name: "Kaftan / gown", price: 35 },
          { name: "Socks", price: 6, unit: "per pair" },
        ],
      },
      {
        id: "sportswear",
        label: "Sportswear",
        items: [
          { name: "Sports jersey / kit top", price: 18 },
          { name: "Sports shorts", price: 15 },
          { name: "Sports leggings", price: 18 },
          { name: "Gym vest", price: 12 },
          { name: "Full sports kit (top + shorts)", price: 30, unit: "per set" },
        ],
      },
      {
        id: "uniforms",
        label: "School & Work Uniforms",
        items: [
          { name: "School shirt", price: 15 },
          { name: "School trousers", price: 20 },
          { name: "School skirt / dress", price: 22 },
          { name: "School jersey / blazer", price: 28 },
          { name: "Work shirt", price: 18 },
          { name: "Work trousers", price: 22 },
          { name: "Work overalls", price: 35 },
          { name: "Scrubs (top or pants)", price: 20 },
          { name: "Kitchen / chef jacket", price: 25 },
          { name: "Reflective vest", price: 15 },
        ],
      },
      {
        id: "children",
        label: "Children & Baby",
        items: [
          { name: "Baby clothes (bodysuit, vest, romper)", price: 10 },
          { name: "Baby blanket", price: 35 },
          { name: "Children's T-shirt / top", price: 12 },
          { name: "Children's trousers / jeans", price: 18 },
          { name: "Children's dress", price: 20 },
          { name: "Children's pyjamas", price: 18 },
          { name: "Children's jersey / hoodie", price: 20 },
        ],
      },
      {
        id: "towels",
        label: "Towels & Bathroom",
        items: [
          { name: "Bath towel", price: 30 },
          { name: "Hand towel", price: 15 },
          { name: "Bath mat", price: 30 },
          { name: "Bathrobe", price: 45 },
        ],
      },
      {
        id: "bedding",
        label: "Bedding & Linen",
        items: [
          { name: "Bedsheet (flat or fitted)", price: 35 },
          { name: "Duvet cover", price: 50 },
          { name: "Pillowcase", price: 12 },
          { name: "Cushion cover - small", price: 15 },
          { name: "Cushion cover - medium", price: 20 },
          { name: "Cushion cover - large", price: 25 },
        ],
      },
      {
        id: "kitchen",
        label: "Kitchen & Dining",
        items: [
          { name: "Tea towel", price: 8 },
          { name: "Apron", price: 15 },
          { name: "Oven glove", price: 10 },
          { name: "Napkin", price: 8 },
          { name: "Tablecloth (up to 2m)", price: 35 },
          { name: "Tablecloth (up to 4m)", price: 60 },
        ],
      },
      {
        id: "accessories",
        label: "Accessories",
        items: [
          { name: "Scarf", price: 15 },
          { name: "Beanie / winter hat", price: 15 },
          { name: "Cap / hat", price: 15 },
          { name: "Gloves", price: 12, unit: "per pair" },
          { name: "Bandana", price: 8 },
        ],
      },
    ],
  },
  {
    id: "wash-iron",
    label: "Wash & Iron",
    note: "Washed and ironed — priced per piece. Pick a group below.",
    unit: "per piece",
    groups: [
      {
        id: "shirts",
        label: "Shirts",
        items: [
          { name: "Shirt on hanger (short-sleeve)", price: 25 },
          { name: "Shirt on hanger (long-sleeve)", price: 28 },
          { name: "Formal / dress shirt", price: 30 },
          { name: "Delicate shirt (silk, linen, satin)", price: 45 },
        ],
      },
      {
        id: "tops",
        label: "Tops",
        items: [
          { name: "Blouse", price: 30 },
          { name: "Top", price: 25 },
          { name: "Polo shirt on hanger", price: 25 },
          { name: "T-shirt on hanger", price: 22 },
          { name: "Jersey / jumper", price: 35 },
          { name: "Jersey / jumper - delicate", price: 50 },
          { name: "Cardigan", price: 35 },
        ],
      },
      {
        id: "bottoms",
        label: "Bottoms",
        items: [
          { name: "Trousers", price: 30 },
          { name: "Formal trousers", price: 35 },
          { name: "Jeans", price: 32 },
          { name: "Shorts", price: 25 },
          { name: "Skirt", price: 30 },
        ],
      },
      {
        id: "dresses",
        label: "Dresses & One-piece",
        items: [
          { name: "Dress", price: 45 },
          { name: "Jumpsuit", price: 50 },
          { name: "Kaftan / gown", price: 50 },
        ],
      },
      {
        id: "outerwear",
        label: "Outerwear",
        items: [
          { name: "Jacket / blazer", price: 50 },
          { name: "Waistcoat", price: 30 },
          { name: "Overcoat / raincoat", price: 70 },
          { name: "Puffer / down coat", price: 80 },
          { name: "Suit jacket", price: 60 },
          { name: "Suit trousers", price: 40 },
        ],
      },
      {
        id: "uniforms",
        label: "School & Work Uniforms",
        items: [
          { name: "School shirt", price: 22 },
          { name: "School trousers", price: 28 },
          { name: "School skirt / dress", price: 30 },
          { name: "Work shirt", price: 25 },
          { name: "Work trousers", price: 30 },
          { name: "Work overalls", price: 45 },
          { name: "Scrubs (top or pants)", price: 28 },
          { name: "Kitchen / chef jacket", price: 32 },
        ],
      },
      {
        id: "children",
        label: "Children & Baby",
        items: [
          { name: "Baby clothes", price: 15 },
          { name: "Children's shirt", price: 18 },
          { name: "Children's trousers", price: 22 },
          { name: "Children's dress", price: 28 },
          { name: "Children's school uniform", price: 25 },
        ],
      },
      {
        id: "nightwear",
        label: "Nightwear & Homewear",
        items: [
          { name: "Pyjama top or bottom", price: 22 },
          { name: "Pyjama set (2-piece)", price: 38 },
          { name: "Nightdress", price: 30 },
          { name: "Bathrobe", price: 55 },
        ],
      },
      {
        id: "linen",
        label: "Linen & Household",
        items: [
          { name: "Bedsheet", price: 45 },
          { name: "Duvet cover", price: 60 },
          { name: "Pillowcase", price: 18 },
          { name: "Cushion cover - small", price: 20 },
          { name: "Cushion cover - medium", price: 25 },
          { name: "Cushion cover - large", price: 30 },
          { name: "Tablecloth (up to 2m)", price: 40 },
          { name: "Tablecloth (up to 4m)", price: 70 },
          { name: "Napkin", price: 10 },
          { name: "Tea towel", price: 10 },
          { name: "Apron", price: 18 },
          { name: "Curtain (per panel)", price: 60, unit: "per panel" },
        ],
      },
      {
        id: "accessories",
        label: "Accessories",
        items: [
          { name: "Tie", price: 20 },
          { name: "Bow tie", price: 20 },
          { name: "Scarf", price: 20 },
          { name: "Handkerchief", price: 10 },
          { name: "Cap / hat", price: 20 },
        ],
      },
    ],
  },
  {
    id: "shoe-care",
    label: "Shoe Care",
    note: "All shoe types — priced per pair.",
    items: [
      { name: "Wash — coloured shoes", unit: "per pair", price: 50 },
      { name: "Wash — white shoes", unit: "per pair", price: 70 },
      { name: "Polishing", unit: "per pair", price: 35 },
      { name: "Renewal (Restoration)", unit: "per pair", price: 200 },
    ],
  },
  {
    id: "blankets-throws",
    label: "Blankets & Throws",
    note: "Larger bedding items needing extra care — priced by size.",
    items: [
      { name: "Blanket — Large", unit: "per item", price: 150 },
      { name: "Blanket — Medium", unit: "per item", price: 100 },
      { name: "Blanket — Small", unit: "per item", price: 80 },
      { name: "Throw — Large", unit: "per item", price: 80 },
      { name: "Throw — Medium", unit: "per item", price: 70 },
      { name: "Throw — Small", unit: "per item", price: 60 },
    ],
  },
  {
    id: "home-services",
    label: "Home Services",
    note: "House and upholstery cleaning, at your home.",
    items: [
      { name: "Sofa, 2-seater", unit: "per item", price: 150 },
      { name: "Sofa, 3-seater", unit: "per item", price: 200 },
      { name: "Couch — Large", unit: "per item", price: 200 },
      { name: "Couch — Medium", unit: "per item", price: 150 },
      { name: "Couch — Small", unit: "per item", price: 80 },
    ],
  },
];

/* House cleaning is priced by configuration, not a flat per-item price —
   EDIT THESE RATES here if they ever change. */
const HOUSE_CLEANING_RATES = {
  perBedroom: 250,
  perEnsuite: 130,
  perWalkIn: 150,
  perSqm: 35,
  bathroomBase: 130,
};

/* ===================== Cart state ===================== */

const CART_KEY = "gman_cart_v1";

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}
function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* storage unavailable — cart just won't persist across visits */
  }
}

let cart = loadCart(); // { "categoryId::itemName": qty }

const CUSTOM_CART_KEY = "gman_cart_custom_v1";
function loadCustomCart() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_CART_KEY)) || [];
  } catch {
    return [];
  }
}
function saveCustomCart(items) {
  try {
    localStorage.setItem(CUSTOM_CART_KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — cart just won't persist across visits */
  }
}
let customCart = loadCustomCart(); // [{ id, label, price }]

function itemKey(catId, itemName) {
  return catId + "::" + itemName;
}

/* Every item in a category (flattened across groups), each with its unit filled in. */
function catItems(cat) {
  const withUnit = (list, unit) => list.map((i) => ({ ...i, unit: i.unit || unit || "per item" }));
  if (cat.groups) return cat.groups.flatMap((g) => withUnit(g.items, cat.unit));
  return withUnit(cat.items, cat.unit);
}

function findItem(key) {
  const [catId, itemName] = key.split("::");
  const cat = CATEGORIES.find((c) => c.id === catId);
  if (!cat) return null;
  const item = catItems(cat).find((i) => i.name === itemName);
  if (!item) return null;
  return { cat, item };
}

/* Drop saved basket entries for items that no longer exist (e.g. after a price-list change). */
(function pruneCart() {
  let changed = false;
  Object.keys(cart).forEach((key) => {
    if (!findItem(key)) {
      delete cart[key];
      changed = true;
    }
  });
  if (changed) saveCart(cart);
})();

function cartTotal() {
  let total = 0;
  for (const key in cart) {
    const found = findItem(key);
    if (found) total += found.item.price * cart[key];
  }
  customCart.forEach((c) => (total += c.price));
  return total;
}
function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0) + customCart.length;
}

function fmt(n) {
  return "N$" + n.toLocaleString("en-NA");
}

/* ===================== Rendering ===================== */

let activeCategory = CATEGORIES[0].id;
const activeGroupByCat = {}; // remembers the chosen sub-tab for each category

function currentCat() {
  return CATEGORIES.find((c) => c.id === activeCategory);
}
function currentGroupId(cat) {
  if (!cat.groups) return null;
  if (!activeGroupByCat[cat.id]) activeGroupByCat[cat.id] = cat.groups[0].id;
  return activeGroupByCat[cat.id];
}

function renderTabs() {
  const wrap = document.getElementById("category-tabs");
  const scroll = wrap.scrollLeft;
  wrap.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-tab";
    btn.textContent = cat.label;
    btn.setAttribute("aria-pressed", cat.id === activeCategory ? "true" : "false");
    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      renderTabs();
      renderGroupTabs();
      renderItems();
    });
    wrap.appendChild(btn);
  });
  wrap.scrollLeft = scroll;
}

/* Second row of small tabs (Shirts, Bottoms, ...) for categories that have groups. */
function renderGroupTabs() {
  const wrap = document.getElementById("group-tabs");
  const cat = currentCat();
  const scroll = wrap.scrollLeft;
  wrap.innerHTML = "";
  wrap.style.display = cat.groups ? "flex" : "none";
  if (!cat.groups) return;
  const activeId = currentGroupId(cat);
  cat.groups.forEach((g) => {
    const btn = document.createElement("button");
    btn.className = "group-tab";
    btn.dataset.group = g.id;
    btn.setAttribute("aria-pressed", g.id === activeId ? "true" : "false");
    btn.innerHTML = `<span>${g.label}</span><span class="group-count" hidden></span>`;
    btn.addEventListener("click", () => {
      activeGroupByCat[cat.id] = g.id;
      renderGroupTabs();
      renderItems();
    });
    wrap.appendChild(btn);
  });
  wrap.scrollLeft = scroll;
  updateGroupCounts();
}

/* Small number on each sub-tab showing how many items are already in the basket. */
function updateGroupCounts() {
  const cat = currentCat();
  if (!cat || !cat.groups) return;
  cat.groups.forEach((g) => {
    const badge = document.querySelector(`.group-tab[data-group="${g.id}"] .group-count`);
    if (!badge) return;
    const total = g.items.reduce((sum, i) => sum + (cart[itemKey(cat.id, i.name)] || 0), 0);
    badge.textContent = total;
    badge.hidden = total === 0;
  });
}

function renderItems() {
  const cat = currentCat();
  document.getElementById("category-note").textContent = cat.note;

  const list = document.getElementById("item-list");
  list.innerHTML = "";

  if (cat.id === "home-services") {
    list.appendChild(buildHouseCleaningCalculator());
  }

  let items;
  if (cat.groups) {
    const group = cat.groups.find((g) => g.id === currentGroupId(cat));
    items = group.items.map((i) => ({ ...i, unit: i.unit || cat.unit || "per item" }));
  } else {
    items = catItems(cat);
  }

  items.forEach((item) => {
    const key = itemKey(cat.id, item.name);
    const qty = cart[key] || 0;

    const li = document.createElement("li");
    li.className = "item-row";
    li.innerHTML = `
      <div class="item-info">
        <div class="item-name">${item.name}</div>
        <div class="item-unit">${item.unit}</div>
      </div>
      <div class="item-right">
        <span class="item-price">${fmt(item.price)}</span>
        <span class="stepper">
          <button type="button" aria-label="Remove one ${item.name}" data-action="minus">–</button>
          <span class="qty">${qty}</span>
          <button type="button" aria-label="Add one ${item.name}" data-action="plus">+</button>
        </span>
      </div>
    `;
    li.querySelector('[data-action="plus"]').addEventListener("click", () => changeQty(key, 1));
    li.querySelector('[data-action="minus"]').addEventListener("click", () => changeQty(key, -1));
    list.appendChild(li);
  });

  if (cat.id === "home-services") {
    list.appendChild(buildMeasuringNote());
  }
}

function buildMeasuringNote() {
  const note = document.createElement("div");
  note.className = "measure-note";
  note.innerHTML = `
    <p><strong>Measuring your space:</strong> if your phone supports AR, a measuring-tape app makes this quick — try <strong>AR Ruler App</strong> (Android) or the built-in <strong>Measure</strong> app (iPhone).</p>
    <p>No AR support? No problem — measure length × width with a regular tape measure, then multiply the two numbers using your phone's ordinary Calculator app to get the square metres.</p>
  `;
  return note;
}

function changeQty(key, delta) {
  const next = (cart[key] || 0) + delta;
  if (next <= 0) {
    delete cart[key];
  } else {
    cart[key] = next;
  }
  saveCart(cart);
  renderItems();
  renderCart();
}

/* ===================== House cleaning calculator ===================== */
/* Priced by configuration: per bedroom, plus add-ons for ensuite and
   walk-in closet bedrooms, plus living/open area by square metre. */

let hcConfig = { bedrooms: 0, ensuites: 0, walkins: 0, sqm: 0, bathroomSqm: 0 };

function houseCleaningTotal() {
  const r = HOUSE_CLEANING_RATES;
  const bathroomCharge =
    hcConfig.bathroomSqm > 2
      ? r.bathroomBase + (hcConfig.bathroomSqm - 2) * r.perSqm
      : hcConfig.bathroomSqm > 0
      ? r.bathroomBase
      : 0;
  return (
    hcConfig.bedrooms * r.perBedroom +
    hcConfig.ensuites * r.perEnsuite +
    hcConfig.walkins * r.perWalkIn +
    hcConfig.sqm * r.perSqm +
    bathroomCharge
  );
}

function hcStepper(labelText, field, max) {
  const row = document.createElement("div");
  row.className = "hc-row";
  row.innerHTML = `
    <span class="hc-label">${labelText}</span>
    <span class="stepper">
      <button type="button" data-field="${field}" data-delta="-1" aria-label="Decrease ${labelText}">–</button>
      <span class="qty" data-display="${field}">${hcConfig[field]}</span>
      <button type="button" data-field="${field}" data-delta="1" aria-label="Increase ${labelText}">+</button>
    </span>
  `;
  row.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const delta = Number(btn.dataset.delta);
      let next = hcConfig[field] + delta;
      if (next < 0) next = 0;
      if (typeof max === "number" && next > max) next = max;
      hcConfig[field] = next;
      // keep ensuite/walk-in counts sensible relative to bedroom count
      if (field === "bedrooms") {
        if (hcConfig.ensuites > next) hcConfig.ensuites = next;
        if (hcConfig.walkins > next) hcConfig.walkins = next;
      }
      refreshHcCard();
    });
  });
  return row;
}

let hcCardEl = null;

function buildHouseCleaningCalculator() {
  const card = document.createElement("div");
  card.className = "hc-card";
  hcCardEl = card;
  renderHcCardContents();
  return card;
}

function renderHcCardContents() {
  hcCardEl.innerHTML = "";
  const title = document.createElement("div");
  title.className = "hc-title";
  title.textContent = "House Cleaning — build your quote";
  hcCardEl.appendChild(title);

  hcCardEl.appendChild(hcStepper("Bedrooms", "bedrooms"));
  hcCardEl.appendChild(hcStepper("...with ensuite", "ensuites", hcConfig.bedrooms));
  hcCardEl.appendChild(hcStepper("...with walk-in closet", "walkins", hcConfig.bedrooms));

  const sqmRow = document.createElement("div");
  sqmRow.className = "hc-row";
  sqmRow.innerHTML = `
    <span class="hc-label">Living / open area (m²)<br><span class="hc-rate">N$${HOUSE_CLEANING_RATES.perSqm}/m²</span></span>
    <input type="number" min="0" step="1" class="hc-sqm-input" id="hc-sqm-input" aria-label="Living or open area in square metres" value="${hcConfig.sqm}">
  `;
  hcCardEl.appendChild(sqmRow);
  hcCardEl.querySelector("#hc-sqm-input").addEventListener("input", (e) => {
    const v = Math.max(0, Number(e.target.value) || 0);
    hcConfig.sqm = v;
    refreshHcTotalOnly();
  });

  const bathroomRow = document.createElement("div");
  bathroomRow.className = "hc-row";
  bathroomRow.innerHTML = `
    <span class="hc-label">Bathroom &amp; Toilet, W/C (m²)<br><span class="hc-rate">N$${HOUSE_CLEANING_RATES.bathroomBase} up to 2m², then N$${HOUSE_CLEANING_RATES.perSqm}/m²</span></span>
    <input type="number" min="0" step="1" class="hc-sqm-input" id="hc-bathroom-input" aria-label="Bathroom and toilet area in square metres" value="${hcConfig.bathroomSqm}">
  `;
  hcCardEl.appendChild(bathroomRow);
  hcCardEl.querySelector("#hc-bathroom-input").addEventListener("input", (e) => {
    const v = Math.max(0, Number(e.target.value) || 0);
    hcConfig.bathroomSqm = v;
    refreshHcTotalOnly();
  });

  const totalRow = document.createElement("div");
  totalRow.className = "hc-total-row";
  totalRow.innerHTML = `<span>Estimated total</span><span id="hc-total">${fmt(houseCleaningTotal())}</span>`;
  hcCardEl.appendChild(totalRow);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-primary btn-block";
  addBtn.textContent = "Add house cleaning to basket";
  addBtn.disabled = hcConfig.bedrooms === 0 && hcConfig.sqm === 0 && hcConfig.bathroomSqm === 0;
  addBtn.addEventListener("click", addHouseCleaningToCart);
  hcCardEl.appendChild(addBtn);
}

function refreshHcCard() {
  renderHcCardContents();
}
function refreshHcTotalOnly() {
  const totalEl = hcCardEl.querySelector("#hc-total");
  if (totalEl) totalEl.textContent = fmt(houseCleaningTotal());
  const addBtn = hcCardEl.querySelector(".btn-primary");
  if (addBtn) addBtn.disabled = hcConfig.bedrooms === 0 && hcConfig.sqm === 0 && hcConfig.bathroomSqm === 0;
}

function addHouseCleaningToCart() {
  const parts = [];
  if (hcConfig.bedrooms) parts.push(`${hcConfig.bedrooms} bedroom${hcConfig.bedrooms === 1 ? "" : "s"}`);
  if (hcConfig.ensuites) parts.push(`${hcConfig.ensuites} ensuite`);
  if (hcConfig.walkins) parts.push(`${hcConfig.walkins} walk-in closet`);
  if (hcConfig.sqm) parts.push(`${hcConfig.sqm}m² open area`);
  if (hcConfig.bathroomSqm) parts.push(`${hcConfig.bathroomSqm}m² bathroom & toilet`);

  customCart.push({
    id: "hc-" + Date.now(),
    label: "House cleaning — " + parts.join(", "),
    price: houseCleaningTotal(),
  });
  saveCustomCart(customCart);

  hcConfig = { bedrooms: 0, ensuites: 0, walkins: 0, sqm: 0, bathroomSqm: 0 };
  renderHcCardContents();
  renderCart();
}

function removeCustomItem(id) {
  customCart = customCart.filter((c) => c.id !== id);
  saveCustomCart(customCart);
  renderCart();
}

function renderCart() {
  const count = cartCount();
  const total = cartTotal();

  const bar = document.getElementById("cart-bar");
  const barVisible = count > 0;
  bar.classList.toggle("visible", barVisible);
  document.getElementById("cart-bar-count").textContent = count + (count === 1 ? " item" : " items");
  document.getElementById("cart-bar-total").textContent = fmt(total);

  updateGroupCounts();

  // Keep the floating WhatsApp bubble from overlapping the cart bar
  document.getElementById("whatsapp-bubble-link").classList.toggle("raised", barVisible);

  // Header cart icon badge — always visible, even at 0
  const badge = document.getElementById("header-cart-badge");
  badge.textContent = count;
  badge.classList.toggle("zero", count === 0);

  const itemsList = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("cart-empty");
  itemsList.innerHTML = "";

  const keys = Object.keys(cart);
  emptyMsg.style.display = keys.length === 0 && customCart.length === 0 ? "block" : "none";

  keys.forEach((key) => {
    const found = findItem(key);
    if (!found) return;
    const qty = cart[key];
    const li = document.createElement("li");
    li.className = "cart-item-row";
    li.innerHTML = `
      <span class="name">${found.item.name}<span class="service-tag">${found.cat.label}</span></span>
      <span class="qty">×${qty}</span>
      <span class="line-total">${fmt(found.item.price * qty)}</span>
    `;
    itemsList.appendChild(li);
  });

  customCart.forEach((c) => {
    const li = document.createElement("li");
    li.className = "cart-item-row";
    li.innerHTML = `
      <span class="name">${c.label}</span>
      <span class="line-total">${fmt(c.price)}</span>
      <button type="button" class="cart-item-remove" aria-label="Remove ${c.label} from basket">&times;</button>
    `;
    li.querySelector(".cart-item-remove").addEventListener("click", () => removeCustomItem(c.id));
    itemsList.appendChild(li);
  });

  document.getElementById("cart-total").textContent = fmt(total);
  updateWhatsappLink();
}

/* ===================== WhatsApp links ===================== */

function buildBookingMessage() {
  const lines = ["Hi G-man's, I'd like to book:"];
  Object.keys(cart).forEach((key) => {
    const found = findItem(key);
    if (!found) return;
    const qty = cart[key];
    lines.push(`- ${found.item.name} [${found.cat.label}] x${qty} (${fmt(found.item.price * qty)})`);
  });
  customCart.forEach((c) => {
    lines.push(`- ${c.label} (${fmt(c.price)})`);
  });
  lines.push("", `Total: ${fmt(cartTotal())}`, "", "My address / pickup details: ");
  return lines.join("\n");
}

function updateWhatsappLink() {
  const hasItems = Object.keys(cart).length > 0 || customCart.length > 0;
  const message = hasItems
    ? buildBookingMessage()
    : "Hi G-man's, I'd like to ask about your laundry and home cleaning services.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById("whatsapp-send").href = url;
  document.getElementById("header-whatsapp-link").href = url;
  document.getElementById("footer-whatsapp-link").href = url;
  document.getElementById("whatsapp-bubble-link").href = url;
}

/* ===================== Cart drawer open/close ===================== */

const drawer = document.getElementById("cart-drawer");
let lastFocus = null;
function openCart() {
  lastFocus = document.activeElement;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  document.getElementById("cart-close").focus();
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
document.addEventListener("keydown", (e) => {
  if (!drawer.classList.contains("open")) return;
  if (e.key === "Escape") { closeCart(); return; }
  if (e.key !== "Tab") return;
  const f = [...drawer.querySelectorAll("a[href], button, input")].filter((el) => el.offsetParent !== null);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
document.getElementById("cart-bar").addEventListener("click", openCart);
document.getElementById("header-cart-btn").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
drawer.addEventListener("click", (e) => {
  if (e.target === drawer) closeCart();
});
document.getElementById("cart-clear").addEventListener("click", () => {
  cart = {};
  customCart = [];
  saveCart(cart);
  saveCustomCart(customCart);
  renderItems();
  renderCart();
});

/* ===================== Init ===================== */

renderTabs();
renderGroupTabs();
renderItems();
renderCart();
