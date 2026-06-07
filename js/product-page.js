function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id) || getProducts().find((p) => p.id === id);
  const container = document.getElementById("product-detail");
  if (!product || !container) {
    container.innerHTML = `<div class="empty-state"><h3>Product not found</h3><a href="shop.html" class="btn btn-primary">Back to Shop</a></div>`;
    return;
  }

  document.title = `${product.name} | ${BRAND.name}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = product.description.slice(0, 160);

  const rating = getAverageRating(product) || 5;
  const reviewCount = product.reviews?.length || 0;

  container.innerHTML = `
    <div class="container product-detail">
      <nav class="breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <span>${product.name}</span></nav>
      <div class="product-detail-grid">
        <div class="product-gallery">
          <div class="gallery-main"><img id="main-image" src="${product.images[0]}" alt="${product.name}" /></div>
          <div class="gallery-thumbs">
            ${product.images.map((img, i) => `
              <button type="button" class="${i === 0 ? "active" : ""}" data-src="${img}" aria-label="View image ${i + 1}">
                <img src="${img}" alt="" loading="lazy" />
              </button>
            `).join("")}
          </div>
        </div>
        <div class="product-info">
          <span class="eyebrow">${product.category}</span>
          <h1>${product.name}</h1>
          <p class="product-price">${formatPrice(product.price)}</p>
          <div class="product-rating">
            <span class="stars">${renderStars(rating)}</span>
            <span>${rating.toFixed(1)} (${reviewCount} reviews)</span>
          </div>
          <p class="product-description">${product.description}</p>
          <p class="text-muted" style="font-size:0.85rem">In stock: ${product.stock} available</p>
          <div class="qty-selector">
            <button type="button" id="qty-minus" aria-label="Decrease">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="${product.stock}" aria-label="Quantity" />
            <button type="button" id="qty-plus" aria-label="Increase">+</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:1rem">
            <button class="btn btn-primary" id="add-to-cart">Add to Cart</button>
            <a href="${whatsappLink(`Hi! I'm interested in ${product.name} (${product.id}) - ${formatPrice(product.price)}`)}" class="btn btn-outline" target="_blank" rel="noopener">Order via WhatsApp</a>
          </div>
        </div>
      </div>
      <section class="reviews-section">
        <h2>Customer Reviews</h2>
        ${product.reviews?.length ? product.reviews.map((r) => `
          <div class="review-item">
            <div class="stars">${renderStars(r.rating)}</div>
            <p>${r.text}</p>
            <p class="text-muted" style="font-size:0.85rem">— ${r.author}, ${r.date}</p>
          </div>
        `).join("") : `<p class="text-muted" style="margin-top:1rem">No reviews yet. Be the first!</p>`}
      </section>
    </div>
  `;

  const mainImg = document.getElementById("main-image");
  document.querySelectorAll(".gallery-thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gallery-thumbs button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      mainImg.src = btn.dataset.src;
    });
  });

  const qtyInput = document.getElementById("qty-input");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qtyInput.value = Math.min(product.stock, parseInt(qtyInput.value, 10) + 1);
  });

  document.getElementById("add-to-cart").addEventListener("click", () => {
    addToCart(product.id, parseInt(qtyInput.value, 10) || 1);
  });
}
