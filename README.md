# $1perday! - Monetization Blog

A lightweight, ad-first blog about micro-earning methods: PTC sites, crypto faucets, autosurfing, social media monetization, and offerwalls. Now with site reviews and step-by-step guides.

## Project Structure

```
/site
  /assets
    /css
      style.css              # Main stylesheet
    /js
      main.js                # Minimal JavaScript
    /images                  # Image assets (add as needed)
  /pages
    ptc.html                 # PTC Sites guide
    faucets.html             # Crypto Faucets guide
    autosurf.html            # Autosurfing guide
    social.html              # Social Media Tasks guide
    offers.html              # Offerwalls & Surveys guide
  /reviews
    index.html               # Reviews listing page
    _template.html           # Template for new reviews (copy this)
    faucetpay.html           # Sample review: FaucetPay
  /guides
    index.html               # Guides listing page
    getting-started.html     # Beginner's complete guide
  index.html                 # Homepage with "Start Here" funnel
  header.html                # Reusable header template
  footer.html                # Reusable footer template
  README.md                  # This file
```

## How to Host

### Option 1: Static File Hosting (Simplest)
Upload all files to any static host:
- **Netlify**: Drag & drop the `/site` folder
- **GitHub Pages**: Push to repo, enable Pages
- **Vercel**: Connect repo or drag & drop
- **Cloudflare Pages**: Connect repo
- **Any shared hosting**: Upload via FTP to public_html

### Option 2: Local Development
Simply open `index.html` in a browser. All links work locally.

### Option 3: Simple Server
For local development:
```bash
# Python 3
cd site
python -m http.server 8000

# Node.js (with serve package)
npx serve site
```

---

## Adding New Content

### Adding a New Review

1. Copy `reviews/_template.html` to `reviews/[sitename].html`
2. Fill in all `[PLACEHOLDER]` sections
3. Choose the correct rating badge class:
   - `recommended` (green) - Sites we endorse
   - `decent` (blue) - Acceptable with caveats
   - `caution` (yellow) - Proceed carefully
   - `avoid` (red) - Scam or don't use
4. Add the review to `reviews/index.html` listing
5. Update any related pages that should link to it

**Review Template Checklist:**
- [ ] Update `<title>` with site name
- [ ] Update meta description
- [ ] Fill Quick Facts box
- [ ] Write honest intro
- [ ] Document earning methods
- [ ] Create realistic earnings table
- [ ] List pros and cons
- [ ] Discuss payment reliability
- [ ] Add tips section
- [ ] Write final verdict
- [ ] Add referral link (if applicable)

### Adding a New Guide

1. Copy an existing guide as template
2. Update title, meta, and content
3. Add to `guides/index.html` listing
4. Choose difficulty badge:
   - `beginner` (green)
   - `intermediate` (yellow)
   - `advanced` (red)

### Adding a New Method Page

1. Copy an existing page from `/pages/`
2. Update navigation (active state)
3. Add to navigation in ALL other files
4. Add internal links from related pages

---

## Where to Paste Ad Scripts

### Google AdSense / Ezoic / Mediavine

1. **Head Scripts**: Add to `<head>` section of each page:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script>
```

2. **Ad Slots**: Find and replace placeholder divs:
```html
<!-- Find these: -->
<div class="ad-placeholder banner">
    <!-- AD SLOT: Banner Top -->
    [728x90 Banner Ad Placeholder]
</div>

<!-- Replace with: -->
<div class="ad-slot">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXX"
         data-ad-slot="XXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
```

### Ad Slot Locations (per page)
- **Banner Top**: Below header
- **In-Content**: 2-3 slots within article
- **Sidebar**: 2 slots (300x250 recommended)
- **Footer**: Above footer nav

---

## Where to Add Referral Links

Search for `<!-- REFERRAL LINK BLOCK -->` in HTML files.

```html
<!-- Before -->
<a href="#" class="referral-link" data-ref="faucetpay">Join FaucetPay (Placeholder)</a>

<!-- After -->
<a href="https://faucetpay.io/?r=YOUR_ID" class="referral-link" data-ref="faucetpay" target="_blank" rel="noopener">Join FaucetPay</a>
```

---

## Where to Add Offerwalls

Search for `<!-- OFFERWALL PLACEHOLDER -->` in review and faucet pages.

Example (CPX Research):
```html
<iframe src="https://offers.cpx.research.com/index.php?app_id=YOUR_APP_ID&ext_user_id=USER_ID"
        width="100%" height="600" frameborder="0"></iframe>
```

---

## Analytics Setup

Add before `</head>` in each page:

### Google Analytics 4
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>
```

### Privacy-Focused (Plausible)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## What NOT to Automate (Ban Prevention)

### Ad Networks
- **NEVER** use autosurfers on monetized pages
- **NEVER** click your own ads
- **NEVER** encourage ad clicking

### Affiliate Programs
- **NEVER** create fake referrals
- **NEVER** use bots
- **NEVER** mislead about earnings

### Content
- **NEVER** auto-generate without review
- **NEVER** copy from other sites

---

## Customization

### Changing Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
    --primary: #2563eb;      /* Main accent */
    --primary-dark: #1d4ed8; /* Hover state */
    --text: #1f2937;         /* Body text */
    --bg: #ffffff;           /* Background */
    --bg-alt: #f3f4f6;       /* Alt background */
}
```

### Changing Site Name
The site is named "$1perday!" - search and replace if needed.

### Adding Social Links
Add to footer:
```html
<div class="footer-social">
    <a href="https://twitter.com/yourhandle">Twitter</a>
    <a href="https://youtube.com/yourchannel">YouTube</a>
</div>
```

---

## Content Workflow

### For Reviews
1. Research the site thoroughly
2. Test it yourself if possible
3. Check Reddit/forums for user experiences
4. Copy `_template.html`
5. Write honest assessment
6. Add to index listing
7. Cross-link from related pages

### For Guides
1. Identify user need/question
2. Outline step-by-step process
3. Include screenshots if helpful
4. Add realistic expectations
5. Link to related reviews/content

---

## SEO Checklist

Each page includes:
- [x] Unique `<title>` (50-60 chars)
- [x] Meta description (150-160 chars)
- [x] Canonical URL placeholder
- [x] Open Graph tags
- [x] Semantic HTML
- [x] Internal linking
- [x] Mobile-responsive design

### To Complete After Hosting
1. Add canonical URLs with actual domain
2. Create sitemap.xml
3. Set up Google Search Console
4. Add robots.txt
5. Consider schema markup

---

## File Sizes

- `style.css`: ~12KB
- `main.js`: ~3KB
- HTML pages: ~15-30KB each
- **Total site**: ~250KB (excluding images)

No build process. No dependencies. Just HTML, CSS, and minimal JS.

---

## Quick Reference

| Task | Location |
|------|----------|
| Add new review | Copy `reviews/_template.html` |
| Add new guide | Copy existing guide |
| Change site name | Search/replace "$1perday!" |
| Add ad code | Search for `<!-- AD SLOT` |
| Add referral | Search for `<!-- REFERRAL LINK BLOCK` |
| Add offerwall | Search for `<!-- OFFERWALL PLACEHOLDER` |

---

## Support

This is a static site template. Updates are manual:
1. Edit HTML files directly
2. Re-upload to host
3. Clear CDN cache if applicable

---

**Remember**: Focus on honest, helpful content. The goal is sustainable passive monetization through trust and quality, not quick schemes.

Good luck with $1perday!
