import React from 'react';
import { SEOMetadata } from '../../types';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../seo/SEOHead';
import { RelatedContent } from '../common/RelatedContent';
import { LeadGenCard } from '../common/LeadGenCard';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { OptimizedImage } from '../common/OptimizedImage';
import { PAGE_IMAGES } from '../../data/imageDatabase';
import { GUIDE_CONTENT } from '../../data/guideContentData';
import { Calculator, ArrowRight, HelpCircle, CheckCircle, Info, Sparkles } from 'lucide-react';

interface GuidePageViewProps {
  metadata: SEOMetadata;
  onNavigate: (path: string) => void;
}

export const GuidePageView: React.FC<GuidePageViewProps> = ({ metadata, onNavigate }) => {
  const breadcrumbs = [
    { name: 'Cost Guides', path: '/guides/how-much-does-landscaping-cost/' },
    { name: metadata.h1, path: metadata.path },
  ];

  const pageImage = PAGE_IMAGES[metadata.path];
  const guide = GUIDE_CONTENT[metadata.path] || GUIDE_CONTENT['/guides/how-much-does-landscaping-cost/'];

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 animate-page-enter">
      <SEOHead metadata={metadata} breadcrumbs={breadcrumbs} />

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Pricing Guide &bull; 2026 Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-stone-900 tracking-tight leading-tight">
          {metadata.h1}
        </h1>
        <p className="text-base sm:text-lg text-stone-600 mt-4 leading-relaxed font-medium">
          {metadata.summary}
        </p>
      </header>

      {/* Featured Guide Visual */}
      {pageImage && (
        <div className="mb-8 rounded-2xl overflow-hidden border border-stone-200/80 shadow-md aspect-[16/9] sm:aspect-[21/9] bg-stone-100">
          <OptimizedImage
            src={pageImage.src}
            alt={pageImage.alt}
            width={pageImage.width}
            height={pageImage.height}
            priority={pageImage.priority}
            className="w-full h-full object-cover hover-image-zoom"
          />
        </div>
      )}

      {/* Quick Answer Callout Box */}
      <section aria-labelledby="quick-answer-title" className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-7 shadow-md mb-8 border border-emerald-800">
        <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Info className="w-4 h-4" />
          <h2 id="quick-answer-title" className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Quick Answer & Key Numbers
          </h2>
        </div>
        <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
          {guide.quickAnswer.details}
        </p>
        <div className="mt-4 pt-4 border-t border-emerald-700/80 flex flex-wrap gap-4 text-xs text-emerald-100">
          {guide.quickAnswer.bullets.map((b, i) => (
            <span key={i}>&bull; {b}</span>
          ))}
        </div>
      </section>

      {/* Interactive Tool Banner */}
      <div className="bg-stone-100 rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-bold text-stone-900 text-sm">
              {guide.toolBanner.title}
            </div>
            <p className="text-xs text-stone-600">
              {guide.toolBanner.desc}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate(guide.toolBanner.targetPath)}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <span>{guide.toolBanner.buttonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Ad slot */}
      <AdPlaceholder format="leaderboard" />

      {/* Editorial Content Body */}
      <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-6">
        <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
          {guide.table.heading}
        </h2>
        <p>{guide.table.intro}</p>

        {/* Pricing Comparison Table */}
        <div className="overflow-x-auto my-6 not-prose">
          <table className="w-full text-left text-xs sm:text-sm border border-stone-200 rounded-xl overflow-hidden">
            <thead className="bg-stone-100 text-stone-800 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                {guide.table.headers.map((h, i) => (
                  <th key={i} className="p-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white">
              {guide.table.rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3.5 font-medium text-stone-900">{row.item}</td>
                  <td className="p-3.5 text-emerald-800 font-semibold">{row.range}</td>
                  <td className="p-3.5 text-stone-700">{row.unitCost}</td>
                  <td className="p-3.5 text-stone-500 text-xs">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Topic Specific Editorial Sections */}
        {guide.editorialSections.map((sec, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
              {sec.heading}
            </h2>
            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
            {sec.callout && (
              <div className="not-prose my-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-sm text-emerald-950">{sec.callout.title}</div>
                  <div className="text-xs text-emerald-800 mt-0.5">{sec.callout.text}</div>
                </div>
                {sec.callout.linkPath && sec.callout.linkText && (
                  <button
                    onClick={() => onNavigate(sec.callout!.linkPath!)}
                    className="text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
                  >
                    <span>{sec.callout.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Key Factors */}
        <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
          {guide.factorsHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 not-prose">
          {guide.factors.map((f, i) => (
            <div key={i} className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 mb-1">{f.title}</h3>
              <p className="text-xs text-stone-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Money Saving Section */}
        <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
          {guide.savingsHeading}
        </h2>
        <ul className="space-y-3">
          {guide.savingTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>{tip.title}:</strong> {tip.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lead Gen Box */}
      <LeadGenCard />

      {/* FAQ Section with strict H2 -> H3 hierarchy */}
      {metadata.faqs && metadata.faqs.length > 0 && (
        <section className="my-10 pt-8 border-t border-stone-200">
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

      {/* Related Content & Contextual CTA */}
      <RelatedContent
        currentPath={metadata.path}
        relatedCalculators={metadata.relatedCalculators}
        relatedGuides={metadata.relatedGuides}
        onNavigate={onNavigate}
      />
    </article>
  );
};
