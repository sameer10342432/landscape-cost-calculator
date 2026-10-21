export interface PageImageConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const PAGE_IMAGES: Record<string, PageImageConfig> = {
  // Homepage & Primary Calculator
  '/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Beautiful landscaped backyard with patio, lawn and garden',
    width: 1536,
    height: 1024,
    priority: true,
  },
  '/landscaping-cost-calculator/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Beautiful landscaped backyard with patio, lawn and garden',
    width: 1536,
    height: 1024,
    priority: true,
  },

  // Supporting Calculators
  '/mulch-calculator/': {
    src: '/images/landscaping/mulch-calculator.webp',
    alt: 'Mulch garden bed with plants, wheelbarrow and landscaping tools',
    width: 1536,
    height: 1024,
  },
  '/paver-calculator/': {
    src: '/images/landscaping/paver-calculator.webp',
    alt: 'Paver patio installation with landscaping tools and stone pavers',
    width: 1536,
    height: 1024,
  },
  '/patio-cost-calculator/': {
    src: '/images/landscaping/patio-cost-calculator.webp',
    alt: 'Modern landscaped patio with outdoor kitchen, seating and fire feature',
    width: 1536,
    height: 1024,
  },
  '/retaining-wall-cost-calculator/': {
    src: '/images/landscaping/retaining-wall-cost.webp',
    alt: 'Tiered stone retaining wall with landscaped garden and steps',
    width: 1774,
    height: 887,
  },
  '/tree-planting-cost-calculator/': {
    src: '/images/landscaping/tree-planting-cost.webp',
    alt: 'Professional landscaper planting a young tree in a landscaped backyard',
    width: 1536,
    height: 1024,
  },
  '/landscape-design-cost-calculator/': {
    src: '/images/landscaping/landscape-design-cost.webp',
    alt: 'Professionally designed backyard with stone pathway, waterfall and landscaped garden',
    width: 1774,
    height: 887,
  },
  '/landscaping-cost-per-square-foot/': {
    src: '/images/landscaping/landscaping-cost-per-square-foot.webp',
    alt: 'Professionally landscaped lawn with garden beds, irrigation and patio',
    width: 1774,
    height: 887,
  },

  // Important Guides
  '/guides/how-much-does-landscaping-cost/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Complete residential landscaping design and installation project',
    width: 1536,
    height: 1024,
  },
  '/guides/backyard-landscaping-cost/': {
    src: '/images/landscaping/backyard-landscaping-cost.webp',
    alt: 'Modern backyard landscaping with lawn, patio, plants and outdoor living area',
    width: 1536,
    height: 1024,
  },
  '/guides/front-yard-landscaping-cost/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Front yard curb appeal landscaping and paver walkway',
    width: 1536,
    height: 1024,
  },
  '/guides/patio-landscaping-cost/': {
    src: '/images/landscaping/patio-cost-calculator.webp',
    alt: 'Stone paver patio installation with outdoor dining and living space',
    width: 1536,
    height: 1024,
  },
  '/guides/retaining-wall-landscaping-cost/': {
    src: '/images/landscaping/retaining-wall-cost.webp',
    alt: 'Engineered stone block retaining wall with garden terrace',
    width: 1774,
    height: 887,
  },
  '/guides/mulch-landscaping-cost/': {
    src: '/images/landscaping/mulch-calculator.webp',
    alt: 'Fresh dark hardwood mulch installation in landscape garden bed',
    width: 1536,
    height: 1024,
  },
  '/guides/how-much-does-landscape-design-cost/': {
    src: '/images/landscaping/landscape-design-cost.webp',
    alt: 'Architectural landscape design master plan and garden layout',
    width: 1774,
    height: 887,
  },
  '/guides/landscape-design-cost-factors/': {
    src: '/images/landscaping/landscape-design-cost.webp',
    alt: 'Landscape architectural 3D design and planning visualization',
    width: 1774,
    height: 887,
  },
  '/guides/landscaping-cost-per-square-foot/': {
    src: '/images/landscaping/landscaping-cost-per-square-foot.webp',
    alt: 'Landscaped lawn and garden beds cost per square foot',
    width: 1774,
    height: 887,
  },

  // Estimates Hub Cluster
  '/estimate/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Professional landscaping estimate and outdoor living design',
    width: 1774,
    height: 887,
  },
  '/estimate/landscaping-estimate/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Complete backyard landscaping project with pool, patio, lawn and fire pit',
    width: 1774,
    height: 887,
  },
  '/estimate/landscaping-estimate-cost/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Contractor pricing and cost breakdown for landscaping bids',
    width: 1774,
    height: 887,
  },
  '/estimate/free-landscaping-estimate/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Online preliminary landscaping estimate calculation for home projects',
    width: 1774,
    height: 887,
  },
  '/estimate/landscaping-estimate-template/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Printable and customizable contractor landscaping estimate template',
    width: 1774,
    height: 887,
  },
  '/estimate/landscaping-estimate-example/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Sample real-world itemized landscaping proposal and quote',
    width: 1774,
    height: 887,
  },

  // Secondary Main Calculator Intent Pages
  '/landscape-cost-calculator/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Complete property landscaping plan and outdoor living cost estimation',
    width: 1536,
    height: 1024,
  },
  '/landscaping-calculator/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'All-in-one landscaping calculator for lawn, mulch, and pavers',
    width: 1536,
    height: 1024,
  },
  '/landscaping-pricing-calculator/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Contractor hourly pricing, equipment markup, and landscaping profit margins',
    width: 1774,
    height: 887,
  },
  '/landscaping-cost-estimator/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Ballpark low and high cost ranges for home landscaping projects',
    width: 1536,
    height: 1024,
  },
  '/landscaping-estimate-calculator/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Structured itemized landscaping estimate worksheet and quote builder',
    width: 1774,
    height: 887,
  },
  '/landscape-project-estimator/': {
    src: '/images/landscaping/landscape-design-cost.webp',
    alt: 'Multi-feature residential landscape architectural planning and estimate',
    width: 1774,
    height: 887,
  },

  // Additional Topic Guides
  '/guides/landscape-project-cost-factors/': {
    src: '/images/landscaping/backyard-landscaping-cost.webp',
    alt: 'Comprehensive breakdown of yard access, soil grading, and labor factors in landscaping',
    width: 1536,
    height: 1024,
  },
  '/guides/lawn-installation-cost/': {
    src: '/images/landscaping/landscaping-cost-per-square-foot.webp',
    alt: 'Lush green sod lawn installation with manicured landscape borders',
    width: 1774,
    height: 887,
  },
  '/guides/rock-landscaping-cost/': {
    src: '/images/landscaping/retaining-wall-cost.webp',
    alt: 'Decorative river rock landscape beds and natural stone terrace features',
    width: 1774,
    height: 887,
  },
  '/guides/gravel-landscaping-cost/': {
    src: '/images/landscaping/paver-calculator.webp',
    alt: 'Crushed gravel driveway and walkway base material installation',
    width: 1536,
    height: 1024,
  },

  // Utility & Company Pages
  '/about/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'About Landscape Cost Calculator, engineering formulas and estimation standards',
    width: 1536,
    height: 1024,
  },
  '/contact/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Contact Landscape Cost Calculator editorial and calculation engineering team',
    width: 1536,
    height: 1024,
  },
  '/privacy-policy/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Privacy policy and user data security standards',
    width: 1774,
    height: 887,
  },
  '/terms/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Terms of service and software calculation license agreement',
    width: 1774,
    height: 887,
  },
  '/disclaimer/': {
    src: '/images/landscaping/landscaping-estimate.webp',
    alt: 'Estimation disclaimer and local building contractor verification notices',
    width: 1774,
    height: 887,
  },
  '/sitemap/': {
    src: '/images/landscaping/landscaping-cost-calculator.webp',
    alt: 'Complete HTML sitemap directory of all landscaping estimation tools',
    width: 1536,
    height: 1024,
  },
};
