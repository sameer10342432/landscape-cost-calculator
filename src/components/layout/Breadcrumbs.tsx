import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ name: string; path: string }>;
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-stone-100/70 border-b border-stone-200 text-xs sm:text-sm text-stone-600">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1 text-stone-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={item.path}>
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              {isLast ? (
                <span className="text-stone-900 font-semibold truncate max-w-[220px] sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={() => onNavigate(item.path)}
                  className="text-stone-600 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
