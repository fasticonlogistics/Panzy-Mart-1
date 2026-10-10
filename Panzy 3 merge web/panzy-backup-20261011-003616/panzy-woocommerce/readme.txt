PANZY STORE — WORDPRESS + WOOCOMMERCE THEME
==========================================

WHAT THIS PACKAGE IS
--------------------
This is an installable, traditional PHP WordPress theme. It uses WooCommerce
for the product catalog, prices, sale schedules, product variations, cart,
checkout, customer accounts, inventory, coupons, and orders. It contains no
sample products, fake reviews, payment credentials, or made-up company details.

The supplied PANZY logo is included in purple and white variants at
assets/images/panzy-logo.png and assets/images/panzy-logo-light.png. Its
stacked wordmark, flower mark, and tagline come from the logo image supplied
with the project. Brand styling uses Dark Purple #411E58, White #FFFFFF,
Black #000000, and restrained Indigo #4B0082, with Times New Roman headings
and Montserrat interface typography.

The homepage hero includes a locally bundled interior lifestyle photograph
for visual presentation; it is not a PANZY product photo. Verify its licensing
and suitability or replace it with a business-approved image before launch.

REQUIREMENTS AND VERIFICATION
-----------------------------
- A working WordPress installation and WooCommerce plugin are required for
  store/catalog/cart/checkout functions.
- Theme metadata requires WordPress 6.4+ and PHP 7.4+. These are minimum
  metadata requirements, not a claim that this package was tested against
  every current WordPress, PHP, WooCommerce, Hostinger, payment, or browser
  release.
- This workspace does not have PHP or a WordPress/WooCommerce installation.
  PHP linting, WordPress activation, checkout, payment, email, and live
  responsive-browser testing therefore have not been run. Follow the test
  checklist below on a staging site before launch.
- Montserrat is requested from Google Fonts. That makes a browser request to
  Google; if your privacy policy or performance requirements call for no
  third-party font request, self-host a properly licensed Montserrat font and
  change the enqueue in functions.php.

INSTALL THE THEME
-----------------
1. Back up the existing website before changing its theme. Do not activate
   this theme directly on a live store before testing it on staging.
2. In WordPress Admin, go to Plugins > Add New Plugin. Search for
   "WooCommerce", install the official WooCommerce plugin, and activate it.
   Complete its store setup using your real business details.
3. Upload panzy-theme.zip at Appearance > Themes >
   Add New Theme > Upload Theme > Choose File > Install Now > Activate.
   (The ZIP contains the panzy-woocommerce theme folder.)
4. If WooCommerce setup did not create pages, go to WooCommerce > Status >
   Tools and use the page-installation tool, or create and assign the Shop,
   Cart, Checkout, and My account pages under WooCommerce > Settings >
   Advanced > Page setup.
5. Go to Settings > Permalinks, select Post name, and click Save Changes.
6. To use the homepage layout, create a page named Home, then go to Settings
   > Reading > Your homepage displays > A static page and select Home.
7. To make the sale link available, create a published page named Sale with
   the slug "sale". The bundled page-sale.php template automatically displays
   only products whose WooCommerce sale price is active.

PLUGIN LIST
-----------
- Essential and free: WooCommerce. It provides products, categories, prices,
  cart, checkout, accounts, stock, coupons, and order administration.
- No paid plugin or custom plugin is required by this theme.
- Optional: use one maintained SEO plugin for metadata; do not run two SEO
  plugins that emit duplicate metadata/schema.
- Optional: use a maintained SMTP plugin/provider if Hostinger's configured
  mail does not reliably deliver WooCommerce emails.
- Optional: use a maintained contact-form plugin (for example Contact Form 7
  or WPForms Lite) for the Contact page, and configure spam prevention and
  tested email delivery before publishing the form.
- Optional: use a maintained security/2FA solution and an off-site backup
  service if equivalent Hostinger features are not configured and restoration
  tested.
- Check each plugin's current WordPress/WooCommerce compatibility, privacy
  impact, support, pricing, and maintenance before installing it. Paid gateway
  extensions may carry separate fees. This theme does not enable a gateway.

PERSONALIZE THE SITE
--------------------
- Announcement, hero text, and hero image: Appearance > Customize >
  PANZY Homepage. Use an authorized PANZY lifestyle image; the bundled image
  is illustrative and is used when no custom image is selected.
- Logo: the bundled PANZY logo is used in the header and footer. Do not replace
  it with a recreated wordmark.
- Main menu: Appearance > Menus (or Appearance > Editor > Navigation if your
  WordPress version presents that screen). Create a menu with Home, Shop,
  Categories, About Us, and Contact, then assign it to Primary navigation.
  Create and publish the relevant pages first. To make Categories an index of
  published WooCommerce collections, edit that page and select the
  "PANZY Categories" template under Page Attributes. Add only categories that
  exist in the real catalog. Assign an optional menu to Footer navigation.
- WhatsApp: Appearance > Customize > PANZY Homepage. Enter the verified
  business number in international format, digits only, including country
  code. The floating WhatsApp button stays hidden until a valid number is set.
- Pages: Pages > Add New. Create and fill About Us, Contact, Privacy Policy,
  Shipping Policy, Returns & Refunds, and Terms & Conditions with content
  approved by the business owner. The theme does not fabricate contact details,
  business history, policies, or guarantees.
- Contact form: a working contact form is not bundled. Install and configure a
  maintained form plugin, add its form to the Contact page, configure spam
  protection and notification recipients, then test delivery. Do not publish
  an unmonitored form.
- Newsletter: no signup is shown until you install and configure a real
  subscription provider.
- Footer widgets: Appearance > Widgets > Footer widgets. Enter only contact
  and social details supplied by the business.
- Homepage category and product areas draw from published WooCommerce content.
  Best sellers use WooCommerce popularity data; New Arrivals use publish dates;
  Special finds and the Sale page use active WooCommerce sale prices. Empty
  sections are omitted rather than filled with sample products or reviews.
- Sale badges calculate the active percentage from WooCommerce prices. For
  variable products, the badge reports the highest valid discount among active
  sale variations ("Up to ...% off"); WooCommerce remains authoritative for the
  selected variation's actual price. Small discounts that round to 0% retain
  WooCommerce's generic sale badge instead of showing a misleading 0% label.
- The header becomes sticky and compacts on scroll. Section/product reveals
  and image transitions honor the visitor's reduced-motion preference.

WOOCOMMERCE SETUP
-----------------
1. Products > Add New: enter a real product name, full and short descriptions,
   product image/gallery, SKU if used, product category, and actual dimensions,
   materials, care, and shipping information. Set prices and stock under
   Product data. Add genuine variations as attributes/variations. Write
   descriptive image alt text in the Media Library.
2. Product data > General: set the regular price. To schedule a promotion, add
   a sale price and use Schedule beside the sale price to choose real start and
   end dates. WooCommerce controls the active sale, sale badge, and displayed
   prices; do not add false countdowns or discounts.
3. Products > Categories: create categories that match inventory, add category
   images where available, and use parent categories for subcategories.
4. WooCommerce > Settings > General: set the business address, selling
   locations, and store currency based on the actual business. Confirm the
   Pakistani Rupee currency and formatting in a test order before launch.
5. WooCommerce > Settings > Shipping: add the real shipping zones, methods,
   and charges. Test an address inside and outside each zone.
6. WooCommerce > Settings > Payments: enable only payment methods that are
   eligible, configured, and tested for this merchant. Cash on Delivery and
   Direct bank transfer are WooCommerce core options to evaluate; bank transfer
   orders require manual payment confirmation. COD orders are not paid merely
   because an order was created. Do not enter card data into custom code.
7. WooCommerce > Settings > Accounts & Privacy: decide whether guest checkout
   and customer account creation are appropriate. Keep personal data retention
   settings and the Privacy Policy accurate.
8. WooCommerce > Settings > Emails: set a real sender name/address. For
   reliable delivery, configure a reputable SMTP provider and test each order
   email. An order being created, paid, and fulfilled are separate states.
9. WooCommerce > Settings > Products > Inventory: set stock handling and
   low-stock notifications to match actual operations.
10. Add coupons through Marketing > Coupons (or WooCommerce > Coupons on some
    installations). Test restrictions, dates, and cart totals with test orders.

WORKING STORE FEATURES
----------------------
- Shop/category archive: WooCommerce supplies product cards, category
  archives, stock states, sorting, pagination, sale pricing and badges, and
  add-to-cart. Product inventory, prices, images, specifications, and sale
  schedules must be entered by the store owner in WooCommerce; the theme does
  not create fake catalog entries.
- Search: the header search submits a WooCommerce product search.
- Filters: the shop/category pages show links for published top-level product
  categories and a minimum/maximum price form. The price form uses native
  WooCommerce min_price/max_price query filtering. Optional WooCommerce filter
  blocks/widgets can be added at Appearance > Widgets > Shop filters.
- Product page: WooCommerce supplies product galleries, variations, quantity,
  stock status, add-to-cart, descriptions, reviews if enabled, related items,
  and its supported gallery behavior.
- Cart/checkout/account/order security and order notifications remain
  WooCommerce responsibilities. Keep WooCommerce, WordPress, and plugins
  updated; never expose order information through a public custom endpoint.

SECURITY, PRIVACY, AND LAUNCH
-----------------------------
- Install WordPress on Hostinger using its WordPress installer; connect the
  owner's domain using the DNS values shown in Hostinger; enable and verify
  Hostinger SSL/HTTPS before accepting customer details.
- Use a unique administrator username and a strong, unique password. Enable
  two-factor authentication through a reputable maintained security plugin.
  Use Users > All Users to keep customers in the Customer role and restrict
  Shop Manager/Administrator privileges to authorized staff.
- Use WooCommerce account pages for customer order history. In staging, sign
  in as one test customer and verify that only that account's orders appear.
  Test as a second account and as a logged-out visitor. Never rely on hiding
  an order URL or button for access control.
- Configure automatic off-site backups and perform a restoration test on
  staging. Keep a record of the last successful backup.
- Publish only business-approved policies, delivery details, payment options,
  phone/email/address, social links, and product claims.
- For taxes, get advice appropriate to the business and configure only the
  rates/rules confirmed by the owner or tax professional.

STAGING TEST CHECKLIST
----------------------
Use test products and test orders. Do not run an unauthorized real payment.
Mark each item passed only after testing it on the target staging setup.

[ ] Homepage, supplied logo, header, footer, and navigation at phone, tablet,
    and desktop widths.
[ ] Search for a known product and for a term with no results.
[ ] Category page shows only the correct published category products.
[ ] Product images/gallery, variation selection, quantity, stock, and add to
    cart for a simple and a variable product.
[ ] Shop sorting by popularity, rating, newest, and price where supported.
[ ] Minimum/maximum price filter on shop and category pages; verify category
    context is retained when filtering.
[ ] Sale badge/discount percentage/prices appear only during active scheduled
    WooCommerce sales; compare simple and variable products, including a
    scheduled sale before and after its dates. Verify the Sale page lists only
    active sale products and handles the no-sale state.
[ ] Cart quantities, remove action, subtotal, coupon validity, and total.
[ ] Shipping charge/address zones, required checkout fields, and mobile checkout.
[ ] Every enabled payment method, using its documented test process. Confirm
    COD is not recorded as paid.
[ ] Test order products, prices, customer details, order status, inventory
    reduction/restock, administrator email, and customer email.
[ ] Login, registration policy, password reset, account order history, and
    access isolation between two customers and logged-out visitors.
[ ] Contact form spam protection and actual email delivery (if configured).
[ ] HTTPS certificate, mixed content, broken links, missing images, browser
    console errors, PHP/server logs, backup, and staging restoration.

KNOWN LIMITATIONS / OWNER INPUT BEFORE LAUNCH
---------------------------------------------
- No WordPress/PHP runtime or WooCommerce store is available in this workspace.
  Theme PHP activation, plugin interactions, real payment gateways, shipping,
  emails, privacy permissions, and Hostinger deployment remain untested.
- The website needs the owner's real products/product photography/prices/stock,
  contact details, approved About copy and policies, delivery rules, payment
  eligibility, tax decisions, domain, and email sender details.
- The supplied logo is a raster image extracted from the supplied logo graphic;
  it is not a vector file. Upload an owner-provided vector/transparent master
  later if available, preserving the original mark and proportions.
