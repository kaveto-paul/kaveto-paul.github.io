/* =========================================================
   G-man's Home & Laundry Care — site data & cart logic
   =========================================================
   EDIT PRICES HERE. Every price below is a PLACEHOLDER (N$)
   so the site works out of the box — replace with your real
   prices before going live. Add or remove items/categories
   freely; the site rebuilds itself from this list.
   ========================================================= */

const WHATSAPP_NUMBER = "264812797483"; // <-- REPLACE with your real WhatsApp number, no + or spaces (264 = Namibia code)

const CATEGORIES = [
  {
    id: "wash-fold",
    label: "Wash & Fold",
    note: "Everyday clothing, bedsheets and towels.",
    items: [
      { name: "Mixed wash", unit: "per kg", price: 25 },
      { name: "Wash & iron", unit: "per kg", price: 35 },
    ],
  },
  {
    id: "ironing",
    label: "Ironing Only",
    note: "For items that are already clean.",
    items: [
      { name: "Shirt", unit: "per item", price: 15 },
      { name: "Trousers", unit: "per item", price: 15 },
      { name: "Dress", unit: "per item", price: 20 },
    ],
  },
  {
    id: "dry-cleaning",
    label: "Dry Cleaning",
    note: "For delicate items and formal wear.",
    items: [
      { name: "Suit, 2-piece", unit: "per item", price: 120 },
      { name: "Jacket / blazer", unit: "per item", price: 70 },
      { name: "Formal dress", unit: "per item", price: 90 },
    ],
  },
  {
    id: "household",
    label: "Household Textiles",
    note: "Curtains, bedding and covers.",
    items: [
      { name: "Curtain, per panel", unit: "per item", price: 45 },
      { name: "Bedsheet", unit: "per item", price: 30 },
      { name: "Duvet cover", unit: "per item", price: 40 },
    ],
  },
  {
    id: "duvets",
    label: "Duvets & Bulky",
    note: "Larger items needing extra care.",
    items: [
      { name: "Duvet, single", unit: "per item", price: 80 },
      { name: "Duvet, double", unit: "per item", price: 100 },
      { name: "Duvet, king", unit: "per item", price: 120 },
      { name: "Blanket", unit: "per item", price: 60 },
    ],
  },
  {
    id: "home-services",
    label: "Home Services",
    note: "House and upholstery cleaning, at your home.",
    items: [
      { name: "House cleaning, 1–2 bed", unit: "per visit", price: 350 },
      { name: "House cleaning, 3+ bed", unit: "per visit", price: 500 },
      { name: "Sofa, 2-seater", unit: "per item", price: 150 },
      { name: "Sofa, 3-seater", unit: "per item", price: 200 },
    ],
  },
];

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
  return total;
}
function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
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

function renderCart() {
  const count = cartCount();
  const total = cartTotal();

  const bar = document.getElementById("cart-bar");
  bar.classList.toggle("visible", count > 0);
  document.getElementById("cart-bar-count").textContent = count + (count === 1 ? " item" : " items");
  document.getElementById("cart-bar-total").textContent = fmt(total);

  const itemsList = document.getElementById("cart-items");
  const emptyMsg = document.getElementById("cart-empty");
  itemsList.innerHTML = "";

  const keys = Object.keys(cart);
  emptyMsg.style.display = keys.length === 0 ? "block" : "none";

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
  lines.push("", `Total: ${fmt(cartTotal())}`, "", "My address / pickup details: ");
  return lines.join("\n");
}

function updateWhatsappLink() {
  const hasItems = Object.keys(cart).length > 0;
  const message = hasItems
    ? buildBookingMessage()
    : "Hi G-man's, I'd like to ask about your laundry and home cleaning services.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  document.getElementById("whatsapp-send").href = url;
  document.getElementById("header-whatsapp-link").href = url;
  document.getElementById("footer-whatsapp-link").href = url;
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
document.getElementById("cart-close").addEventListener("click", closeCart);
drawer.addEventListener("click", (e) => {
  if (e.target === drawer) closeCart();
});
document.getElementById("cart-clear").addEventListener("click", () => {
  cart = {};
  saveCart(cart);
  renderItems();
  renderCart();
});

/* ===================== Init ===================== */

renderTabs();
renderItems();
renderCart();
