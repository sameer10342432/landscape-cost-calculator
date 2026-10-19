import React, { useState, useEffect } from 'react';
import { UnitSystem } from './types';
import { SEO_PAGES } from './data/seoDatabase';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { CalculatorPageWrapper } from './components/calculators/CalculatorPageWrapper';
import { MainLandscapingCalculator } from './components/calculators/MainLandscapingCalculator';
import { MulchCalculator } from './components/calculators/MulchCalculator';
import { PaverCalculator } from './components/calculators/PaverCalculator';
import { PatioCostCalculator } from './components/calculators/PatioCostCalculator';
import { RetainingWallCalculator } from './components/calculators/RetainingWallCalculator';
import { TreePlantingCalculator } from './components/calculators/TreePlantingCalculator';
import { LandscapeDesignCalculator } from './components/calculators/LandscapeDesignCalculator';
import { SquareFootCostCalculator } from './components/calculators/SquareFootCostCalculator';
import { EstimateTemplateView } from './components/estimate/EstimateTemplateView';
import { EstimateHubPage } from './components/pages/EstimateHubPage';
import { GuidePageView } from './components/guides/GuidePageView';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { SitemapPage } from './components/pages/SitemapPage';
import { Home, ArrowLeft } from 'lucide-react';
import { BrandLogo } from './components/common/BrandLogo';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      let p = window.location.pathname;
      if (p !== '/' && !p.endsWith('/')) {
        p = p + '/';
      }
      return p;
    }
    return '/';
  });

  const [unitSystem, setUnitSystem] = useState<UnitSystem>('us');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      let p = window.location.pathname;
      if (p !== '/' && !p.endsWith('/')) {
        p = p + '/';
      }
      setCurrentPath(p);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    let normalized = path;
    if (normalized !== '/' && !normalized.endsWith('/')) {
      normalized = normalized + '/';
    }
    window.history.pushState({}, '', normalized);
    setCurrentPath(normalized);
    window.scrollTo(0, 0);
  };

  const metadata = SEO_PAGES[currentPath] || SEO_PAGES['/'];

  // Route Rendering Logic
  const renderContent = () => {
    // 1. Home & canonical alias
    if (currentPath === '/' || currentPath === '/landscaping-cost-calculator/') {
      return <HomePage unitSystem={unitSystem} onNavigate={navigate} />;
    }

    // 2. Supporting Calculators
    if (currentPath === '/mulch-calculator/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <MulchCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath === '/paver-calculator/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <PaverCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath === '/patio-cost-calculator/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <PatioCostCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath === '/retaining-wall-cost-calculator/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <RetainingWallCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath === '/tree-planting-cost-calculator/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <TreePlantingCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath === '/landscape-design-cost-calculator/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <LandscapeDesignCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath === '/landscaping-cost-per-square-foot/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <SquareFootCostCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    // Additional main SEO landing pages that use the primary calculator with dedicated intent & metadata
    if (
      currentPath === '/landscape-cost-calculator/' ||
      currentPath === '/landscaping-calculator/' ||
      currentPath === '/landscaping-pricing-calculator/' ||
      currentPath === '/landscaping-cost-estimator/' ||
      currentPath === '/landscaping-estimate-calculator/' ||
      currentPath === '/landscape-project-estimator/'
    ) {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <MainLandscapingCalculator unitSystem={unitSystem} onNavigate={navigate} />
        </CalculatorPageWrapper>
      );
    }

    // 3. Guides Cluster (/guides/*)
    if (currentPath.startsWith('/guides/')) {
      return <GuidePageView metadata={metadata} onNavigate={navigate} />;
    }

    // 4. Estimate Cluster
    if (currentPath === '/estimate/landscaping-estimate-template/') {
      return (
        <CalculatorPageWrapper metadata={metadata} unitSystem={unitSystem} onNavigate={navigate}>
          <EstimateTemplateView />
        </CalculatorPageWrapper>
      );
    }

    if (currentPath.startsWith('/estimate/')) {
      return <EstimateHubPage metadata={metadata} onNavigate={navigate} />;
    }

    // 5. Utility & Legal Pages
    if (currentPath === '/about/') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/contact/') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === '/privacy-policy/') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }

    if (currentPath === '/terms/') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }

    if (currentPath === '/disclaimer/') {
      return <LegalPage type="disclaimer" onNavigate={navigate} />;
    }

    if (currentPath === '/sitemap/') {
      return <SitemapPage onNavigate={navigate} />;
    }

    // 6. 404 Fallback Page
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-6">
        <div className="flex items-center justify-center mx-auto">
          <BrandLogo size="lg" showText={false} />
        </div>
        <h1 className="text-4xl font-heading font-extrabold text-stone-900">
          Page Not Found (404)
        </h1>
        <p className="text-stone-600 max-w-md mx-auto text-sm sm:text-base">
          The requested page or calculator could not be located. You can return to our homepage calculator or explore our site index below.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage Calculator</span>
          </button>
          <button
            onClick={() => navigate('/sitemap/')}
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Browse All Calculators
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        unitSystem={unitSystem}
        onToggleUnitSystem={setUnitSystem}
      />

      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
