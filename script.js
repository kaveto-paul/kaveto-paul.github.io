/* =========================================================
   G-man's Home & Laundry Care — site data & cart logic
   =========================================================
   EDIT PRICES HERE. Every price below is a PLACEHOLDER (N$)
   so the site works out of the box — replace with your real
   prices before going live. Add or remove items/categories
   freely; the site rebuilds itself from this list.
   ========================================================= */

const WHATSAPP_NUMBER = "264812797483"; // Business WhatsApp number

const CATEGORIES = [
  {
    id: "wash-fold",
    label: "Wash & Fold",
    note: "Everyday clothing, bedsheets and towels — priced per basket.",
    items: [
      { name: "Small basket", unit: "per basket", price: 110 },
      { name: "Big basket", unit: "per basket", price: 160 },
    ],
  },
  {
    id: "wash-iron",
    label: "Wash & Iron",
    note: "Everyday laundry that also needs ironing — priced per basket.",
    items: [
      { name: "Small basket", unit: "per basket", price: 180 },
      { name: "Big basket", unit: "per basket", price: 250 },
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
    id: "household",
    label: "Household Textiles",
    note: "Curtains, bedding and covers.",
    items: [
      { name: "Curtain, per panel", unit: "per item", price: 60 },
      { name: "Bedsheet", unit: "per item", price: 30 },
      { name: "Duvet cover", unit: "per item", price: 50 },
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

function findItem(key) {
  const [catId, itemName] = key.split("::");
  const cat = CATEGORIES.find((c) => c.id === catId);
  if (!cat) return null;
  const item = cat.items.find((i) => i.name === itemName);
  if (!item) return null;
  return { cat, item };
}

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

function renderTabs() {
  const wrap = document.getElementById("category-tabs");
  wrap.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-tab";
    btn.textContent = cat.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", cat.id === activeCategory ? "true" : "false");
    btn.addEventListener("click", () => {
      activeCategory = cat.id;
      renderTabs();
      renderItems();
    });
    wrap.appendChild(btn);
  });
}

function renderItems() {
  const cat = CATEGORIES.find((c) => c.id === activeCategory);
  document.getElementById("category-note").textContent = cat.note;

  const list = document.getElementById("item-list");
  list.innerHTML = "";

  if (cat.id === "home-services") {
    list.appendChild(buildHouseCleaningCalculator());
  }

  cat.items.forEach((item) => {
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
  return (
    hcConfig.bedrooms * r.perBedroom +
    hcConfig.ensuites * r.perEnsuite +
    hcConfig.walkins * r.perWalkIn +
    hcConfig.sqm * r.perSqm +
    hcConfig.bathroomSqm * r.perSqm
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
    <input type="number" min="0" step="1" class="hc-sqm-input" id="hc-sqm-input" value="${hcConfig.sqm}">
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
    <span class="hc-label">Bathroom &amp; Toilet, W/C (m²)<br><span class="hc-rate">N$${HOUSE_CLEANING_RATES.perSqm}/m²</span></span>
    <input type="number" min="0" step="1" class="hc-sqm-input" id="hc-bathroom-input" value="${hcConfig.bathroomSqm}">
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
      <span class="name">${found.item.name}</span>
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
      <button type="button" class="cart-item-remove" aria-label="Remove">&times;</button>
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
    lines.push(`- ${found.item.name} x${qty} (${fmt(found.item.price * qty)})`);
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
function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}
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
renderItems();
renderCart();
