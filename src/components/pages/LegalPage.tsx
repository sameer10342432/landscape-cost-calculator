import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SITE_DOMAIN, BRAND_NAME, SEO_PAGES } from '../../data/seoDatabase';
import { SEOHead } from '../seo/SEOHead';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    disclaimer: 'Estimation Disclaimer',
  };

  const path = type === 'privacy' ? '/privacy-policy/' : `/${type}/`;
  const metadata = SEO_PAGES[path];

  const icons = {
    privacy: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    terms: <FileText className="w-6 h-6 text-emerald-600" />,
    disclaimer: <AlertTriangle className="w-6 h-6 text-amber-600" />,
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-page-enter">
      {metadata && <SEOHead metadata={metadata} breadcrumbs={[{ name: titles[type], path }]} />}
      <Breadcrumbs
        items={[{ name: titles[type], path }]}
        onNavigate={onNavigate}
      />

      <header className="flex items-center gap-3">
        <div className="p-3 bg-stone-100 rounded-2xl">
          {icons[type]}
        </div>
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-stone-900">
            {titles[type]}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Effective Date: January 1, 2026 &bull; {SITE_DOMAIN}
          </p>
        </div>
      </header>

      <div className="prose prose-stone text-stone-700 text-sm sm:text-base leading-relaxed space-y-6 pt-4 border-t border-stone-200">
        {type === 'privacy' && (
          <>
            <p>
              At {BRAND_NAME} ({SITE_DOMAIN}), accessible from https://{SITE_DOMAIN}, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and how it is used.
            </p>
            <h2 className="text-lg font-bold text-stone-900">1. Data Handled by Our Calculators</h2>
            <p>
              All calculator operations (project dimensions, material selections, and cost calculations) are executed client-side inside your browser session. We do not store or transmit your yard measurements, personal estimates, or itemized template entries to external servers.
            </p>
            <h2 className="text-lg font-bold text-stone-900">2. Cookies and Web Analytics</h2>
            <p>
              Like any modern web application, {SITE_DOMAIN} may utilize standard HTTP cookies to remember user interface preferences (such as your chosen unit system: US Customary vs. Metric). We may also use privacy-focused analytics to track overall aggregate site volume, calculator usage rates, and error diagnostics to continually enhance site performance.
            </p>
            <h2 className="text-lg font-bold text-stone-900">3. Third-Party Partners & Ad Networks</h2>
            <p>
              We may display advertisements from trusted third-party advertising networks (such as Google AdSense). These third-party vendors may use cookies, JavaScript, or Web Beacons in their respective advertisements to measure campaign effectiveness or serve contextual ads. {BRAND_NAME} has no access to or control over cookies that are used by third-party advertisers.
            </p>
            <h2 className="text-lg font-bold text-stone-900">4. Contact Us</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us via our contact page.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <p>
              Welcome to {BRAND_NAME}. By accessing or utilizing the estimation tools, templates, or articles hosted on {SITE_DOMAIN}, you agree to be bound by these Terms of Service.
            </p>
            <h2 className="text-lg font-bold text-stone-900">1. Nature of the Service</h2>
            <p>
              {BRAND_NAME} provides mathematical modeling calculators, material volume estimators, and informational cost articles for preliminary planning, educational comparison, and contractor quoting assistance. The tools do not constitute formal architectural engineering, land surveying, or binding commercial contracts.
            </p>
            <h2 className="text-lg font-bold text-stone-900">2. Use of Generated Estimates</h2>
            <p>
              Estimates generated via our interactive calculators or downloadable template sheets represent approximations based on generalized regional averages. You are solely responsible for verifying on-site soil conditions, property lines, underground utility locations (e.g., calling 811 before digging), and building code permits with your local authorities.
            </p>
            <h2 className="text-lg font-bold text-stone-900">3. Intellectual Property</h2>
            <p>
              The original calculation workflows, editorial guides, and interface code on {SITE_DOMAIN} are the property of {BRAND_NAME}. You may print and share estimates for personal or commercial bid preparation purposes.
            </p>
          </>
        )}

        {type === 'disclaimer' && (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-amber-950 text-sm">
              <strong className="block mb-1 text-amber-900 font-bold">Important Notice Regarding Estimates:</strong>
              This calculator and all associated tools on {SITE_DOMAIN} provide estimates for preliminary planning and budgeting purposes only. Actual landscaping costs vary significantly based on location, site access, material choice, terrain slopes, soil density, and contractor rates.
            </div>
            <h2 className="text-lg font-bold text-stone-900">1. Not a Guaranteed Price or Contractor Bid</h2>
            <p>
              No calculation generated by this website constitutes an offer, quote, or guarantee of services from any specific landscaping contractor. Actual bids provided by licensed local professionals will be based on an in-person physical site inspection.
            </p>
            <h2 className="text-lg font-bold text-stone-900">2. Underground Utilities & Permits</h2>
            <p>
              Always contact your local &quot;Call Before You Dig&quot; authority (such as 811 in the United States) prior to any excavation. Structural features such as retaining walls over 4 feet, pool surrounds, and gas-line fire pits frequently require municipal permits and engineered drawings.
            </p>
            <h2 className="text-lg font-bold text-stone-900">3. Limitation of Liability</h2>
            <p>
              Under no circumstances shall {BRAND_NAME} or its developers be held liable for any discrepancies between the numbers generated by this tool and actual project expenses, overruns, material shortages, or contractor pricing disputes.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
