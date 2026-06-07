/**
 * PRODUCT IMAGES — change the `images: [...]` URLs below, or use your own files:
 * 1. Save photos in assets/products/ (e.g. jj-001.jpg)
 * 2. Set images: ["assets/products/jj-001.jpg"]
 * Or use Admin → Products → Edit (no code needed).
 */
const PRODUCTS = [
  {
    id: "jj-001",
    name: "Customized Casio watch,Rolex Bracelet,Omni Box Chain",
    category: "necklaces",
    price: 450,
    currency: "GHS",
    popularity: 100, 
    stock: 24,
    featured: true,
    badge: "Bestseller",
    images: ["assets/products/jj-001.jpg"],
  
    description: "Handcrafted 18K gold-plated chain necklace with a luminous finish. Perfect for layering or wearing solo as a statement piece.",
    reviews: [
      { author: "Ama K.", rating: 5, text: "Stunning quality. Wore it to my engagement party — everyone asked where I got it!", date: "2025-11-12" },
      { author: "David M.", rating: 5, text: "Gift for my wife. Arrived beautifully packaged. She loves it.", date: "2025-10-28" }
    ]
  },
  {
    id: "jj-002",
    name: "Celestial Diamond Stud Earrings",
    category: "earrings",
    price: 899,
    currency: "GHS",
    popularity: 95,
    stock: 40,
    featured: true,
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3aaecb66?w=800&q=80"
    ],
    description: "Brilliant-cut cubic zirconia studs set in sterling silver with rhodium plating for lasting shine.",
    reviews: [
      { author: "Efua A.", rating: 5, text: "Elegant and lightweight. My everyday go-to earrings.", date: "2026-01-05" }
    ]
  },
  {
    id: "jj-003",
    name: "Royal Heritage Signet Ring",
    category: "rings",
    price: 749,
    currency: "GHS",
    popularity: 88,
    stock: 18,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e9227c9?w=800&q=80"
    ],
    description: "Bold signet ring in brushed gold finish. Engravable interior for a personal touch.",
    reviews: [
      { author: "Kwame O.", rating: 4, text: "Solid weight and premium feel. Sizing was accurate.", date: "2025-12-18" }
    ]
  },
  {
    id: "jj-004",
    name: "Luna Pearl Bracelet",
    category: "bracelets",
    price: 599,
    currency: "GHS",
    popularity: 92,
    stock: 35,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1611596973297-26c3c0c2f0a0?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
    ],
    description: "Freshwater pearls hand-strung on silk with a magnetic gold clasp for effortless elegance.",
    reviews: []
  },
  {
    id: "jj-005",
    name: "Prestige Chronograph Watch",
    category: "watches",
    price: 2499,
    currency: "GHS",
    popularity: 90,
    stock: 12,
    featured: true,
    badge: "Limited",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
    ],
    description: "Japanese quartz movement with sapphire-coated crystal and genuine leather strap.",
    reviews: [
      { author: "Nana Y.", rating: 5, text: "Looks far more expensive than the price. Perfect for boardroom and weekends.", date: "2026-02-14" }
    ]
  },
  {
    id: "jj-006",
    name: "Velvet Evening Clutch",
    category: "accessories",
    price: 449,
    currency: "GHS",
    popularity: 75,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89f76af862?w=800&q=80"
    ],
    description: "Midnight velvet clutch with gold hardware and detachable chain strap.",
    reviews: []
  },
  {
    id: "jj-007",
    name: "Harmony Layered Bracelet Set",
    category: "bracelets",
    price: 699,
    currency: "GHS",
    popularity: 85,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80"
    ],
    description: "Set of three delicate bracelets — gold, rose gold, and crystal — designed to stack beautifully.",
    reviews: []
  },
  {
    id: "jj-008",
    name: "Ethereal Drop Earrings",
    category: "earrings",
    price: 549,
    currency: "GHS",
    popularity: 82,
    stock: 30,
    images: [
      "https://images.unsplash.com/photo-1630019851112-04ae3f9a827f?w=800&q=80"
    ],
    description: "Graceful teardrop crystals on hypoallergenic hooks for all-day comfort.",
    reviews: []
  },
  {
    id: "jj-009",
    name: "Infinity Promise Ring",
    category: "rings",
    price: 399,
    currency: "GHS",
    popularity: 78,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e2?w=800&q=80"
    ],
    description: "Delicate infinity band with micro-pavé stones — a symbol of everlasting love.",
    reviews: []
  },
  {
    id: "jj-010",
    name: "Heritage Pendant Necklace",
    category: "necklaces",
    price: 849,
    currency: "GHS",
    popularity: 80,
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1610375461246-f27b3b4e3b0e?w=800&q=80"
    ],
    description: "Adinkra-inspired pendant on an adjustable gold chain celebrating Ghanaian heritage.",
    reviews: [
      { author: "Abena T.", rating: 5, text: "Meaningful design with exceptional craftsmanship. Proud to wear it.", date: "2025-09-20" }
    ]
  },
  {
    id: "jj-011",
    name: "Classic Dress Watch — Rose Gold",
    category: "watches",
    price: 1899,
    currency: "GHS",
    popularity: 72,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1548171916-3a9752b8c5c4?w=800&q=80"
    ],
    description: "Slim profile dress watch with rose gold case and mother-of-pearl dial.",
    reviews: []
  },
  {
    id: "jj-012",
    name: "Silk Scarf & Brooch Set",
    category: "accessories",
    price: 329,
    currency: "GHS",
    popularity: 65,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80"
    ],
    description: "Printed silk scarf paired with a crystal brooch for versatile styling.",
    reviews: []
  }
];

const CATEGORIES = [
  { id: "necklaces", label: "Necklaces", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" },
  { id: "bracelets", label: "Bracelets", image: "https://images.unsplash.com/photo-1611596973297-26c3c0c2f0a0?w=600&q=80" },
  { id: "rings", label: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80" },
  { id: "earrings", label: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80" },
  { id: "watches", label: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" },
  { id: "accessories", label: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89f76af862?w=600&q=80" }
];

const TESTIMONIALS = [
  { name: "Ama Serwaa", location: "Accra, Ghana", image: "https://i.pravatar.cc/150?img=5", rating: 5, text: "Jay's Jewelries exceeded every expectation. The packaging alone feels luxurious, and my necklace still shines like day one." },
  { name: "James Okonkwo", location: "Lagos, Nigeria", image: "https://i.pravatar.cc/150?img=12", rating: 5, text: "Ordered from abroad — fast shipping, authentic pieces, and WhatsApp support made the whole process seamless." },
  { name: "Sarah Mensah", location: "London, UK", image: "https://i.pravatar.cc/150?img=9", rating: 5, text: "Finally found a brand that blends African elegance with international quality. My go-to for gifts and special occasions." }
];

const BRAND = {
  name: "Jay's Jewelries",
  phone: "+233 533 850310",
  email: "jaysjewelriess@gmail.com",
  whatsapp: "233533850310",
  address: "Labone, Accra, Ghana",
  social: {
    instagram: "https://instagram.com/jaysjewelries",
    pinterest: "https://pinterest.com/jaysjewelries",
    snapchat:"https://snapchat.com/jaysjewelries"
  }
};

function formatPrice(amount, currency = "GHS") {
  return new Intl.NumberFormat("en-GH", { style: "currency", currency, minimumFractionDigits: 0 }).format(amount);
}

function getProductById(id) {
  const list = typeof getProducts === "function" ? getProducts() : PRODUCTS;
  return list.find((p) => p.id === id);
}

function getAverageRating(product) {
  if (!product.reviews?.length) return 0;
  return product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

