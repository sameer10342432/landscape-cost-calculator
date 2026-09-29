import React from 'react';

interface AdPlaceholderProps {
  format?: 'leaderboard' | 'rectangle' | 'banner';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  format = 'leaderboard',
  className = '',
}) => {
  return (
    <div
      className={`ad-slot my-6 mx-auto bg-stone-100/90 border border-dashed border-stone-300 rounded-xl flex flex-col items-center justify-center text-center p-3 transition-colors ${
        format === 'leaderboard'
          ? 'w-full max-w-4xl h-24 sm:h-28'
          : format === 'rectangle'
          ? 'w-full max-w-sm h-64'
          : 'w-full max-w-md h-32'
      } ${className}`}
      aria-label="Sponsor Advertisement Slot"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
        Advertisement / Sponsored Partner
      </span>
      <p className="text-xs text-stone-500 mt-1 max-w-xs">
        Local Landscaping Suppliers & Equipment Delivery Providers
      </p>
    </div>
  );
};
