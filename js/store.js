const STORAGE_KEYS = {
  cart: "jj_cart",
  user: "jj_user",
  users: "jj_users",
  orders: "jj_orders",
  products: "jj_products",
  promotions: "jj_promotions",
  newsletter: "jj_newsletter",
  adminSession: "jj_admin"
};

const DEFAULT_PROMOTIONS = [
  { id: "promo-1", code: "WELCOME10", discount: 10, type: "percent", active: true },
  { id: "promo-2", code: "GOLD20", discount: 20, type: "percent", active: true, minOrder: 500 }
];

function read(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function syncProductsFromFile() {
  if (typeof PRODUCTS !== "undefined") {
    write(STORAGE_KEYS.products, JSON.parse(JSON.stringify(PRODUCTS)));
  }
}

function initStore() {
  if (!read(STORAGE_KEYS.products)) {
    syncProductsFromFile();
  }
  if (!read(STORAGE_KEYS.promotions)) {
    write(STORAGE_KEYS.promotions, DEFAULT_PROMOTIONS);
  }
  if (!read(STORAGE_KEYS.orders)) write(STORAGE_KEYS.orders, []);
  if (!read(STORAGE_KEYS.users)) write(STORAGE_KEYS.users, []);
  if (!read(STORAGE_KEYS.newsletter)) write(STORAGE_KEYS.newsletter, []);
}

function getProducts() {
  return read(STORAGE_KEYS.products, []);
}

function saveProducts(products) {
  write(STORAGE_KEYS.products, products);
}

function getCart() {
  return read(STORAGE_KEYS.cart, []);
}

function setCart(cart) {
  write(STORAGE_KEYS.cart, cart);
  if (typeof updateCartCount === "function") updateCartCount();
}

function getCurrentUser() {
  return read(STORAGE_KEYS.user, null);
}

function setCurrentUser(user) {
  if (user) write(STORAGE_KEYS.user, user);
  else localStorage.removeItem(STORAGE_KEYS.user);
}

function getUsers() {
  return read(STORAGE_KEYS.users, []);
}

function saveUsers(users) {
  write(STORAGE_KEYS.users, users);
}

function getOrders() {
  return read(STORAGE_KEYS.orders, []);
}

function saveOrders(orders) {
  write(STORAGE_KEYS.orders, orders);
}

function getPromotions() {
  return read(STORAGE_KEYS.promotions, DEFAULT_PROMOTIONS);
}

function savePromotions(promotions) {
  write(STORAGE_KEYS.promotions, promotions);
}

function subscribeNewsletter(email) {
  const list = read(STORAGE_KEYS.newsletter, []);
  if (!list.includes(email.toLowerCase())) {
    list.push(email.toLowerCase());
    write(STORAGE_KEYS.newsletter, list);
    return true;
  }
  return false;
}

function isAdminLoggedIn() {
  return read(STORAGE_KEYS.adminSession, false) === true;
}

function setAdminSession(val) {
  write(STORAGE_KEYS.adminSession, val);
}

initStore();
