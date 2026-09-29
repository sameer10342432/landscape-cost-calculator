import React from 'react';
import { SEOMetadata, UnitSystem } from '../../types';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../seo/SEOHead';
import { RelatedContent } from '../common/RelatedContent';
import { LeadGenCard } from '../common/LeadGenCard';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { OptimizedImage } from '../common/OptimizedImage';
import { PAGE_IMAGES } from '../../data/imageDatabase';
import { HelpCircle, Calculator, Sparkles } from 'lucide-react';

interface CalculatorPageWrapperProps {
  metadata: SEOMetadata;
  unitSystem: UnitSystem;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const CalculatorPageWrapper: React.FC<CalculatorPageWrapperProps> = ({
  metadata,
  unitSystem,
  onNavigate,
  children,
}) => {
  const breadcrumbs = [
    { name: 'Calculators', path: '/' },
    { name: metadata.h1, path: metadata.path },
  ];

  const pageImage = PAGE_IMAGES[metadata.path];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-page-enter">
      <SEOHead metadata={metadata} breadcrumbs={breadcrumbs} />

      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <div className={pageImage ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center' : 'max-w-4xl'}>
        <header className={pageImage ? 'lg:col-span-7' : 'max-w-4xl'}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Estimator &bull; 2026 Material Rates</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-stone-900 tracking-tight leading-tight">
            {metadata.h1}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed font-medium">
            {metadata.summary}
          </p>
        </header>

        {pageImage && (
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-md aspect-[16/10] bg-stone-100">
              <OptimizedImage
                src={pageImage.src}
                alt={pageImage.alt}
                width={pageImage.width}
                height={pageImage.height}
                priority={pageImage.priority}
                className="w-full h-full object-cover hover-image-zoom"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tool Container */}
      <div className="w-full">
        {children}
      </div>

      <div className="max-w-4xl mx-auto">
        <AdPlaceholder format="leaderboard" />
      </div>

      {/* FAQ Section */}
      {metadata.faqs && metadata.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto my-12 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <h2 className="text-2xl font-heading font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {metadata.faqs.map((faq, idx) => (
              <div key={idx} className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                <h3 className="font-heading font-bold text-base text-stone-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lead Generation Network */}
      <div className="max-w-4xl mx-auto">
        <LeadGenCard />
      </div>

      {/* Related Internal Linking */}
      <div className="max-w-5xl mx-auto">
        <RelatedContent
          currentPath={metadata.path}
          relatedCalculators={metadata.relatedCalculators}
          relatedGuides={metadata.relatedGuides}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
