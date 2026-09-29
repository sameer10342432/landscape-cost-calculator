import React, { useEffect, useRef, useState } from 'react';

interface AnimatedPriceProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  durationMs?: number;
}

export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
  value,
  prefix = '$',
  suffix = '',
  decimals = 0,
  className = '',
  durationMs = 380,
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // If reduced motion is preferred, update immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      prevValueRef.current = value;
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = value;
    const delta = endValue - startValue;

    if (Math.abs(delta) < 0.01) {
      setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    // Dynamically adjust duration for small vs large deltas (200ms - 450ms max)
    const effectiveDuration = Math.min(durationMs, Math.max(200, Math.log10(Math.abs(delta) + 1) * 100));

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / effectiveDuration, 1);
      // Smooth ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + delta * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [value, durationMs]);

  const formatted = decimals > 0
    ? displayValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.round(displayValue).toLocaleString('en-US');

  return (
    <span className={`inline-block font-numeric transition-colors duration-200 ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
