import React from 'react';

interface BrandLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showText = true,
  size = 'md',
  className = '',
  isDark = false,
}) => {
  // Tile dimensions based on size
  const tileDimensions = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  }[size];

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 text-left group cursor-pointer select-none ${className}`}>
      {/* Brand Emblem Mark */}
      <div
        className={`${tileDimensions} bg-linear-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white flex items-center justify-center shadow-xs group-hover:shadow-md group-hover:from-emerald-500 group-hover:to-emerald-800 transition-all duration-200 shrink-0 relative overflow-hidden`}
      >
        <svg
          viewBox="0 0 512 512"
          className="w-full h-full p-1.5 transition-transform duration-200 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="blLeafGrad" x1="160" y1="120" x2="256" y2="390" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#34d399" />
              <stop offset="100%" stop-color="#10b981" />
            </linearGradient>
            <linearGradient id="blMetricGrad" x1="256" y1="120" x2="380" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="100%" stop-color="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Left Wing: Organic Botanical Contour & Growth Curve */}
          <path
            d="M256 104 C180 104 128 172 128 252 C128 328 184 384 256 408 C248 340 248 240 256 104 Z"
            fill="url(#blLeafGrad)"
          />

          {/* Right Wing: Geometric Stepped Terraces & Blueprint Grid */}
          <path
            d="M268 120 C324 136 368 180 380 236 L310 236 C300 200 286 170 268 148 V120 Z"
            fill="url(#blMetricGrad)"
          />
          <path
            d="M268 256 L384 256 C382 296 364 332 336 358 L286 312 C296 296 298 276 268 274 V256 Z"
            fill="url(#blMetricGrad)"
            fill-opacity="0.9"
          />
          <path
            d="M268 334 L318 380 C296 396 278 402 268 406 V334 Z"
            fill="url(#blMetricGrad)"
            fill-opacity="0.8"
          />

          {/* Central Precision Ruler Caliper Spine */}
          <path
            d="M256 94 V418"
            stroke="#ffffff"
            stroke-width="16"
            stroke-linecap="round"
          />

          {/* Measurement Calibration Ticks */}
          <line x1="256" y1="170" x2="290" y2="170" stroke="#ffffff" stroke-width="12" stroke-linecap="round" />
          <line x1="256" y1="230" x2="304" y2="230" stroke="#ffffff" stroke-width="14" stroke-linecap="round" />
          <line x1="256" y1="290" x2="294" y2="290" stroke="#ffffff" stroke-width="12" stroke-linecap="round" />
          <line x1="256" y1="350" x2="306" y2="350" stroke="#ffffff" stroke-width="14" stroke-linecap="round" />

          {/* Pivot Node */}
          <circle cx="256" cy="230" r="14" fill="#047857" stroke="#ffffff" stroke-width="8" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-heading font-extrabold tracking-tight block leading-tight transition-colors duration-200 ${textSizeClasses} ${
              isDark
                ? 'text-white group-hover:text-emerald-400'
                : 'text-stone-900 group-hover:text-emerald-950'
            }`}
          >
            Landscape Cost Calculator
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase block transition-colors duration-200 ${
              isDark
                ? 'text-emerald-400 group-hover:text-emerald-300'
                : 'text-emerald-700 group-hover:text-emerald-800'
            }`}
          >
            landscapecostcalculator.online
          </span>
        </div>
      )}
    </div>
  );
};
