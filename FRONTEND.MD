# 💻 FRONT-END SPECIFICATIONS - A:BRA GLOBAL LAUNCH

**Guiding Visual Concept:** Aperture (Apertura), Amplitude (Amplitud), Clarity, Minimalist Design.
**Primary Language for Components:** English (to simplify localization files).

---

## 🎨 DESIGN (UX/UI) SPECIFICATIONS

### 1. Color Palette (Strict Usage)

* **Primary (Rigor/Formal):** Deep Blue (#04213B) - Main primary color. Also available: Deep Navy (#001F3F) or Dark Graphite (#2F4F4F)
* **Accent (AI/Glow/CTA):** Bright Cyan (#00FFFF) or Electric Green (#39FF14). Use exclusively for CTAs and data highlights.
* **Background:** Pure White (#FFFFFF) or Off-White (#F5F5F5) for section separation.

### 2. Layout and Typography

* **Style:** High use of **Negative Space** (Amplitud/Amplitud) to reflect clarity and expert focus.
* **Body Font:** Professional, high-readability sans-serif (e.g., Inter, Source Sans Pro).
* **Headlines (H1, H2):** Structured, geometric sans-serif to project precision and engineering.

### 3. Visuals and Branding Elements

* **Imagery:** Abstract or minimalist photos/videos of **wide skies, horizons, or clean technological spaces**.
* **Logo Symbol:** The logo is @abra-blanco.png or abra-negro.png
* **Bilingual Switch:** A clear and accessible language toggle (EN/ES) is required in the header, preferably an icon or a simple `EN | ES` link.

---

## ⚙️ DEVELOPMENT (TECHNICAL STACK)

### 1. Technology & Hosting

* **Stack:** Next.js (preferred for superior routing and performance) or Astro/Nuxt for static generation.
* **Styling:** Tailwind CSS or equivalent utility-first framework for efficient scaling.
* **Hosting:** Vercel, Netlify, or similar high-performance CDN host.

### 2. Performance & SEO

* **Priority:** Achieve **A/A scores on Core Web Vitals** (LCP, FID, CLS). Speed and stability are crucial for the analytical B2B audience.
* **Localization:** Implement full **i18n** support from the initial build. Use subdirectories (`/en/`, `/es/`) or subdomains for the dual-language setup. Hreflang tags are mandatory.

### 3. Data Integration

* **Analytics:** Mandatory setup of **GA4** and **GTM** for all conversion events (CTA clicks, form submissions).
* **Forms:** Implement a dedicated API endpoint for form submissions to integrate seamlessly with the agency's CRM/Qualification pipeline.

---

**CRITICAL PRIORITY:** Full implementation of **i18n** (Localization) for the entire front-end structure to ensure seamless language switching and SEO compliance across both `EN` and `ES` versions.