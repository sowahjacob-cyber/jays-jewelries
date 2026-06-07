# Product photos

Put your jewelry photos in this folder, then link them in the site.

## Naming (recommended)

Match each product ID:

| Product ID | Suggested filename |
|------------|-------------------|
| jj-001 | `jj-001.jpg` |
| jj-002 | `jj-002.jpg` |
| … | `jj-012.jpg` |

You can use `.jpg`, `.png`, or `.webp`.

## Use in the site

**Option A — Admin (easiest)**  
1. Open `admin/login.html` → sign in  
2. Go to **Products** → click **Edit** on an item  
3. Under **Product images**, enter one path per line, for example:
   ```
   assets/products/jj-001.jpg
   assets/products/jj-001-side.jpg
   ```
4. Save and refresh the shop page  

**Option B — Code**  
Edit `js/products.js` and change the `images: [...]` array for each product.

## Tips

- Use square images around **800×800 px** for best results  
- Keep file size under **500 KB** when possible (faster loading)  
- Run the site with **Live Server** or `http://localhost` so local paths work  

## Stuck on old photos?

The browser may cache saved products. In Admin → Products, click **Reload default catalog**, or clear site data for this site in your browser settings.
