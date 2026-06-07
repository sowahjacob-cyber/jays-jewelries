const WHATSAPP_BASE = "https://wa.me/";

function whatsappLink(message = "") {
  const num = BRAND.whatsapp;
  const text = encodeURIComponent(message || `Hello ${BRAND.name}, I'd like to inquire about your jewelry collection.`);
  return `${WHATSAPP_BASE}${num}?text=${text}`;
}

function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function getActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  const map = {
    "index.html": "home",
    "shop.html": "shop",
    "categories.html": "categories",
    "about.html": "about",
    "contact.html": "contact",
    "faqs.html": "faqs"
  };
  return map[path] || "";
}

function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const active = getActiveNav();
  const user = getCurrentUser();
  const cartCount = getCartCount();

  header.innerHTML = `
    <div class="header-inner container">
      <a href="index.html" class="logo" aria-label="${BRAND.name} Home">
        <img src="assets/logo.svg" alt="${BRAND.name}" width="200" height="48" />
      </a>
      <nav class="nav-main" aria-label="Main navigation">
        <a href="index.html" class="${active === "home" ? "active" : ""}">Home</a>
        <a href="shop.html" class="${active === "shop" ? "active" : ""}">Shop</a>
        <a href="categories.html" class="${active === "categories" ? "active" : ""}">Categories</a>
        <a href="about.html" class="${active === "about" ? "active" : ""}">About Us</a>
        <a href="contact.html" class="${active === "contact" ? "active" : ""}">Contact</a>
        <a href="faqs.html" class="${active === "faqs" ? "active" : ""}">FAQs</a>
      </nav>
      <div class="header-actions">
        <a href="account.html" class="icon-btn hide-mobile" aria-label="Account" title="Account">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>
        </a>
        <a href="cart.html" class="icon-btn" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L5 3H2"/></svg>
          <span class="cart-count" style="display:${cartCount ? "flex" : "none"}">${cartCount}</span>
        </a>
        <button class="menu-toggle" aria-label="Open menu" id="menu-open">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
  `;

  document.getElementById("menu-open")?.addEventListener("click", () => {
    document.getElementById("mobile-nav")?.classList.add("open");
  });
}

function renderMobileNav() {
  const nav = document.getElementById("mobile-nav");
  if (!nav) return;
  nav.innerHTML = `
    <button class="mobile-close" id="menu-close" aria-label="Close menu">&times;</button>
    <a href="index.html">Home</a>
    <a href="shop.html">Shop</a>
    <a href="categories.html">Categories</a>
    <a href="about.html">About Us</a>
    <a href="contact.html">Contact</a>
    <a href="faqs.html">FAQs</a>
    <a href="account.html">Account</a>
    <a href="cart.html">Cart</a>
  `;
  document.getElementById("menu-close")?.addEventListener("click", () => nav.classList.remove("open"));
}

function renderSocialLinks() {
  const labels = { instagram: "IG", facebook: "FB", twitter: "X", pinterest: "Pin", snapchat: "Snap" };
  return Object.entries(BRAND.social || {})
    .filter(([, url]) => url)
    .map(([key, url]) => {
      const label = labels[key] || key.slice(0, 2).toUpperCase();
      return `<a href="${url}" target="_blank" rel="noopener" aria-label="${key}">${label}</a>`;
    })
    .join("");
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <img src="assets/logo.svg" alt="${BRAND.name}" width="180" height="44" style="margin-bottom:1rem" />
          <p>Luxury jewelry crafted for the modern connoisseur. Serving Ghana and the world with timeless elegance.</p>
          <div class="social-links">${renderSocialLinks()}</div>
        </div>
        <div>
          <h4>Shop</h4>
          <a href="shop.html">All Products</a>
          <a href="categories.html">Categories</a>
          <a href="shop.html?category=necklaces">Necklaces</a>
          <a href="shop.html?category=rings">Rings</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="contact.html">Contact Us</a>
          <a href="faqs.html">FAQs</a>
          <a href="${whatsappLink()}" target="_blank" rel="noopener">WhatsApp</a>
          <a href="account.html">My Account</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p>${BRAND.address}</p>
          <a href="tel:${BRAND.phone.replace(/\s/g, "")}">${BRAND.phone}</a>
          <a href="mailto:${BRAND.email}">${BRAND.email}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.</span>
        <span>
          <a href="admin/index.html">Admin</a> &middot;
          <a href="#">Privacy</a> &middot;
          <a href="#">Terms</a>
        </span>
      </div>
    </div>
  `;
}

function renderWhatsAppFloat() {
  if (document.querySelector(".whatsapp-float")) return;
  const a = document.createElement("a");
  a.href = whatsappLink();
  a.className = "whatsapp-float";
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat on WhatsApp");
  a.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  document.body.appendChild(a);
}

function renderProductCard(product) {
  const rating = getAverageRating(product);
  const reviewCount = product.reviews?.length || 0;
  return `
    <article class="product-card reveal" data-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-card-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" width="400" height="400" />
      </a>
      <div class="product-card-body">
        <span class="product-category">${product.category}</span>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <div class="product-rating">
          <span class="stars">${renderStars(rating || 5)}</span>
          <span>(${reviewCount} reviews)</span>
        </div>
        <button class="btn btn-outline btn-sm btn-block add-cart-btn" data-id="${product.id}" style="margin-top:1rem">Add to Cart</button>
      </div>
    </article>
  `;
}

function bindAddToCartButtons(container = document) {
  container.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(btn.dataset.id);
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });
}

function initNewsletterForm(formId = "newsletter-form") {
  const form = document.getElementById(formId);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (subscribeNewsletter(email)) showToast("Welcome! You're subscribed.");
    else showToast("You're already subscribed.");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderMobileNav();
  renderFooter();
  renderWhatsAppFloat();
  if (typeof updateCartCount === "function") updateCartCount();
  initHeaderScroll();
  initReveal();
  initNewsletterForm();
});
