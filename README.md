# Jay's Jewelries — Premium E-Commerce Website

A luxury jewelry e-commerce experience with black, gold, and white branding — built for customers in Ghana and internationally.

## Features

- **Homepage** — Hero, featured products, categories, testimonials, newsletter
- **Shop** — Filter by category, price; sort by popularity, price, name
- **Product pages** — Gallery, reviews, Add to Cart, WhatsApp ordering
- **Cart & checkout** — Promo codes, Mobile Money, Visa, Mastercard, PayPal (demo UI)
- **Customer accounts** — Sign up, login, order history
- **WhatsApp** — Floating button + order/inquiry deep links
- **Admin dashboard** — Products, inventory, orders, customers, promotions
- **SEO** — Meta tags, semantic HTML, JSON-LD on homepage
- **Logo** — Custom SVG with "JJ" monogram

## Quick Start

1. Open the project folder in VS Code / Cursor.
2. Use **Live Server** (or any static server) and open `index.html`.
3. Or double-click `index.html` to open in a browser (some features work; a local server is recommended).

```bash
# If you have Python installed:
cd jays-jewelries
python -m http.server 8080
# Visit http://localhost:8080
```

## Admin Access

- URL: `admin/login.html`
- Email: `admin@jaysjewelries.com`
- Password: `admin123`

Change these credentials before deploying to production.

## Customize

| Item | File |
|------|------|
| Brand phone, email, WhatsApp | `js/products.js` → `BRAND` |
| Products | Admin → Products, or `js/products.js` |
| Colors & fonts | `css/main.css` → `:root` |
| Logo | `assets/logo.svg` |

## Production Checklist

- [ ] Replace demo checkout with **Paystack** or **Flutterwave** (Ghana Mobile Money + cards)
- [ ] Add **PayPal** REST API for international buyers
- [ ] Move auth & data to a backend (Firebase, Supabase, or custom API)
- [ ] Use real product photography and your WhatsApp business number
- [ ] Deploy to Netlify, Vercel, or GitHub Pages with HTTPS

## Tech Stack

- HTML5, CSS3 (custom design system)
- Vanilla JavaScript (ES6+)
- localStorage for cart, auth, orders (demo persistence)

## Promo Codes (Demo)

- `WELCOME10` — 10% off
- `GOLD20` — 20% off (orders over GH₵500)

---

© Jay's Jewelries — Crafted with elegance.
