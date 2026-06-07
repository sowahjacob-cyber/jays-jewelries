function renderCartPage() {
  const items = getCartItemsDetailed();
  const tbody = document.getElementById("cart-body");
  const summary = document.getElementById("cart-summary");
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = "";
    document.getElementById("cart-table-wrap").innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Discover our exquisite collection.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:1.5rem">Shop Now</a>
      </div>`;
    if (summary) summary.style.display = "none";
    return;
  }

  tbody.innerHTML = items.map((item) => `
    <tr>
      <td data-label="Product">
        <div class="cart-item-info">
          <img src="${item.product.images[0]}" alt="${item.product.name}" width="80" height="80" />
          <div>
            <strong>${item.product.name}</strong>
            <p class="text-muted" style="font-size:0.8rem">${item.product.category}</p>
          </div>
        </div>
      </td>
      <td data-label="Price">${formatPrice(item.product.price)}</td>
      <td data-label="Qty">
        <div class="qty-selector" style="margin:0">
          <button type="button" class="cart-qty-minus" data-id="${item.productId}">−</button>
          <input type="number" value="${item.quantity}" min="1" max="${item.product.stock}" data-id="${item.productId}" class="cart-qty-input" style="width:50px" />
          <button type="button" class="cart-qty-plus" data-id="${item.productId}">+</button>
        </div>
      </td>
      <td data-label="Total">${formatPrice(item.product.price * item.quantity)}</td>
      <td data-label=""><button class="btn btn-ghost btn-sm remove-cart" data-id="${item.productId}">Remove</button></td>
    </tr>
  `).join("");

  const subtotal = getCartSubtotal();
  if (summary) {
    summary.style.display = "block";
    summary.innerHTML = `
      <div class="cart-summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="cart-summary-row"><span>Shipping</span><span>Calculated at checkout</span></div>
      <div class="cart-summary-row total"><span>Total</span><span>${formatPrice(subtotal)}</span></div>
      <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:1.5rem">Secure Checkout</a>
      <a href="${whatsappLink(`Hi! I'd like to order: ${items.map((i) => i.product.name + " x" + i.quantity).join(", ")}`)}" class="btn btn-outline btn-block" style="margin-top:0.75rem" target="_blank" rel="noopener">Order via WhatsApp</a>
    `;
  }

  tbody.querySelectorAll(".cart-qty-minus").forEach((b) => {
    b.addEventListener("click", () => {
      const item = items.find((i) => i.productId === b.dataset.id);
      updateCartQuantity(b.dataset.id, item.quantity - 1);
      renderCartPage();
    });
  });
  tbody.querySelectorAll(".cart-qty-plus").forEach((b) => {
    b.addEventListener("click", () => {
      const item = items.find((i) => i.productId === b.dataset.id);
      updateCartQuantity(b.dataset.id, item.quantity + 1);
      renderCartPage();
    });
  });
  tbody.querySelectorAll(".remove-cart").forEach((b) => {
    b.addEventListener("click", () => { removeFromCart(b.dataset.id); renderCartPage(); });
  });
}

function initCheckoutPage() {
  const items = getCartItemsDetailed();
  const orderItems = document.getElementById("checkout-items");
  const form = document.getElementById("checkout-form");

  if (!items.length) {
    window.location.href = "cart.html";
    return;
  }

  const subtotal = getCartSubtotal();
  const shipping = subtotal >= 1000 ? 0 : 50;
  let discount = 0;

  function updateTotals() {
    const total = subtotal - discount + shipping;
    document.getElementById("checkout-subtotal").textContent = formatPrice(subtotal);
    document.getElementById("checkout-shipping").textContent = shipping ? formatPrice(shipping) : "Free";
    document.getElementById("checkout-discount").textContent = discount ? `-${formatPrice(discount)}` : formatPrice(0);
    document.getElementById("checkout-total").textContent = formatPrice(total);
    return total;
  }

  orderItems.innerHTML = items.map((i) => `
    <div class="cart-summary-row">
      <span>${i.product.name} × ${i.quantity}</span>
      <span>${formatPrice(i.product.price * i.quantity)}</span>
    </div>
  `).join("");
  updateTotals();

  document.querySelectorAll(".payment-method").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll(".payment-method").forEach((p) => p.classList.remove("selected"));
      el.classList.add("selected");
      el.querySelector("input").checked = true;
    });
  });
  document.querySelector(".payment-method")?.classList.add("selected");

  document.getElementById("apply-promo")?.addEventListener("click", () => {
    const code = document.getElementById("promo-code").value.trim();
    const result = applyPromoCode(code);
    const msg = document.getElementById("promo-message");
    if (result.valid) {
      discount = result.discount;
      msg.textContent = `Promo applied: ${result.promo.code}`;
      msg.style.color = "var(--gold)";
    } else {
      discount = 0;
      msg.textContent = result.message;
      msg.style.color = "#e74c3c";
    }
    updateTotals();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payment = form.querySelector('input[name="payment"]:checked')?.value;
    const user = getCurrentUser();
    const total = updateTotals();
    const order = createOrder({
      userId: user?.id || "guest",
      customer: {
        name: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        country: form.country.value
      },
      items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, price: i.product.price })),
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod: payment
    });
    clearCart();
    sessionStorage.setItem("jj_last_order", order.id);
    window.location.href = `checkout.html?success=1&order=${order.id}`;
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("success")) {
    document.getElementById("checkout-success").style.display = "block";
    document.getElementById("checkout-main").style.display = "none";
    document.getElementById("order-id-display").textContent = params.get("order") || sessionStorage.getItem("jj_last_order");
  }
}

function initAccountPage() {
  const user = getCurrentUser();
  const guest = document.getElementById("auth-section");
  const dashboard = document.getElementById("account-dashboard");

  if (!user) {
    guest.style.display = "block";
    dashboard.style.display = "none";
    initAuthForms();
    return;
  }

  guest.style.display = "none";
  dashboard.style.display = "block";
  document.getElementById("user-greeting").textContent = `Welcome, ${user.name}`;
  const orders = getUserOrders(user.id);
  const list = document.getElementById("order-list");
  if (!orders.length) {
    list.innerHTML = `<p class="text-muted">No orders yet. <a href="shop.html">Start shopping</a></p>`;
  } else {
    list.innerHTML = orders.map((o) => `
      <div class="order-history-item">
        <div>
          <strong>${o.id}</strong>
          <p class="text-muted" style="font-size:0.85rem">${new Date(o.createdAt).toLocaleDateString()} · ${o.status}</p>
        </div>
        <div style="text-align:right">
          <p class="product-price" style="font-size:1.1rem">${formatPrice(o.total)}</p>
          <p class="text-muted" style="font-size:0.8rem">${o.paymentMethod}</p>
        </div>
      </div>
    `).join("");
  }
  document.getElementById("logout-btn")?.addEventListener("click", logoutUser);
}

function initAuthForms() {
  const tabs = document.querySelectorAll(".auth-tabs button");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const panel = tab.dataset.panel;
      loginForm.style.display = panel === "login" ? "block" : "none";
      registerForm.style.display = panel === "register" ? "block" : "none";
    });
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const r = loginUser(loginForm.email.value, loginForm.password.value);
    if (r.success) { showToast("Welcome back!"); location.reload(); }
    else showToast(r.message);
  });

  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const r = registerUser({
      name: registerForm.name.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
      phone: registerForm.phone.value
    });
    if (r.success) { showToast("Account created!"); location.reload(); }
    else showToast(r.message);
  });
}

function initFaqPage() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
}

function initContactPage() {
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const msg = `New inquiry from ${f.name.value}\nEmail: ${f.email.value}\nPhone: ${f.phone.value}\n\n${f.message.value}`;
    window.open(whatsappLink(msg), "_blank");
    showToast("Opening WhatsApp...");
    f.reset();
  });
}

function renderHomeFeatured() {
  const grid = document.getElementById("featured-products");
  if (!grid) return;
  const featured = getProducts().filter((p) => p.featured).slice(0, 4);
  grid.innerHTML = featured.map((p) => renderProductCard(p)).join("");
  bindAddToCartButtons(grid);
}

function renderCategories() {
  const grid = document.getElementById("category-grid-home");
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map((c) => `
    <a href="shop.html?category=${c.id}" class="category-card reveal">
      <img src="${c.image}" alt="${c.label}" loading="lazy" />
      <div class="category-overlay"><h3>${c.label}</h3></div>
    </a>
  `).join("");
}

function renderTestimonials() {
  const grid = document.getElementById("testimonials-grid");
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t) => `
    <div class="testimonial-card reveal">
      <div class="stars">${"★".repeat(t.rating)}</div>
      <p>${t.text}</p>
      <div class="testimonial-author">
        <img src="${t.image}" alt="${t.name}" width="48" height="48" loading="lazy" />
        <div><strong>${t.name}</strong><span>${t.location}</span></div>
      </div>
    </div>
  `).join("");
}

function renderCategoriesPage() {
  const grid = document.getElementById("categories-full");
  if (!grid) return;
  const products = getProducts();
  grid.innerHTML = CATEGORIES.map((c) => {
    const count = products.filter((p) => p.category === c.id).length;
    return `
      <a href="shop.html?category=${c.id}" class="category-card reveal">
        <img src="${c.image}" alt="${c.label}" loading="lazy" />
        <div class="category-overlay">
          <h3>${c.label}</h3>
          <span style="font-size:0.8rem;color:var(--gold)">${count} pieces</span>
        </div>
      </a>
    `;
  }).join("");
}
