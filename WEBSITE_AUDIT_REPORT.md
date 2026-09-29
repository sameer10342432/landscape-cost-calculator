# LANDSCAPECOSTCALCULATOR.ONLINE
## COMPLETE WEBSITE AUDIT, REQUIREMENT VERIFICATION & FUNCTIONAL QA REPORT

**Date:** September 29, 2026  
**Auditor:** Antigravity AI Coding Assistant  
**Website:** [LandscapeCostCalculator.online](https://landscapecostcalculator.online)  
**Target Workspace:** `d:\Sameer Projects\landscape-cost-calculator`  

---

# EXECUTIVE SUMMARY

An exhaustive, non-destructive technical and functional audit of **LandscapeCostCalculator.online** was performed across all 40 routes, 8 calculation modules, mobile and desktop viewports, SEO metadata, JSON-LD schemas, and asset directories.

### Overall Status:
* **Production Build & Compilation**: Succeeded without errors (`tsc --noEmit` and `vite build` completed in 684ms).
* **Main Calculator (US Customary)**: Fully reactive, dynamic, and produces mathematically sound estimates. Not a placeholder or mock UI.
* **Metric System Flaw (P0 Critical)**: Severe calculation discrepancy. When Metric mode is activated, meter inputs are processed directly as feet without conversion, causing metric estimates to be **~10.76x too low**.
* **Guide Cluster Duplication (P1 High)**: All 13 guide pages (`/guides/*`) share a single generic template in `GuidePageView.tsx`. Topic-specific guides (e.g., mulch, retaining walls, gravel) do not have dedicated editorial content and display identical body text and tables.
* **Estimate Cluster Redundancy (P1 High)**: 5 of the 6 estimate URLs render an informational overview (`EstimateHubPage.tsx`). Only `/estimate/landscaping-estimate-template/` contains an interactive tool.
* **Schema Asset Reference (P1 High)**: JSON-LD schemas reference `https://landscapecostcalculator.online/icon.svg`, which does not exist in `/public/`.
* **Tablet Navigation Gap (P1 High)**: On viewports between 768px and 1023px, both the desktop action container (`hidden lg:flex`) and the mobile hamburger button (`flex md:hidden`) are hidden.
* **Missing Metadata on Utility Pages (P1 High)**: `<SEOHead>` is not included on `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/disclaimer/`, and `/sitemap/`.

**Production Verdict:** **⚠️ READY AFTER P0/P1 FIXES**

---

# 1. PROJECT STRUCTURE AUDIT

| Architecture Component | Implementation Details |
| :--- | :--- |
| **Framework** | React 19.0.1 |
| **Build System** | Vite 8.3.1 (`@vitejs/plugin-react` v6.1.1) |
| **Language** | TypeScript 7.0.2 (strict configuration, DOM / ES2022) |
| **Package Manager** | npm (`package-lock.json` present) |
| **Routing** | Client-side History API router in `src/App.tsx` (`currentPath`, `pushState`, `popstate`) |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite` 4.3.3) + `@layer base` & keyframes in `src/index.css` |
| **Typography** | Plus Jakarta Sans (headings) & Inter (body text) via Google Fonts |
| **Image System** | Custom `<OptimizedImage>` with lazy/eager decoding and priority loading |
| **Assets Directory** | 10 WebP images in `/public/images/landscaping/` (349 KB – 625 KB); original PNGs in `/Asset/` |
| **SEO System** | Dynamic DOM tag injection via `<SEOHead>` component (`document.title`, meta tags, canonical link, JSON-LD) |
| **Schema Types** | Organization, WebApplication, Article, BreadcrumbList, FAQPage |
| **Calculator Architecture** | React state-driven components (`useState`), centralized data in `src/data/pricingData.ts` |
| **Sitemap Implementation** | Static XML file in `public/sitemap.xml` with 40 URLs matching `seoDatabase.ts` |
| **Robots Implementation** | Static `public/robots.txt` allowing all bots and referencing `sitemap.xml` |
| **Analytics** | None installed (no GA4, GTM, or Search Console tags) |

---

# 2. ORIGINAL PROJECT REQUIREMENTS VERIFICATION

The specification requires a comprehensive Landscaping Cost Estimator + Calculator + SEO Content Hub:
* **Lawn / Sod Installation**: Implemented in main calculator & pricing catalog ($1.20/sq ft base).
* **Mulch**: Implemented in main calculator and dedicated `/mulch-calculator/`.
* **Plants & Shrubs**: Implemented with 1–3 gallon nursery shrub benchmarks ($28.00 base).
* **Trees**: Implemented in main calculator and dedicated `/tree-planting-cost-calculator/`.
* **Pavers**: Implemented in main calculator and dedicated `/paver-calculator/`.
* **Patio**: Implemented in main calculator and dedicated `/patio-cost-calculator/`.
* **Retaining Wall**: Implemented in main calculator and dedicated `/retaining-wall-cost-calculator/`.
* **Labour & Contractor Rates**: Implemented with hourly ($55/hr standard) or per-sq-ft labor options, plus regional multipliers.

---

# 3. MAIN CALCULATOR FUNCTIONALITY & EDGE CASES

* **Valid Inputs**:
  * Small projects (100 sq ft): Works properly, price scales down accurately.
  * Medium projects (600 sq ft): Default project ($10,800 total for full backyard with default parameters).
  * Large projects (5,000 sq ft): Works properly, subtotal and costs scale linearly.
* **Edge Cases Tested**:
  * `0` or negative values: Handled via `Math.max(1, parseFloat(e.target.value) || 0)`.
  * Empty inputs: Fall back safely to default minimums without throwing JavaScript errors.
  * Extremely large numbers: Validated up to input limits.
  * Decimal inputs: Handled accurately without calculation errors.
  * Reset function: Resets all dimensions, materials, and add-ons to factory defaults.
  * Summary download: Client-side Blob generation downloads `landscaping-estimate-[sqft]sqft.txt`.
  * Browser print: Formatted via `@media print` in `src/index.css`.

---

# 4. MAIN CALCULATOR OUTPUT

Outputs are **genuinely calculated** from inputs and react immediately:
* **Total Estimated Cost**: Reactive calculation displayed using `AnimatedPrice`.
* **Cost Per Square Foot**: Derived from total estimate divided by calculated square footage.
* **Low & High Estimates**: Dynamically computed at -12% and +18% of total.
* **Itemized Breakdown**:
  * Primary material cost (with waste factor percentage)
  * Secondary material cost (e.g. mulch beds around patio)
  * Labor cost (based on project hours and regional multiplier)
  * Site preparation & additions (excavation, delivery, debris disposal, permits)
  * Contractor overhead & profit (active in Contractor Mode)

---

# 5. PRICING DATA AUDIT

* **Centralized Data Layer**:
  * `src/data/pricingData.ts` contains `REGIONAL_FACTORS`, `PROJECT_TYPES`, and `MATERIALS_CATALOG`.
* **Architectural Inconsistency**:
  * While `MainLandscapingCalculator` uses `pricingData.ts`, supporting calculators (`MulchCalculator`, `PaverCalculator`, `PatioCostCalculator`, `RetainingWallCalculator`, `TreePlantingCalculator`, `LandscapeDesignCalculator`) hardcode their pricing tables directly inside component files. This fragments pricing updates.

---

# 6. UNIT SYSTEM AUDIT (US CUSTOMARY VS METRIC)

### 🔴 Critical Bug Detected:
* **Navbar Toggle**: Visually switches between "US (ft/yd)" and "Metric (m/m²)".
* **Main Calculator Discrepancy**:
  * In metric mode, labels change to "meters" and "m²".
  * However, `calculatedSqFt` is calculated as `length * width` without converting meters to feet.
  * Entering 10m length $\times$ 6m width yields `calculatedSqFt = 60`.
  * The code treats this 60 as **square feet** ($5.57\text{ m}^2$) instead of **60 square meters** ($645.8\text{ sq ft}$).
  * Total project price computes to $\$1,080$ instead of $\approx \$11,600$ (**$10.76\times$ too low**).
* **Supporting Calculators**:
  * All 7 supporting calculators receive the `unitSystem` prop but **never use it**. Inputs and units remain imperial only.
* **Square Foot Calculator**:
  * Label displays `m²` when toggled to metric, but multiplies by $/sq ft rates, giving mathematically invalid totals.

---

# 7. SUPPORTING CALCULATORS AUDIT

| Route | Implementation | Mathematical Verification |
| :--- | :--- | :--- |
| `/mulch-calculator/` | Functional | 40ft $\times$ 10ft at 3" depth = 3.7 cu yd (rounded to 3.8). 50 2-cu-ft bags. Verified. |
| `/paver-calculator/` | Functional | 20ft $\times$ 15ft with 4"x8" pavers + 10% waste = 1,418 pavers; 5.2 tons gravel; 1.3 tons sand. Verified. |
| `/patio-cost-calculator/` | Functional | 20ft $\times$ 15ft patio with pavers + sub-base prep + slope multipliers. Verified. |
| `/retaining-wall-cost-calculator/` | Functional | 30ft $\times$ 3ft concrete block wall = 90 face sq ft (105 constructed sq ft with buried course), trench gravel, drainage pipe. Verified. |
| `/tree-planting-cost-calculator/` | Functional | 3 15-gal specimen trees with labor, compost, staking, and delivery = $922.50 ($307.50/tree). Verified. |
| `/landscape-design-cost-calculator/` | Functional | 5,000 sq ft lot master 2D plan + 3D walkthrough = $2,945. Verified. |
| `/landscaping-cost-per-square-foot/` | Functional | Tier 1 ($2.50–$6), Tier 2 ($8–$18), Tier 3 ($22–$50) matrix. Verified. |

---

# 8. LANDSCAPING ESTIMATE SYSTEM

* `/estimate/landscaping-estimate/`: Does not render a dedicated calculator; renders the informational `EstimateHubPage`.
* `/estimate/landscaping-estimate-template/`: Fully interactive contractor estimate builder (`EstimateTemplateView.tsx`). Supports adding line items, quantity, unit price, tax, discount, notes, client details, CSV export, and print formatting.

---

# 9. SEO LANDING PAGES AUDIT

* `/landscaping-cost-calculator/`: Canonical alias to `/`.
* `/landscape-cost-calculator/`, `/landscaping-calculator/`, `/landscaping-pricing-calculator/`, `/landscaping-cost-estimator/`, `/landscaping-estimate-calculator/`, `/landscape-project-estimator/`:
  * All 6 pages exist and render `CalculatorPageWrapper` wrapping the primary calculator.
  * **Risk**: High keyword cannibalization risk. They share the identical calculator tool and differ only in H1, summary, and FAQ blocks.

---

# 10. CONTENT / GUIDE PAGES AUDIT

### ⚠️ Template Duplication / Thin Content Issue:
All 13 guide pages render [GuidePageView.tsx](file:///d:/Sameer%20Projects/landscape-cost-calculator/src/components/guides/GuidePageView.tsx).
* Every guide contains the exact same hardcoded body paragraphs:
  * Same "Quick Answer" numbers ($3,000 to $16,500).
  * Same "National Cost Breakdown by Project Category" table.
  * Same "Key Factors" (Yard Accessibility, Slope, Regional Labor, Material Quality).
  * Same "How to Save Money" section.
* Specific guides (e.g. `/guides/mulch-landscaping-cost/`) do not discuss mulch in their body copy. Only H1, meta description, and FAQs change.

---

# 11. ESTIMATE CONTENT CLUSTER AUDIT

* 5 URLs (`/estimate/`, `/estimate/landscaping-estimate/`, `/estimate/landscaping-estimate-cost/`, `/estimate/free-landscaping-estimate/`, `/estimate/landscaping-estimate-example/`) render `EstimateHubPage`.
* `/estimate/landscaping-estimate-example/` includes a sample project table. The other 4 pages are virtually identical, representing a doorway page / cannibalization risk.

---

# 12. KEYWORD MAPPING & SEMANTIC SEO AUDIT

* Core keywords from research are represented across URLs and metadata.
* Relevant terminology (sub-base, excavation, polymeric sand, grading, drainage, labor hours, waste factor) is present naturally.
* Problem: The keywords are spread across too many near-duplicate pages rather than clustered into high-authority pillar pages.

---

# 13. INTERNAL LINKING AUDIT

* **Orphan Pages**: 0. All 40 pages are included in `sitemap.xml`, the HTML sitemap (`/sitemap/`), and the 6-column footer navigation.
* **Broken Internal Links**: 0. All 32 navigation links resolve to valid routes.
* **Contextual Links**: Calculators link to guides and guides link to calculators via `RelatedContent.tsx`. Contextual inline hyperlinks inside guide body text are missing.

---

# 14. NAVIGATION AUDIT

* **Desktop (1024px+)**: Home, Calculators dropdown, Cost Guides dropdown, Estimates, About, Contact, Unit Switcher, and CTA button work.
* **Mobile (<768px)**: Drawer menu, brand logo, and unit switcher work cleanly.
* **Tablet (768px–1023px) Flaw**: Right-hand action container (`hidden lg:flex`) and mobile hamburger (`flex md:hidden`) are both hidden. Users on iPad/tablet cannot switch units or see the CTA button.

---

# 15. IMAGE AUDIT

All 10 required WebP images exist in `/public/images/landscaping/`:
1. `landscaping-cost-calculator.webp` (575.9 KB)
2. `backyard-landscaping-cost.webp` (625.0 KB)
3. `mulch-calculator.webp` (493.2 KB)
4. `paver-calculator.webp` (349.3 KB)
5. `patio-cost-calculator.webp` (498.4 KB)
6. `retaining-wall-cost.webp` (603.4 KB)
7. `tree-planting-cost.webp` (428.4 KB)
8. `landscape-design-cost.webp` (539.3 KB)
9. `landscaping-cost-per-square-foot.webp` (456.3 KB)
10. `landscaping-estimate.webp` (577.4 KB)

*Note: Only 11 of the 40 pages have hero images configured in `imageDatabase.ts`.*

---

# 16. META SEO & STRUCTURED DATA AUDIT

* `SEOHead.tsx` dynamically sets title, description, canonical, OG, Twitter, and JSON-LD schemas.
* **Broken Schema Asset**: Organization and Article schemas point to `${SITE_URL}/icon.svg`, which does not exist in `/public/`.
* **Missing SEOHead**: `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/disclaimer/`, and `/sitemap/` do not call `<SEOHead>`. Their meta titles and canonical tags fail to update upon client navigation.

---

# 17. TECHNICAL & PERFORMANCE AUDIT

* **Vite Build**: Succeeded (`index.js`: 470 kB / 119 kB gzip; `index.css`: 49.6 kB / 8.7 kB gzip).
* **Console Errors**: Zero unhandled runtime exceptions.
* **Unused Dependency**: `@google/genai` (v2.4.0) is in `package.json` but is never imported or used.
* **Accessibility**: Form labels are linked, focus rings are clear, and `prefers-reduced-motion` is supported in CSS and animation components.

---

# 18. ORIGINAL REQUIREMENT SCORECARD

| Requirement | Status | Evidence | Problem | Priority |
| :--- | :---: | :--- | :--- | :---: |
| **Main Landscaping Calculator** | ⚠️ PARTIAL | Functional on US customary | Metric math is broken ($10.76\times$ too low) | **P0** |
| **Mulch Calculator** | ⚠️ PARTIAL | Works in US yards/bags | Ignores Metric toggle | **P1** |
| **Paver Calculator** | ⚠️ PARTIAL | Works in US sq ft/tons | Ignores Metric toggle | **P1** |
| **Patio Cost Calculator** | ⚠️ PARTIAL | Works in US sq ft | Ignores Metric toggle | **P1** |
| **Retaining Wall Calculator** | ⚠️ PARTIAL | Works in US dimensions | Ignores Metric toggle | **P1** |
| **Tree Planting Calculator** | ✅ COMPLETE | Works dynamically | None | P3 |
| **Landscape Design Calculator** | ⚠️ PARTIAL | Works in US sq ft | Ignores Metric toggle | **P1** |
| **Cost Per Square Foot Calculator** | ⚠️ PARTIAL | Works in US sq ft | Displays m² label but computes in sq ft | **P1** |
| **Interactive Estimate Template** | ✅ COMPLETE | Full live editor + CSV export | None | P3 |
| **Estimate Hub Cluster** | ⚠️ PARTIAL | 5 URLs render identical copy | Duplicate content risk | **P1** |
| **13 Cost Guides** | ⚠️ PARTIAL | All 13 URLs exist | Generic body copy identical across all guides | **P1** |
| **Tablet Viewport Navigation** | 🔴 BROKEN | Tested at 768px | Controls disappear on 768px–1023px | **P1** |
| **SEO Structured Data (Schema)** | ⚠️ PARTIAL | Injects JSON-LD | Logo references non-existent `/icon.svg` | **P1** |
| **Utility Pages Metadata** | 🔴 BROKEN | `/about/`, `/contact/`, etc. | `<SEOHead>` omitted on 6 pages | **P1** |
| **Production Build** | ✅ COMPLETE | Vite compiles cleanly | None | P3 |
| **Assets & WebP Images** | ✅ COMPLETE | All 10 WebP files verified | 29 pages have no image mapped | P2 |
| **Regional 2026 Rates Claim** | ⚠️ PARTIAL | Regional factors exist | Applied only in main calculator | P2 |
| **Unused Dependencies** | ⚠️ PARTIAL | `@google/genai` present | Never utilized in codebase | P2 |

---

# 19. PRIORITY FIX LIST (ACTION PLAN)

### P0 — Critical (Must Fix Before Launch)
1. **Fix Metric Conversion in `MainLandscapingCalculator.tsx`**:
   Convert meter inputs to feet ($1\text{ m} = 3.28084\text{ ft}$) or square meters to square feet ($\text{m}^2 \times 10.7639$) so materials and labor rates compute accurately.

### P1 — High Priority
2. **Add `icon.svg` to `/public/`**:
   Provide the brand SVG icon to eliminate 404 errors in JSON-LD structured data.
3. **Fix Tablet Navbar in `Navbar.tsx`**:
   Adjust breakpoint classes so the unit switcher, CTA, or hamburger toggle remain visible on 768px–1023px viewports.
4. **Attach `<SEOHead>` to Utility Pages**:
   Add `<SEOHead metadata={metadata} />` to `AboutPage.tsx`, `ContactPage.tsx`, `LegalPage.tsx`, and `SitemapPage.tsx`.
5. **Implement Metric Support in Supporting Calculators**:
   Add unit conversion handling to `MulchCalculator`, `PaverCalculator`, `PatioCostCalculator`, `RetainingWallCalculator`, and `SquareFootCostCalculator`.
6. **Differentiate Guide Content**:
   Replace generic body copy in `GuidePageView.tsx` with topic-specific guidance for mulch, retaining walls, lawns, and design.
7. **Consolidate Duplicate SEO Pages**:
   Canonicalize or differentiate near-duplicate calculator URLs (`/landscaping-calculator/`, `/landscaping-pricing-calculator/`, etc.).

### P2 — Medium Priority
8. **Centralize Supporting Calculator Rates**: Move component-level pricing constants into `src/data/pricingData.ts`.
9. **Remove Unused Dependency**: Uninstall `@google/genai` from `package.json`.
10. **Expand Hero Image Mappings**: Assign relevant images to remaining guide and estimate pages.

### P3 — Low Priority
11. **Compress WebP Images**: Optimize images from ~500 KB to ~120 KB for enhanced mobile LCP.
12. **Heading Nesting**: Align `<h4>` tags under `<h3>` in `GuidePageView.tsx`.

---

# 20. PRODUCTION READINESS VERDICT

### ⚠️ READY AFTER P0/P1 FIXES

**Reasoning:**  
The website's core architecture, design aesthetic, US calculator logic, and production build are in good shape. However, production deployment must be withheld until the **P0 metric calculation bug** is resolved (preventing incorrect cost estimates for non-US users), the **P1 guide duplication** is addressed (avoiding search engine penalties for thin content), and the **missing metadata and schema assets** are corrected.
