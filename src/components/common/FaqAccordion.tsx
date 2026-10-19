import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  defaultOpenFirst?: boolean;
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  defaultOpenFirst = true,
  className = '',
}) => {
  // Store set of open indexes (allow expanding multiple or single)
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (defaultOpenFirst && faqs.length > 0) {
      initial.add(0);
    }
    return initial;
  });

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {faqs.map((faq, idx) => {
        const isOpen = openIndexes.has(idx);
        const faqId = `faq-content-${idx}`;
        const headerId = `faq-header-${idx}`;

        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-emerald-300 shadow-sm'
                : 'bg-stone-50 hover:bg-stone-100/70 border-stone-200 hover:border-stone-300'
            }`}
          >
            <h3>
              <button
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={faqId}
                onClick={() => toggleIndex(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl"
              >
                <span className="font-heading font-bold text-base text-stone-900 leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200/70 text-stone-600'
                  }`}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>

            {/* Smooth CSS Grid Expanding Content */}
            <div
              id={faqId}
              role="region"
              aria-labelledby={headerId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-0 text-stone-600 text-sm leading-relaxed border-t border-stone-100 mt-1">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
