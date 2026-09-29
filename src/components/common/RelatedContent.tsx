import React from 'react';
import { Calculator, BookOpen, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEO_PAGES } from '../../data/seoDatabase';

interface RelatedContentProps {
  currentPath: string;
  relatedCalculators?: string[];
  relatedGuides?: string[];
  onNavigate: (path: string) => void;
}

export const RelatedContent: React.FC<RelatedContentProps> = ({
  currentPath,
  relatedCalculators = [],
  relatedGuides = [],
  onNavigate,
}) => {
  // Fallbacks if not enough specific ones provided
  const defaultCalcs = [
    '/mulch-calculator/',
    '/paver-calculator/',
    '/patio-cost-calculator/',
    '/retaining-wall-cost-calculator/',
    '/landscaping-cost-per-square-foot/',
    '/landscape-design-cost-calculator/',
  ].filter((p) => p !== currentPath);

  const defaultGuides = [
    '/guides/how-much-does-landscaping-cost/',
    '/guides/landscaping-cost-per-square-foot/',
    '/guides/backyard-landscaping-cost/',
    '/guides/landscape-project-cost-factors/',
    '/guides/lawn-installation-cost/',
  ].filter((p) => p !== currentPath);

  const calcsToShow = (relatedCalculators.length > 0 ? relatedCalculators : defaultCalcs).slice(0, 4);
  const guidesToShow = (relatedGuides.length > 0 ? relatedGuides : defaultGuides).slice(0, 4);

  return (
    <section className="my-12 pt-10 border-t border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Related Calculators */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-emerald-800">
            <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-800">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-stone-900">
              Related Calculators
            </h3>
          </div>
          <p className="text-xs text-stone-600 mb-4">
            Calculate specific material volumes, labor hours, and component costs for your project:
          </p>
          <div className="space-y-2.5">
            {calcsToShow.map((path) => {
              const page = SEO_PAGES[path];
              if (!page) return null;
              return (
                <button
                  key={path}
                  onClick={() => onNavigate(path)}
                  className="w-full text-left p-3 rounded-xl border border-stone-200/60 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-stone-800 group-hover:text-emerald-800 transition-colors">
                      {page.h1}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {page.metaDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Related Guides */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-2 mb-4 text-emerald-800">
            <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-stone-900">
              Related Cost Guides & Insights
            </h3>
          </div>
          <p className="text-xs text-stone-600 mb-4">
            Benchmark industry pricing, material pros and cons, and ways to save on installation:
          </p>
          <div className="space-y-2.5">
            {guidesToShow.map((path) => {
              const page = SEO_PAGES[path];
              if (!page) return null;
              return (
                <button
                  key={path}
                  onClick={() => onNavigate(path)}
                  className="w-full text-left p-3 rounded-xl border border-stone-200/60 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-stone-800 group-hover:text-emerald-800 transition-colors">
                      {page.h1}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-1">
                      {page.metaDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next Step Contextual Banner */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-100 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next Step in Your Project</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
            Need a Formal Landscaping Quote Template?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Use our free interactive estimate template to create a clean, itemized bid sheet with materials, labor hours, and disclaimers. Export to print or PDF instantly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => onNavigate('/estimate/landscaping-estimate-template/')}
            className="bg-white hover:bg-stone-100 text-emerald-900 font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Free Template</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/estimate/free-landscaping-estimate/')}
            className="bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-xl border border-emerald-500/50 transition-colors flex items-center justify-center cursor-pointer"
          >
            Free Online Estimate
          </button>
        </div>
      </div>
    </section>
  );
};
