function getCartItemsDetailed() {
  const cart = getCart();
  const products = getProducts();
  return cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((i) => i.product);
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === productId);
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) return false;
  const qty = Math.min(quantity, product.stock);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + qty, product.stock);
  } else {
    cart.push({ productId, quantity: qty });
  }
  setCart(cart);
  showToast("Added to cart");
  return true;
}

function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  if (quantity <= 0) {
    cart = cart.filter((i) => i.productId !== productId);
  } else {
    const item = cart.find((i) => i.productId === productId);
    if (item) item.quantity = Math.min(quantity, product.stock);
  }
  setCart(cart);
}

function removeFromCart(productId) {
  setCart(getCart().filter((i) => i.productId !== productId));
  showToast("Removed from cart");
}

function clearCart() {
  setCart([]);
}

function getCartSubtotal() {
  return getCartItemsDetailed().reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    const count = getCartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function applyPromoCode(code) {
  const promos = getPromotions();
  const promo = promos.find((p) => p.code.toUpperCase() === code.toUpperCase() && p.active);
  if (!promo) return { valid: false, message: "Invalid promo code" };
  const subtotal = getCartSubtotal();
  if (promo.minOrder && subtotal < promo.minOrder) {
    return { valid: false, message: `Minimum order ${formatPrice(promo.minOrder)} required` };
  }
  const discount = promo.type === "percent"
    ? subtotal * (promo.discount / 100)
    : promo.discount;
  return { valid: true, discount, promo };
}
