import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEO_PAGES, BRAND_NAME, SITE_DOMAIN } from '../../data/seoDatabase';
import { SEOHead } from '../seo/SEOHead';
import { Calculator, BookOpen, FileSpreadsheet, Layers, ShieldCheck, ArrowRight } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const metadata = SEO_PAGES['/sitemap/'];
  const pages = Object.values(SEO_PAGES);

  const calculators = pages.filter((p) => p.path.includes('calculator') || p.path === '/');
  const guides = pages.filter((p) => p.path.startsWith('/guides/'));
  const estimates = pages.filter((p) => p.path.startsWith('/estimate/'));
  const company = pages.filter(
    (p) =>
      p.path === '/about/' ||
      p.path === '/contact/' ||
      p.path === '/privacy-policy/' ||
      p.path === '/terms/' ||
      p.path === '/disclaimer/' ||
      p.path === '/sitemap/'
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-page-enter">
      <SEOHead metadata={metadata} breadcrumbs={[{ name: 'HTML Sitemap', path: '/sitemap/' }]} />
      <Breadcrumbs
        items={[{ name: 'HTML Sitemap', path: '/sitemap/' }]}
        onNavigate={onNavigate}
      />

      <header>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Site Index & Complete Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-stone-900 mt-2">
          HTML Sitemap & Calculator Index
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          All tools, material estimators, pricing guides, and downloadable templates published on {SITE_DOMAIN}.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calculators Cluster */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 mb-4 pb-3 border-b border-stone-100">
            <Calculator className="w-5 h-5" />
            <h2 className="font-heading font-bold text-lg text-stone-900">
              Interactive Calculators ({calculators.length})
            </h2>
          </div>
          <ul className="space-y-3">
            {calculators.map((page) => (
              <li key={page.path}>
                <button
                  onClick={() => onNavigate(page.path)}
                  className="text-left w-full group flex items-start justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-semibold text-stone-800 group-hover:text-emerald-700 transition-colors block">
                      {page.h1}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {page.path}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Guides Cluster */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 mb-4 pb-3 border-b border-stone-100">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-heading font-bold text-lg text-stone-900">
              Cost Guides & Research ({guides.length})
            </h2>
          </div>
          <ul className="space-y-3">
            {guides.map((page) => (
              <li key={page.path}>
                <button
                  onClick={() => onNavigate(page.path)}
                  className="text-left w-full group flex items-start justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-semibold text-stone-800 group-hover:text-emerald-700 transition-colors block">
                      {page.h1}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {page.path}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Estimate Cluster */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 mb-4 pb-3 border-b border-stone-100">
            <FileSpreadsheet className="w-5 h-5" />
            <h2 className="font-heading font-bold text-lg text-stone-900">
              Landscaping Estimates Hub ({estimates.length})
            </h2>
          </div>
          <ul className="space-y-3">
            {estimates.map((page) => (
              <li key={page.path}>
                <button
                  onClick={() => onNavigate(page.path)}
                  className="text-left w-full group flex items-start justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-semibold text-stone-800 group-hover:text-emerald-700 transition-colors block">
                      {page.h1}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {page.path}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company & Legal */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-800 mb-4 pb-3 border-b border-stone-100">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-heading font-bold text-lg text-stone-900">
              Company & Legal Information ({company.length})
            </h2>
          </div>
          <ul className="space-y-3">
            {company.map((page) => (
              <li key={page.path}>
                <button
                  onClick={() => onNavigate(page.path)}
                  className="text-left w-full group flex items-start justify-between cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-semibold text-stone-800 group-hover:text-emerald-700 transition-colors block">
                      {page.h1}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {page.path}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
