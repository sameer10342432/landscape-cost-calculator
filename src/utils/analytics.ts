/**
 * Google Analytics 4 (GA4) Integration Utility
 *
 * This utility provides clean, production-ready GA4 initialization and event tracking.
 * It is completely passive unless a valid GA Measurement ID is configured via environment variable:
 *   VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
 *
 * It does not load external scripts or track user data when the measurement ID is absent.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let isInitialized = false;

export function initAnalytics(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  // Strict check: Only activate if a real GA4 Measurement ID is provided (format: G-XXXXXXXXXX)
  if (!GA_ID || !GA_ID.startsWith('G-') || GA_ID === 'G-XXXXXXXXXX') {
    return;
  }

  try {
    // 1. Create dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, {
      send_page_view: false, // Managed manually on client navigation
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });

    // 2. Inject Google Tag script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(script);

    isInitialized = true;
  } catch (err) {
    console.warn('[Analytics] Failed to initialize Google Analytics:', err);
  }
}

/**
 * Track virtual page views across custom client-side router navigations
 */
export function trackPageView(path: string, title?: string): void {
  if (!isInitialized || typeof window === 'undefined' || !window.gtag || !GA_ID) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Track calculator usage actions (e.g. calculation run, estimate downloaded, print triggered)
 */
export function trackCalculatorEvent(
  action: 'calculate' | 'reset' | 'download_estimate' | 'print_estimate' | 'unit_toggle',
  calculatorName: string,
  extraDetails?: Record<string, unknown>
): void {
  if (!isInitialized || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: 'Calculator Interaction',
    calculator_name: calculatorName,
    ...extraDetails,
  });
}
