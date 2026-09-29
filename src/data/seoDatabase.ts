import { SEOMetadata } from '../types';

export const SITE_DOMAIN = 'landscapecostcalculator.online';
export const SITE_URL = 'https://landscapecostcalculator.online';
export const BRAND_NAME = 'Landscape Cost Calculator';

export const SEO_PAGES: Record<string, SEOMetadata> = {
  // 1. Home / Primary Calculator
  '/': {
    path: '/',
    primaryKeyword: 'landscaping cost calculator',
    secondaryKeywords: [
      'landscaping calculator',
      'landscape cost calculator',
      'landscaping estimate calculator',
      'backyard landscaping cost calculator',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscaping Cost Calculator – Estimate Project Costs (2026)',
    metaDescription:
      'Estimate landscaping project costs, material quantities, and contractor labor rates in minutes. Free, transparent cost breakdown for your property.',
    h1: 'Landscaping Cost Calculator',
    summary:
      'Plan your residential or commercial landscaping project with our comprehensive cost estimator. Calculate materials, equipment, labor, and waste factor for accurate budgeting.',
    relatedCalculators: [
      '/mulch-calculator/',
      '/paver-calculator/',
      '/patio-cost-calculator/',
      '/retaining-wall-cost-calculator/',
      '/landscaping-cost-per-square-foot/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscaping-cost-per-square-foot/',
      '/guides/backyard-landscaping-cost/',
      '/guides/landscape-project-cost-factors/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'How much does landscaping cost on average in the US?',
        answer:
          'Most homeowners spend between $3,000 and $16,500 for a landscaping project, with a national average around $8,400. Basic softscaping (mulch, plants, sod) averages $4 to $12 per square foot, while hardscaping (patios, retaining walls, pavers) typically ranges from $15 to $45 per square foot.',
      },
      {
        question: 'How do you calculate landscaping cost per square foot?',
        answer:
          'Multiply your project length by width to obtain the total square footage. Then multiply by the expected tier cost: basic lawn/mulch ($2-$6/sq ft), intermediate mixed garden ($8-$15/sq ft), or full hardscape/patio ($18-$40+/sq ft). Add 10% to 15% for material waste and site preparation.',
      },
      {
        question: 'What is the biggest cost factor in landscaping?',
        answer:
          'Labor and site excavation are usually the largest cost factors, often comprising 45% to 65% of the total quote. Material choices, accessibility for heavy machinery, slope grading, and debris haul-away also significantly impact pricing.',
      },
      {
        question: 'How accurate are online landscaping cost calculators?',
        answer:
          'Our calculator uses verified regional labor rates and current wholesale material benchmarks. While it provides an accurate planning estimate, actual on-site contractor bids will depend on soil condition, underground utilities, and specific custom finishes.',
      },
    ],
  },

  // 2. Canonical alias for Primary Calculator
  '/landscaping-cost-calculator/': {
    path: '/landscaping-cost-calculator/',
    canonicalPath: '/',
    primaryKeyword: 'landscaping cost calculator',
    secondaryKeywords: [
      'landscaping cost estimator',
      'landscaping estimate cost',
      'landscape cost estimator tool',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscaping Cost Calculator – Instant Materials & Labor Breakdown',
    metaDescription:
      'Free online landscaping cost calculator. Estimate materials, installation labor, grading, and equipment for backyards, lawns, and gardens.',
    h1: 'Landscaping Cost Calculator',
    summary:
      'Calculate complete landscaping project costs with customizable material rates, regional labor multipliers, and equipment allowances.',
    relatedCalculators: [
      '/mulch-calculator/',
      '/paver-calculator/',
      '/patio-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscaping-cost-per-square-foot/',
      '/guides/backyard-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'What items are included in this landscaping estimate?',
        answer:
          'The calculator separates materials (sod, mulch, pavers, plants, topsoil), labor hours, equipment rental, delivery fees, excavation/removal, and contractor overhead margins.',
      },
      {
        question: 'Should I add a contingency waste factor?',
        answer:
          'Yes. Industry standards recommend adding 10% for softscape projects (mulch, sod, plants) and 10% to 15% for hardscape pavers and stone cutting.',
      },
    ],
  },

  // 3. Supporting Calculator: Mulch Calculator
  '/mulch-calculator/': {
    path: '/mulch-calculator/',
    primaryKeyword: 'mulch calculator',
    secondaryKeywords: [
      'mulch calculator yard',
      'cubic yard mulch calculator',
      'mulch calculator bags',
      'landscaping mulch calculator',
      'mulch calculator square feet',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Mulch Calculator – Calculate Cubic Yards & Bags Needed',
    metaDescription:
      'Free mulch calculator. Calculate how many cubic yards or bags of mulch you need by area and depth. Compare bulk vs bagged pricing instantly.',
    h1: 'Mulch Calculator: Yards & Bags Estimator',
    summary:
      'Determine exactly how much mulch you need for flower beds and landscape trees. Enter length, width, and desired depth to calculate cubic yards, cubic feet, and 2 or 3 cu ft bags.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/paver-calculator/',
      '/patio-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/mulch-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscaping-cost-per-square-foot/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'How deep should mulch be spread?',
        answer:
          'The ideal depth for landscape mulch is 2 to 3 inches. Applying thinner than 2 inches will not suppress weeds effectively, while exceeding 4 inches can smother plant roots and retain excessive moisture.',
      },
      {
        question: 'How many bags of mulch equal 1 cubic yard?',
        answer:
          'One cubic yard equals 27 cubic feet. Therefore, 1 cubic yard requires 13.5 bags of 2-cubic-foot mulch or 9 bags of 3-cubic-foot mulch.',
      },
      {
        question: 'Is it cheaper to buy bulk mulch or bagged mulch?',
        answer:
          'For projects over 3 to 4 cubic yards (about 40 to 50 bags), bulk mulch delivered by the truckload is usually 30% to 50% cheaper, averaging $35 to $60 per cubic yard plus local delivery.',
      },
    ],
  },

  // 4. Supporting Calculator: Paver Calculator
  '/paver-calculator/': {
    path: '/paver-calculator/',
    primaryKeyword: 'paver calculator',
    secondaryKeywords: [
      'patio paver calculator',
      'paver calculator square feet',
      'paver calculator with spacing',
      'landscape paver calculator',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Paver Calculator – Calculate Pavers, Sand & Base for Any Area',
    metaDescription:
      'Accurate paver calculator. Enter patio or walkway dimensions to calculate total pavers, bedding sand, crushed gravel base, and material costs.',
    h1: 'Paver Calculator: Patio & Walkway Materials',
    summary:
      'Calculate exact paver quantities, cutting waste factor, bedding sand tons, and gravel base volume for your patio, driveway, or walkway installation.',
    relatedCalculators: [
      '/patio-cost-calculator/',
      '/landscaping-cost-calculator/',
      '/retaining-wall-cost-calculator/',
      '/mulch-calculator/',
    ],
    relatedGuides: [
      '/guides/patio-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscaping-cost-per-square-foot/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'How much extra paver waste should I calculate?',
        answer:
          'For straight rectangular layouts, add a 10% waste factor for cutting and border soldier courses. For curved borders, herringbone patterns, or irregular shapes, add 15% to 20% waste.',
      },
      {
        question: 'How much gravel base is required under pavers?',
        answer:
          'Patios and pedestrian walkways require a minimum 4 to 6 inches of compacted crushed stone base (#57 or road base) topped with 1 inch of uncompacted coarse bedding sand.',
      },
    ],
  },

  // 5. Supporting Calculator: Patio Cost Calculator
  '/patio-cost-calculator/': {
    path: '/patio-cost-calculator/',
    primaryKeyword: 'patio cost calculator',
    secondaryKeywords: [
      'pavers patio cost calculator',
      'concrete patio cost calculator',
      'patio paver cost calculator',
      'patio cost per square foot',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Patio Cost Calculator – Estimate Paver & Concrete Patio Prices',
    metaDescription:
      'Estimate patio costs based on size, surface material (pavers, poured concrete, flagstone, stamped), excavation, and labor. Compare material budgets.',
    h1: 'Patio Cost Calculator',
    summary:
      'Explore realistic installation costs for poured concrete, stamped concrete, interlocking pavers, and natural flagstone patios with breakdown by prep, materials, and labor.',
    relatedCalculators: [
      '/paver-calculator/',
      '/landscaping-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/patio-landscaping-cost/',
      '/guides/backyard-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'What is the average cost to build a 300 sq ft patio?',
        answer:
          'A typical 300 sq ft patio costs between $3,600 and $9,000. Basic poured concrete starts around $8 to $12 per sq ft, interlocking pavers range from $16 to $28 per sq ft, and natural flagstone can cost $25 to $45+ per sq ft.',
      },
      {
        question: 'Does a patio require building permits?',
        answer:
          'Most ground-level paver or slab patios do not require permits unless they cover a significant portion of lot impervious surface or are connected to electrical/gas lines.',
      },
    ],
  },

  // 6. Supporting Calculator: Retaining Wall Cost Calculator
  '/retaining-wall-cost-calculator/': {
    path: '/retaining-wall-cost-calculator/',
    primaryKeyword: 'retaining wall cost calculator',
    secondaryKeywords: [
      'concrete retaining wall cost calculator',
      'timber retaining wall cost calculator',
      'stone retaining wall cost calculator',
      'retaining wall cost per square foot',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Retaining Wall Cost Calculator – Estimate Block, Stone & Timber',
    metaDescription:
      'Estimate retaining wall installation costs based on length, height, block type, backfill drainage gravel, excavation, and professional labor.',
    h1: 'Retaining Wall Cost Calculator',
    summary:
      'Estimate structural retaining wall costs for landscape terracing and erosion control. Calculates face square footage, block units, backfill gravel, and drainage pipe.',
    relatedCalculators: [
      '/patio-cost-calculator/',
      '/paver-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/retaining-wall-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscape-project-cost-factors/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'How much does a retaining wall cost per square foot of face?',
        answer:
          'Retaining walls cost an average of $25 to $55 per face square foot installed. Interlocking concrete blocks cost $25-$40/sq ft, timber walls run $20-$35/sq ft, and natural stonework ranges from $35-$75+/sq ft.',
      },
      {
        question: 'When does a retaining wall require an engineered permit?',
        answer:
          'In most US municipalities, any retaining wall exceeding 4 feet in total height (including buried base courses) requires structural engineer approval and a municipal building permit.',
      },
    ],
  },

  // 7. Supporting Calculator: Tree Planting Cost Calculator
  '/tree-planting-cost-calculator/': {
    path: '/tree-planting-cost-calculator/',
    primaryKeyword: 'tree planting cost calculator',
    secondaryKeywords: [
      'tree planting cost',
      'landscaping tree cost',
      'cost to plant shade tree',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Tree Planting Cost Calculator – Estimate Nursery Stock & Labor',
    metaDescription:
      'Calculate tree planting costs by caliper size, container volume, quantity, soil preparation, delivery, and professional arborist/landscaper labor.',
    h1: 'Tree Planting Cost Calculator',
    summary:
      'Determine the full budget for planting shade trees, ornamental flowering trees, and privacy hedges including tree specimens, excavation, staking, and mulch.',
    relatedCalculators: [
      '/mulch-calculator/',
      '/landscaping-cost-calculator/',
      '/landscape-design-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscape-project-cost-factors/',
      '/guides/front-yard-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'How much does it cost to plant a mature landscape tree?',
        answer:
          'Planting a 5- to 15-gallon young tree costs between $150 and $350 total. Planting a large 2- to 3-inch caliper balled-and-burlapped (B&B) shade tree averages $400 to $900 including equipment and warranty.',
      },
    ],
  },

  // 8. Supporting Calculator: Landscape Design Cost Calculator
  '/landscape-design-cost-calculator/': {
    path: '/landscape-design-cost-calculator/',
    primaryKeyword: 'landscape design cost calculator',
    secondaryKeywords: [
      'landscape design cost',
      'landscape design cost per square foot',
      'landscape architect cost',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscape Design Cost Calculator – 2D Plans & 3D Renderings',
    metaDescription:
      'Estimate professional landscape design fees. Calculate consultation fees, 2D master planting plans, and 3D architectural backyard renderings.',
    h1: 'Landscape Design Cost Calculator',
    summary:
      'Budget for design consultations, site surveys, hardscape layouts, and 3D renderings before breaking ground on your residential landscape renovation.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/patio-cost-calculator/',
      '/landscape-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscape-design-cost/',
      '/guides/landscape-design-cost-factors/',
      '/guides/backyard-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'How much do landscape designers charge?',
        answer:
          'Landscape designers typically charge $50 to $150 per hour or flat project design packages ranging from $750 to $3,500. Licensed landscape architects generally charge $100 to $200 per hour for complex grading and structural plans.',
      },
    ],
  },

  // 9. Supporting Calculator: Landscaping Cost Per Square Foot
  '/landscaping-cost-per-square-foot/': {
    path: '/landscaping-cost-per-square-foot/',
    primaryKeyword: 'landscaping cost per square foot',
    secondaryKeywords: [
      'average landscaping cost per square foot',
      'landscaping cost per sq ft',
      'cost per square foot to landscape',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscaping Cost Per Square Foot – 2026 Price Calculator',
    metaDescription:
      'Explore average landscaping costs per square foot by project tier: basic sod ($1-$3), intermediate plantings ($5-$12), and hardscapes ($15-$45+).',
    h1: 'Landscaping Cost Per Square Foot Guide & Calculator',
    summary:
      'Interactive pricing matrix and square footage estimator. Compare costs across softscape, hardscape, and full yard overhauls with tiered benchmark pricing.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/mulch-calculator/',
      '/paver-calculator/',
      '/patio-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/landscaping-cost-per-square-foot/',
      '/guides/how-much-does-landscaping-cost/',
      '/guides/backyard-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
    faqs: [
      {
        question: 'What is the standard rule of thumb for landscaping cost per square foot?',
        answer:
          'Most residential landscaping ranges between $4 and $25 per square foot. Plain sod installation averages $1.50-$3.00/sq ft, mixed perennial garden beds average $8-$16/sq ft, and paver patios/retaining walls cost $18-$40+/sq ft.',
      },
    ],
  },

  // 10. Secondary SEO Landing Page: Landscape Cost Calculator
  '/landscape-cost-calculator/': {
    path: '/landscape-cost-calculator/',
    canonicalPath: '/',
    primaryKeyword: 'landscape cost calculator',
    secondaryKeywords: [
      'landscape project cost calculator',
      'landscape installation cost',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscape Cost Calculator – Residential Project Budgeting',
    metaDescription:
      'Calculate total landscape installation costs for curb appeal, backyards, and full estate renovations with phased budgeting options.',
    h1: 'Landscape Cost Calculator: Full Property Planner',
    summary:
      'A holistic planning tool tailored for multi-phase property enhancements, combining front yard curb appeal, outdoor living areas, and landscape drainage.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/patio-cost-calculator/',
      '/landscape-design-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/front-yard-landscaping-cost/',
      '/guides/backyard-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
  },

  // 11. Main SEO Landing Page: Landscaping Calculator
  '/landscaping-calculator/': {
    path: '/landscaping-calculator/',
    canonicalPath: '/',
    primaryKeyword: 'landscaping calculator',
    secondaryKeywords: [
      'yard landscaping calculator',
      'landscaping material calculator',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscaping Calculator – Materials, Yardage & Costs',
    metaDescription:
      'All-in-one landscaping calculator. Work out volume, quantities, and installation costs for mulch, soil, stone, sod, and pavers.',
    h1: 'Landscaping Calculator',
    summary:
      'Quickly compute material volumes (cubic yards, square feet, tons) and estimate project labor with our versatile landscaping calculator.',
    relatedCalculators: [
      '/mulch-calculator/',
      '/paver-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/guides/landscaping-cost-per-square-foot/',
    ],
    schemaType: 'WebApplication',
  },

  // 12. Main SEO Landing Page: Landscaping Pricing Calculator
  '/landscaping-pricing-calculator/': {
    path: '/landscaping-pricing-calculator/',
    primaryKeyword: 'landscaping pricing calculator',
    secondaryKeywords: [
      'landscaper pricing calculator',
      'landscaping contractor pricing tool',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Pricing Calculator – Contractor Rates & Margins',
    metaDescription:
      'Calculate landscaping pricing with customizable contractor hourly rates, material markup percentages, equipment costs, and profit margins.',
    h1: 'Landscaping Pricing Calculator for Contractors & Homeowners',
    summary:
      'Transparent pricing breakdown designed to help homeowners evaluate quotes and help contractors price bids with fair overhead and profit margins.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/landscaping-cost-per-square-foot/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-template/',
      '/guides/landscape-project-cost-factors/',
    ],
    schemaType: 'WebApplication',
  },

  // 13. Main SEO Landing Page: Landscaping Cost Estimator
  '/landscaping-cost-estimator/': {
    path: '/landscaping-cost-estimator/',
    canonicalPath: '/',
    primaryKeyword: 'landscaping cost estimator',
    secondaryKeywords: [
      'backyard cost estimator',
      'lawn cost estimator tool',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Cost Estimator – Fast Ballpark Project Quotes',
    metaDescription:
      'Fast, reliable landscaping cost estimator. Input your yard dimensions and features for an instant low-to-high price range projection.',
    h1: 'Landscaping Cost Estimator',
    summary:
      'Generate low, median, and high ballpark cost ranges to evaluate project feasibility and set a realistic landscaping budget.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/patio-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/guides/backyard-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
  },

  // 14. Main SEO Landing Page: Landscaping Estimate Calculator
  '/landscaping-estimate-calculator/': {
    path: '/landscaping-estimate-calculator/',
    canonicalPath: '/',
    primaryKeyword: 'landscaping estimate calculator',
    secondaryKeywords: [
      'free landscaping estimate calculator',
      'estimate landscaping job',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Estimate Calculator – Generate Itemized Quotes',
    metaDescription:
      'Create an itemized estimate for your upcoming landscaping project. Review detailed materials, labor hours, and site preparation costs.',
    h1: 'Landscaping Estimate Calculator',
    summary:
      'Build a structured itemized estimate with line-item breakdowns, unit costs, and printable summary sheets.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/landscape-project-estimator/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-template/',
      '/estimate/landscaping-estimate-cost/',
    ],
    schemaType: 'WebApplication',
  },

  // 15. Main SEO Landing Page: Landscape Project Estimator
  '/landscape-project-estimator/': {
    path: '/landscape-project-estimator/',
    canonicalPath: '/',
    primaryKeyword: 'landscape project estimator',
    secondaryKeywords: [
      'landscape project cost calculator',
      'backyard project estimator',
    ],
    searchIntent: 'Tool/Utility',
    metaTitle: 'Landscape Project Estimator – Scope, Timeline & Budgeting',
    metaDescription:
      'Scope your outdoor living renovation from initial grading to finish plantings. Calculate realistic budgets and material requirements.',
    h1: 'Landscape Project Estimator',
    summary:
      'Plan comprehensive outdoor projects encompassing grading, drainage, hardscaping, turf, and irrigation systems.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/patio-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/landscape-project-cost-factors/',
      '/guides/backyard-landscaping-cost/',
    ],
    schemaType: 'WebApplication',
  },

  // 16. Informational Guide: How Much Does Landscaping Cost
  '/guides/how-much-does-landscaping-cost/': {
    path: '/guides/how-much-does-landscaping-cost/',
    primaryKeyword: 'how much does landscaping cost',
    secondaryKeywords: [
      'average cost of landscaping',
      'landscaping costs breakdown',
      'cost to landscape a yard',
    ],
    searchIntent: 'Informational',
    metaTitle: 'How Much Does Landscaping Cost? (2026 Price Guide)',
    metaDescription:
      'Learn how much landscaping costs in 2026. Review national averages, cost breakdowns by project type, labor rates, and tips to save money.',
    h1: 'How Much Does Landscaping Cost? Complete Price Breakdown',
    summary:
      'An in-depth guide covering average landscaping costs, softscape vs hardscape expenses, and realistic budgets for front yards and backyards.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/landscaping-cost-per-square-foot/',
      '/patio-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/landscaping-cost-per-square-foot/',
      '/guides/backyard-landscaping-cost/',
      '/guides/landscape-project-cost-factors/',
    ],
    schemaType: 'Article',
    faqs: [
      {
        question: 'What is a typical budget for residential landscaping?',
        answer:
          'Homeowners typically invest 5% to 10% of their home value in landscaping. For a $400,000 home, a comprehensive outdoor living investment is roughly $20,000 to $40,000.',
      },
    ],
  },

  // 17. Informational Guide: Landscaping Cost Per Square Foot
  '/guides/landscaping-cost-per-square-foot/': {
    path: '/guides/landscaping-cost-per-square-foot/',
    primaryKeyword: 'landscaping cost per square foot',
    secondaryKeywords: [
      'average landscaping cost per square foot',
      'cost per sq ft to landscape',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Landscaping Cost Per Square Foot: Averages & Price Tiers',
    metaDescription:
      'Detailed price breakdown of landscaping cost per square foot across basic turf, planted flower beds, stone pathways, and luxury hardscaping.',
    h1: 'Landscaping Cost Per Square Foot: Complete Analysis',
    summary:
      'Understand exactly what you get per square foot at $5, $15, $30, and $50+ tiers, and calculate your total project budget.',
    relatedCalculators: [
      '/landscaping-cost-per-square-foot/',
      '/landscaping-cost-calculator/',
      '/paver-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/guides/patio-landscaping-cost/',
      '/guides/backyard-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 18. Informational Guide: How Much Does Landscape Design Cost
  '/guides/how-much-does-landscape-design-cost/': {
    path: '/guides/how-much-does-landscape-design-cost/',
    primaryKeyword: 'how much does landscape design cost',
    secondaryKeywords: [
      'cost of landscape design',
      'landscape design fees',
      'landscape architect cost per hour',
    ],
    searchIntent: 'Informational',
    metaTitle: 'How Much Does Landscape Design Cost? 2D, 3D & Architect Fees',
    metaDescription:
      'Find out how much professional landscape design costs. Review hourly rates, 2D planting plans, 3D virtual walkthroughs, and design packages.',
    h1: 'How Much Does Landscape Design Cost?',
    summary:
      'Understand the fees charged by landscape designers vs landscape architects, and choose the right design tier for your property.',
    relatedCalculators: [
      '/landscape-design-cost-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/landscape-design-cost-factors/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 19. Informational Guide: Landscape Design Cost Factors
  '/guides/landscape-design-cost-factors/': {
    path: '/guides/landscape-design-cost-factors/',
    primaryKeyword: 'landscape design cost',
    secondaryKeywords: [
      'landscape design price factors',
      'factors affecting landscape design costs',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Key Factors That Determine Landscape Design Costs',
    metaDescription:
      'Discover the main variables that impact landscape design pricing: lot topography, structural engineering, 3D rendering detail, and municipal permits.',
    h1: 'Landscape Design Cost Factors Explained',
    summary:
      'Learn how property slope, drainage requirements, permit approvals, and revision rounds shape your overall design investment.',
    relatedCalculators: [
      '/landscape-design-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscape-design-cost/',
      '/guides/landscape-project-cost-factors/',
    ],
    schemaType: 'Article',
  },

  // 20. Informational Guide: Backyard Landscaping Cost
  '/guides/backyard-landscaping-cost/': {
    path: '/guides/backyard-landscaping-cost/',
    primaryKeyword: 'backyard landscaping cost',
    secondaryKeywords: [
      'cost to landscape a backyard',
      'average backyard landscaping cost',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Backyard Landscaping Cost: Budgeting Your Outdoor Living Area',
    metaDescription:
      'Complete cost guide for backyard landscaping. Price out patios, fire pits, turf, privacy trees, outdoor kitchens, and shade structures.',
    h1: 'Backyard Landscaping Cost Guide',
    summary:
      'Plan your dream backyard renovation with realistic cost expectations for hardscape patios, turf, privacy plantings, and ambient lighting.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/patio-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/patio-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
      '/guides/front-yard-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 21. Informational Guide: Front Yard Landscaping Cost
  '/guides/front-yard-landscaping-cost/': {
    path: '/guides/front-yard-landscaping-cost/',
    primaryKeyword: 'front yard landscaping cost',
    secondaryKeywords: [
      'curb appeal landscaping cost',
      'cost to landscape front yard',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Front Yard Landscaping Cost: Maximize Curb Appeal & Value',
    metaDescription:
      'Find out how much front yard landscaping costs. Budget for walkway pavers, foundation planting beds, sod installation, and exterior lighting.',
    h1: 'Front Yard Landscaping Cost & Curb Appeal Guide',
    summary:
      'Discover cost-effective strategies to elevate your home curb appeal, from entry walkways and specimen trees to low-maintenance foundation shrubs.',
    relatedCalculators: [
      '/paver-calculator/',
      '/tree-planting-cost-calculator/',
      '/mulch-calculator/',
    ],
    relatedGuides: [
      '/guides/backyard-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
      '/guides/lawn-installation-cost/',
    ],
    schemaType: 'Article',
  },

  // 22. Informational Guide: Patio Landscaping Cost
  '/guides/patio-landscaping-cost/': {
    path: '/guides/patio-landscaping-cost/',
    primaryKeyword: 'patio landscaping cost',
    secondaryKeywords: [
      'cost to landscape around a patio',
      'patio installation price guide',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Patio Landscaping Cost: Pavers, Stone & Surrounding Beds',
    metaDescription:
      'Calculate patio landscaping costs. Learn how materials, excavation depth, sub-base gravel, and perimeter landscape beds affect the total cost.',
    h1: 'Patio Landscaping Cost & Construction Guide',
    summary:
      'Detailed overview of patio installation pricing, comparing stamped concrete, pavers, and natural flagstone with surrounding planting beds.',
    relatedCalculators: [
      '/patio-cost-calculator/',
      '/paver-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/backyard-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 23. Informational Guide: Retaining Wall Landscaping Cost
  '/guides/retaining-wall-landscaping-cost/': {
    path: '/guides/retaining-wall-landscaping-cost/',
    primaryKeyword: 'retaining wall cost',
    secondaryKeywords: [
      'cost to build a retaining wall',
      'retaining wall cost per foot',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Retaining Wall Landscaping Cost: Blocks, Stone & Timber',
    metaDescription:
      'Learn how much retaining walls cost per linear foot and face square foot. Compare concrete blocks, natural boulders, and treated wood.',
    h1: 'Retaining Wall Landscaping Cost Guide',
    summary:
      'Budget accurately for erosion control and hillside terracing with material comparisons, drainage requirements, and labor estimates.',
    relatedCalculators: [
      '/retaining-wall-cost-calculator/',
      '/patio-cost-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/landscape-project-cost-factors/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 24. Informational Guide: Mulch Landscaping Cost
  '/guides/mulch-landscaping-cost/': {
    path: '/guides/mulch-landscaping-cost/',
    primaryKeyword: 'mulch landscaping cost',
    secondaryKeywords: [
      'cost of mulch per yard installed',
      'mulch delivery and spreading cost',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Mulch Landscaping Cost: Material, Delivery & Spreading Rates',
    metaDescription:
      'How much does mulch cost per cubic yard and bag? Review hardwood, cedar, and black dyed mulch costs plus professional spreading labor rates.',
    h1: 'Mulch Landscaping Cost & Buying Guide',
    summary:
      'Compare bulk truckload delivery vs bagged mulch from home centers, and calculate professional spreading and bed edging labor costs.',
    relatedCalculators: [
      '/mulch-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/rock-landscaping-cost/',
      '/guides/gravel-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 25. Informational Guide: Rock Landscaping Cost
  '/guides/rock-landscaping-cost/': {
    path: '/guides/rock-landscaping-cost/',
    primaryKeyword: 'rock landscaping cost',
    secondaryKeywords: [
      'river rock landscaping cost',
      'cost of decorative rock landscaping',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Rock Landscaping Cost: River Rock, Boulders & Pea Gravel',
    metaDescription:
      'Comprehensive price guide for rock landscaping. Learn costs per ton, square foot coverage, heavy weed barrier fabric, and edging installation.',
    h1: 'Rock Landscaping Cost Guide: River Rock, Boulders & Lava Rock',
    summary:
      'Explore durable, low-maintenance decorative rock landscaping costs. Compare ton prices and long-term savings over annual organic mulching.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/mulch-calculator/',
    ],
    relatedGuides: [
      '/guides/gravel-landscaping-cost/',
      '/guides/mulch-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 26. Informational Guide: Gravel Landscaping Cost
  '/guides/gravel-landscaping-cost/': {
    path: '/guides/gravel-landscaping-cost/',
    primaryKeyword: 'gravel landscaping cost',
    secondaryKeywords: [
      'crushed stone landscaping cost',
      'pea gravel walkway cost',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Gravel Landscaping Cost: Driveways, Walkways & Patio Beds',
    metaDescription:
      'How much does gravel landscaping cost? Review prices for pea gravel, crushed granite, decomposed granite, and road base per ton and yard.',
    h1: 'Gravel Landscaping Cost & Installation Guide',
    summary:
      'A practical price guide for permeable gravel pathways, fire pit patios, and water-wise xeriscaping.',
    relatedCalculators: [
      '/paver-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/rock-landscaping-cost/',
      '/guides/patio-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 27. Informational Guide: Lawn Installation Cost
  '/guides/lawn-installation-cost/': {
    path: '/guides/lawn-installation-cost/',
    primaryKeyword: 'lawn installation cost',
    secondaryKeywords: [
      'cost to sod a lawn',
      'hydroseeding cost per sq ft',
      'sod vs seed cost',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Lawn Installation Cost: Sod, Hydroseed & Grass Seed Compared',
    metaDescription:
      'Compare lawn installation costs for sod, hydroseeding, and traditional grass seed. Review grading prep, topsoil replenishment, and labor prices.',
    h1: 'Lawn Installation Cost: Sod vs Hydroseed vs Seed',
    summary:
      'Detailed cost breakdown of establishing a lush new lawn. Compare sod ($1.50-$3.50/sq ft) with hydroseed ($0.08-$0.25/sq ft) and traditional seed.',
    relatedCalculators: [
      '/landscaping-cost-per-square-foot/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/front-yard-landscaping-cost/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 28. Informational Guide: Landscape Project Cost Factors
  '/guides/landscape-project-cost-factors/': {
    path: '/guides/landscape-project-cost-factors/',
    primaryKeyword: 'landscaping cost factors',
    secondaryKeywords: [
      'factors that affect landscaping prices',
      'why is landscaping expensive',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Landscaping Cost Factors: What Drives Your Total Project Price?',
    metaDescription:
      'Understand the key drivers behind landscaping quotes: site access, slope grading, soil composition, underground drainage, and seasonal timing.',
    h1: 'Top Landscaping Cost Factors Explained',
    summary:
      'Behind every contractor proposal are critical project variables. Discover why two identical yards can receive vastly different bids.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/retaining-wall-cost-calculator/',
    ],
    relatedGuides: [
      '/guides/how-much-does-landscaping-cost/',
      '/estimate/landscaping-estimate-cost/',
    ],
    schemaType: 'Article',
  },

  // 29. Estimate Hub
  '/estimate/': {
    path: '/estimate/',
    primaryKeyword: 'landscaping estimate',
    secondaryKeywords: [
      'landscaping estimate cost',
      'free landscaping estimate',
      'landscaping estimate template',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Estimates: Tools, Costs, Examples & Free Templates',
    metaDescription:
      'Everything you need to understand, calculate, and prepare a professional landscaping estimate. Free instant calculator and downloadable contractor templates.',
    h1: 'Landscaping Estimate Resource Center',
    summary:
      'Whether you are a homeowner reviewing contractor proposals or a landscaper pricing a job, access our estimate calculators, templates, and pricing guides.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/landscaping-pricing-calculator/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-cost/',
      '/estimate/landscaping-estimate-template/',
      '/estimate/free-landscaping-estimate/',
    ],
    schemaType: 'WebPage',
  },

  // 30. Estimate: Landscaping Estimate
  '/estimate/landscaping-estimate/': {
    path: '/estimate/landscaping-estimate/',
    primaryKeyword: 'landscaping estimate',
    secondaryKeywords: [
      'how to get a landscaping estimate',
      'landscaping bid proposal',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Estimate: How to Request, Compare & Audit Bids',
    metaDescription:
      'Learn what should be included in a professional landscaping estimate, red flags to avoid, and how to verify contractor scope of work.',
    h1: 'Understanding Your Landscaping Estimate',
    summary:
      'A homeowner guide to reviewing contractor bids line-by-line, including insurance checks, payment milestones, and change order clauses.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/landscaping-pricing-calculator/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-cost/',
      '/estimate/landscaping-estimate-template/',
    ],
    schemaType: 'WebPage',
  },

  // 31. Estimate: Landscaping Estimate Cost
  '/estimate/landscaping-estimate-cost/': {
    path: '/estimate/landscaping-estimate-cost/',
    primaryKeyword: 'landscaping estimate cost',
    secondaryKeywords: [
      'cost of landscaping estimate',
      'do landscapers charge for estimates',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Estimate Cost: Are Landscaper Quotes Really Free?',
    metaDescription:
      'Do contractors charge for landscaping estimates? Learn when consultations are free, when design fees apply, and how to avoid hidden costs.',
    h1: 'Landscaping Estimate Cost: Free vs Paid Consultations',
    summary:
      'Understand the difference between a free ballpark estimate, a paid on-site architectural consultation, and a master design package.',
    relatedCalculators: [
      '/landscape-design-cost-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/estimate/free-landscaping-estimate/',
      '/guides/how-much-does-landscape-design-cost/',
    ],
    schemaType: 'WebPage',
  },

  // 32. Estimate: Free Landscaping Estimate
  '/estimate/free-landscaping-estimate/': {
    path: '/estimate/free-landscaping-estimate/',
    primaryKeyword: 'free landscaping estimate',
    secondaryKeywords: [
      'free landscape estimate online',
      'instant free landscaping estimate',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Free Landscaping Estimate – Instant Online Budget Tool',
    metaDescription:
      'Get a 100% free landscaping estimate online without sales calls or emails. Calculate your material and labor costs immediately.',
    h1: 'Free Instant Online Landscaping Estimate',
    summary:
      'No contact info or phone number required. Calculate your project numbers on your terms using our transparent estimation engine.',
    relatedCalculators: [
      '/landscaping-cost-calculator/',
      '/landscaping-cost-per-square-foot/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-template/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'WebPage',
  },

  // 33. Estimate: Landscaping Estimate Template
  '/estimate/landscaping-estimate-template/': {
    path: '/estimate/landscaping-estimate-template/',
    primaryKeyword: 'landscaping estimate template',
    secondaryKeywords: [
      'free landscaping estimate template',
      'landscaping bid template pdf',
      'contractor estimate spreadsheet',
    ],
    searchIntent: 'Commercial',
    metaTitle: 'Landscaping Estimate Template – Interactive & Downloadable',
    metaDescription:
      'Download or edit a free professional landscaping estimate template. Itemize labor, materials, equipment, and terms with live print & PDF output.',
    h1: 'Interactive Landscaping Estimate Template',
    summary:
      'Customizable, ready-to-print landscaping estimate template for contractors, landscapers, and property managers. Generate and print clean quotes.',
    relatedCalculators: [
      '/landscaping-pricing-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-example/',
      '/guides/landscape-project-cost-factors/',
    ],
    schemaType: 'WebPage',
  },

  // 34. Estimate: Landscaping Estimate Example
  '/estimate/landscaping-estimate-example/': {
    path: '/estimate/landscaping-estimate-example/',
    primaryKeyword: 'landscaping estimate example',
    secondaryKeywords: [
      'sample landscaping estimate',
      'sample landscaping quote',
    ],
    searchIntent: 'Informational',
    metaTitle: 'Landscaping Estimate Example: Sample Quotes for Any Project',
    metaDescription:
      'Review real-world landscaping estimate examples for lawn installations, paver patios, retaining walls, and complete backyard redesigns.',
    h1: 'Landscaping Estimate Examples & Sample Proposals',
    summary:
      'Inspect sample itemized bids for common projects: small front-yard freshening ($2,800), paver patio ($8,500), and full backyard outdoor living ($34,000).',
    relatedCalculators: [
      '/patio-cost-calculator/',
      '/landscaping-cost-calculator/',
    ],
    relatedGuides: [
      '/estimate/landscaping-estimate-template/',
      '/guides/how-much-does-landscaping-cost/',
    ],
    schemaType: 'Article',
  },

  // 35. Company / Utility: About
  '/about/': {
    path: '/about/',
    primaryKeyword: 'about landscape cost calculator',
    secondaryKeywords: ['landscaping calculator mission', 'accurate landscape pricing'],
    searchIntent: 'Informational',
    metaTitle: 'About Us – Landscape Cost Calculator',
    metaDescription:
      'Learn about Landscape Cost Calculator, our calculation methodology, unit cost benchmarks, and dedication to transparent landscaping estimations.',
    h1: 'About Landscape Cost Calculator',
    summary:
      'Empowering homeowners, designers, and landscaping contractors with realistic cost estimation tools, accurate material formulas, and transparent pricing benchmarks.',
    relatedCalculators: ['/landscaping-cost-calculator/'],
    relatedGuides: ['/guides/how-much-does-landscaping-cost/'],
    schemaType: 'WebPage',
  },

  // 36. Contact
  '/contact/': {
    path: '/contact/',
    primaryKeyword: 'contact landscape cost calculator',
    secondaryKeywords: ['landscaping calculator feedback', 'landscaping cost support'],
    searchIntent: 'Informational',
    metaTitle: 'Contact Us – Landscape Cost Calculator',
    metaDescription:
      'Have feedback, regional price updates, or inquiries? Get in touch with the Landscape Cost Calculator team.',
    h1: 'Contact Landscape Cost Calculator',
    summary:
      'We welcome feedback from trade professionals, suppliers, and homeowners to keep our regional pricing models and calculator tools up to date.',
    relatedCalculators: ['/landscaping-cost-calculator/'],
    relatedGuides: ['/about/'],
    schemaType: 'WebPage',
  },

  // 37. Legal: Privacy Policy
  '/privacy-policy/': {
    path: '/privacy-policy/',
    primaryKeyword: 'privacy policy landscape cost calculator',
    secondaryKeywords: [],
    searchIntent: 'Informational',
    metaTitle: 'Privacy Policy – Landscape Cost Calculator',
    metaDescription:
      'Read our privacy policy regarding data collection, cookies, and calculator usage on LandscapeCostCalculator.online.',
    h1: 'Privacy Policy',
    summary: 'Our commitment to protecting your privacy and transparent data practices.',
    relatedCalculators: [],
    relatedGuides: [],
    schemaType: 'WebPage',
  },

  // 38. Legal: Terms of Service
  '/terms/': {
    path: '/terms/',
    primaryKeyword: 'terms of service landscape cost calculator',
    secondaryKeywords: [],
    searchIntent: 'Informational',
    metaTitle: 'Terms of Service – Landscape Cost Calculator',
    metaDescription:
      'Read our terms of service and website usage conditions for LandscapeCostCalculator.online.',
    h1: 'Terms of Service',
    summary: 'Conditions and terms governing the use of our calculation tools.',
    relatedCalculators: [],
    relatedGuides: [],
    schemaType: 'WebPage',
  },

  // 39. Legal: Disclaimer
  '/disclaimer/': {
    path: '/disclaimer/',
    primaryKeyword: 'landscaping cost calculator disclaimer',
    secondaryKeywords: ['landscaping estimate disclaimer'],
    searchIntent: 'Informational',
    metaTitle: 'Estimation Disclaimer – Landscape Cost Calculator',
    metaDescription:
      'Important disclaimers regarding planning estimates, regional contractor variations, and non-binding calculations.',
    h1: 'Estimation Disclaimer',
    summary:
      'Important details regarding the advisory nature of digital landscaping estimates and recommendations.',
    relatedCalculators: ['/landscaping-cost-calculator/'],
    relatedGuides: [],
    schemaType: 'WebPage',
  },

  // 40. XML & HTML Sitemap
  '/sitemap/': {
    path: '/sitemap/',
    primaryKeyword: 'landscape cost calculator sitemap',
    secondaryKeywords: ['landscaping calculators directory'],
    searchIntent: 'Informational',
    metaTitle: 'HTML Sitemap & Directory – Landscape Cost Calculator',
    metaDescription:
      'Full directory and sitemap of all landscaping calculators, cost guides, and estimate resources on LandscapeCostCalculator.online.',
    h1: 'Complete Site Index & Calculator Directory',
    summary:
      'Browse all tools, material calculators, cost guides, and downloadable templates on LandscapeCostCalculator.online.',
    relatedCalculators: ['/landscaping-cost-calculator/'],
    relatedGuides: ['/guides/how-much-does-landscaping-cost/'],
    schemaType: 'WebPage',
  },
};

export const ALL_PATHS = Object.keys(SEO_PAGES);
