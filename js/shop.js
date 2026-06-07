function filterProducts(products, filters) {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.categories?.length) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }
  if (filters.minPrice != null) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice != null) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
    default:
      result.sort((a, b) => b.popularity - a.popularity);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  return result;
}

function getFiltersFromUI() {
  const categories = [...document.querySelectorAll('input[name="category"]:checked')].map((c) => c.value);
  const minPrice = parseFloat(document.getElementById("min-price")?.value) || null;
  const maxPrice = parseFloat(document.getElementById("max-price")?.value) || null;
  const sort = document.getElementById("sort-select")?.value || "popularity";
  const params = new URLSearchParams(window.location.search);
  const urlCategory = params.get("category");
  return {
    categories: urlCategory ? [urlCategory] : categories,
    minPrice,
    maxPrice,
    sort,
    category: urlCategory
  };
}

function renderShopProducts() {
  const grid = document.getElementById("product-grid");
  const countEl = document.getElementById("product-count");
  if (!grid) return;

  const filters = getFiltersFromUI();
  const products = filterProducts(getProducts(), filters);

  if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? "s" : ""}`;

  if (!products.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><h3>No products found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }

  grid.innerHTML = products.map((p, i) => {
    const card = renderProductCard(p);
    return card.replace('class="product-card reveal"', `class="product-card reveal" style="animation-delay:${i * 0.05}s"`);
  }).join("");

  bindAddToCartButtons(grid);
  initReveal();
}

function initShopPage() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("category");
  if (cat) {
    const cb = document.querySelector(`input[name="category"][value="${cat}"]`);
    if (cb) cb.checked = true;
  }

  document.querySelectorAll(".filter-group input, #sort-select, #min-price, #max-price").forEach((el) => {
    el.addEventListener("change", renderShopProducts);
    el.addEventListener("input", renderShopProducts);
  });

  document.getElementById("clear-filters")?.addEventListener("click", () => {
    document.querySelectorAll('input[name="category"]').forEach((c) => { c.checked = false; });
    const min = document.getElementById("min-price");
    const max = document.getElementById("max-price");
    if (min) min.value = "";
    if (max) max.value = "";
    window.history.replaceState({}, "", "shop.html");
    renderShopProducts();
  });

  renderShopProducts();
}
