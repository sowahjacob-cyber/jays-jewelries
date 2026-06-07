const ADMIN_CREDENTIALS = { email: "admin@jaysjewelries.com", password: "admin123" };


function requireAdmin() {
  if (!isAdminLoggedIn() && !window.location.pathname.includes("login")) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function initAdminLogin() {
  if (isAdminLoggedIn()) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("admin-login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.email.value === ADMIN_CREDENTIALS.email && f.password.value === ADMIN_CREDENTIALS.password) {
      setAdminSession(true);
      window.location.href = "index.html";
    } else {
      showToast("Invalid admin credentials");
    }
  });
}

function renderAdminStats() {
  const orders = getOrders();
  const products = getProducts();
  const users = getUsers();
  const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
  const lowStock = products.filter((p) => p.stock < 10).length;

  document.getElementById("stat-revenue").textContent = formatPrice(revenue);
  document.getElementById("stat-orders").textContent = orders.length;
  document.getElementById("stat-customers").textContent = users.length;
  document.getElementById("stat-products").textContent = products.length;
  document.getElementById("stat-lowstock").textContent = lowStock;
}

function renderAdminOrders() {
  const tbody = document.getElementById("admin-orders-body");
  if (!tbody) return;
  const orders = getOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  tbody.innerHTML = orders.length ? orders.map((o) => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer?.name || "—"}</td>
      <td>${formatPrice(o.total)}</td>
      <td>${o.paymentMethod || "—"}</td>
      <td><select class="order-status" data-id="${o.id}">
        ${["pending", "processing", "shipped", "delivered", "cancelled"].map((s) =>
          `<option value="${s}" ${o.status === s ? "selected" : ""}>${s}</option>`
        ).join("")}
      </select></td>
      <td>${new Date(o.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join("") : `<tr><td colspan="6">No orders yet</td></tr>`;

  tbody.querySelectorAll(".order-status").forEach((sel) => {
    sel.addEventListener("change", () => {
      const orders = getOrders();
      const order = orders.find((x) => x.id === sel.dataset.id);
      if (order) { order.status = sel.value; saveOrders(orders); showToast("Order updated"); }
    });
  });
}

function renderAdminProducts() {
  const tbody = document.getElementById("admin-products-body");
  if (!tbody) return;
  const products = getProducts();
  tbody.innerHTML = products.map((p) => `
    <tr>
      <td><img src="${p.images[0]}" alt="" width="40" height="40" style="object-fit:cover;border-radius:4px" /></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>${formatPrice(p.price)}</td>
      <td>${p.stock}</td>
      <td>${p.popularity}</td>
      <td class="admin-actions">
        <button class="btn btn-ghost btn-sm edit-product" data-id="${p.id}">Edit</button>
        <button class="btn btn-ghost btn-sm delete-product" data-id="${p.id}">Delete</button>
      </td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".delete-product").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!confirm("Delete this product?")) return;
      saveProducts(getProducts().filter((p) => p.id !== btn.dataset.id));
      renderAdminProducts();
      showToast("Product deleted");
    });
  });

  tbody.querySelectorAll(".edit-product").forEach((btn) => {
    btn.addEventListener("click", () => openProductModal(getProductById(btn.dataset.id)));
  });
}

function renderAdminCustomers() {
  const tbody = document.getElementById("admin-customers-body");
  if (!tbody) return;
  const users = getUsers();
  tbody.innerHTML = users.length ? users.map((u) => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.phone || "—"}</td>
      <td>${new Date(u.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join("") : `<tr><td colspan="4">No registered customers</td></tr>`;
}

function renderAdminPromotions() {
  const tbody = document.getElementById("admin-promos-body");
  if (!tbody) return;
  const promos = getPromotions();
  tbody.innerHTML = promos.map((p) => `
    <tr>
      <td>${p.code}</td>
      <td>${p.type === "percent" ? p.discount + "%" : formatPrice(p.discount)}</td>
      <td>${p.minOrder ? formatPrice(p.minOrder) : "—"}</td>
      <td>${p.active ? "Active" : "Inactive"}</td>
      <td><button class="btn btn-ghost btn-sm toggle-promo" data-id="${p.id}">${p.active ? "Disable" : "Enable"}</button></td>
    </tr>
  `).join("");

  tbody.querySelectorAll(".toggle-promo").forEach((btn) => {
    btn.addEventListener("click", () => {
      const promos = getPromotions();
      const p = promos.find((x) => x.id === btn.dataset.id);
      if (p) { p.active = !p.active; savePromotions(promos); renderAdminPromotions(); }
    });
  });
}

function updateImagePreview(url) {
  const preview = document.getElementById("image-preview");
  if (!preview || !url?.trim()) {
    if (preview) preview.style.display = "none";
    return;
  }
  const src = url.trim().split("\n")[0].trim();
  preview.src = src.startsWith("http") || src.startsWith("assets/") || src.startsWith("../")
    ? src
    : `../${src}`;
  preview.style.display = "block";
  preview.onerror = () => { preview.style.display = "none"; };
}

function openProductModal(product = null) {
  const modal = document.getElementById("product-modal");
  const form = document.getElementById("product-form");
  form.reset();
  form.dataset.editId = product?.id || "";
  document.getElementById("image-file-hint").textContent = "";
  if (product) {
    form.name.value = product.name;
    form.category.value = product.category;
    form.price.value = product.price;
    form.stock.value = product.stock;
    form.popularity.value = product.popularity;
    form.description.value = product.description;
    form.images.value = (product.images || []).join("\n");
    form.featured.checked = !!product.featured;
    updateImagePreview(form.images.value);
  } else {
    updateImagePreview("");
  }
  modal.style.display = "flex";
}

function parseImageLines(text) {
  const fallback = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80";
  const lines = (text || "").split("\n").map((s) => s.trim()).filter(Boolean);
  return lines.length ? lines : [fallback];
}

function initProductModal() {
  const modal = document.getElementById("product-modal");
  const form = document.getElementById("product-form");
  const imagesField = form?.querySelector("[name=images]");

  document.getElementById("add-product-btn")?.addEventListener("click", () => openProductModal());
  document.getElementById("close-modal")?.addEventListener("click", () => { modal.style.display = "none"; });

  imagesField?.addEventListener("input", () => updateImagePreview(imagesField.value));

  document.getElementById("image-file-picker")?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    const hint = document.getElementById("image-file-hint");
    if (!file) return;
    const id = form.dataset.editId || "jj-new";
    const ext = file.name.split(".").pop() || "jpg";
    const suggested = `assets/products/${id}.${ext}`;
    if (!imagesField.value.trim()) imagesField.value = suggested;
    hint.textContent = `Copy your file into assets/products/ and name it ${id}.${ext} (or paste another path above).`;
    const url = URL.createObjectURL(file);
    const preview = document.getElementById("image-preview");
    preview.src = url;
    preview.style.display = "block";
    updateImagePreview(imagesField.value);
  });

  document.getElementById("reset-catalog-btn")?.addEventListener("click", () => {
    if (!confirm("Reset all products to defaults in products.js? Your image edits in storage will be replaced.")) return;
    syncProductsFromFile();
    renderAdminProducts();
    showToast("Catalog reloaded from products.js");
  });

  document.getElementById("product-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const products = getProducts();
    const data = {
      name: f.name.value,
      category: f.category.value,
      price: parseFloat(f.price.value),
      stock: parseInt(f.stock.value, 10),
      popularity: parseInt(f.popularity.value, 10) || 50,
      description: f.description.value,
      images: parseImageLines(f.images.value),
      featured: f.featured.checked,
      currency: "GHS"
    };
    if (f.dataset.editId) {
      const idx = products.findIndex((p) => p.id === f.dataset.editId);
      if (idx >= 0) products[idx] = { ...products[idx], ...data, reviews: products[idx].reviews || [] };
    } else {
      products.push({ ...data, id: "jj-" + Date.now().toString().slice(-6), reviews: [] });
    }
    saveProducts(products);
    modal.style.display = "none";
    renderAdminProducts();
    showToast("Product saved");
  });
}

function initAdminNav() {
  const page = window.location.pathname.split("/").pop().replace(".html", "") || "index";
  document.querySelectorAll(".admin-sidebar a").forEach((a) => {
    if (a.dataset.page === page) a.classList.add("active");
  });
  document.getElementById("admin-logout")?.addEventListener("click", () => {
    setAdminSession(false);
    window.location.href = "login.html";
  });
}

function initAdminDashboard() {
  if (!requireAdmin()) return;
  initAdminNav();
  const page = window.location.pathname.split("/").pop();
  if (page === "index.html" || page === "") { renderAdminStats(); renderAdminOrders(); }
  if (page === "products.html") { renderAdminProducts(); initProductModal(); }
  if (page === "orders.html") renderAdminOrders();
  if (page === "customers.html") renderAdminCustomers();
  if (page === "promotions.html") renderAdminPromotions();
}
