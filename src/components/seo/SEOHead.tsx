import React, { useEffect } from 'react';
import { SEOMetadata } from '../../types';
import { SITE_URL, BRAND_NAME } from '../../data/seoDatabase';
import { PAGE_IMAGES } from '../../data/imageDatabase';

interface SEOHeadProps {
  metadata: SEOMetadata;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ metadata, breadcrumbs }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = metadata.metaTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Helper for link canonical
    const setCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    const pageUrl = `${SITE_URL}${metadata.path === '/' ? '' : metadata.path}`;
    const canonicalUrl = `${SITE_URL}${
      metadata.canonicalPath
        ? (metadata.canonicalPath === '/' ? '' : metadata.canonicalPath)
        : (metadata.path === '/' ? '' : metadata.path)
    }`;

    setCanonical(canonicalUrl);
    setMetaTag('name', 'description', metadata.metaDescription);
    setMetaTag('property', 'og:title', metadata.metaTitle);
    setMetaTag('property', 'og:description', metadata.metaDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', metadata.schemaType === 'Article' ? 'article' : 'website');
    setMetaTag('property', 'og:site_name', BRAND_NAME);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', metadata.metaTitle);
    setMetaTag('name', 'twitter:description', metadata.metaDescription);

    const pageImage = PAGE_IMAGES[metadata.path] || PAGE_IMAGES['/'];
    if (pageImage) {
      setMetaTag('property', 'og:image', `${SITE_URL}${pageImage.src}`);
      setMetaTag('name', 'twitter:image', `${SITE_URL}${pageImage.src}`);
    }

    // 4. Inject JSON-LD Schema.org
    // Remove previous applet JSON-LD scripts
    const existingScripts = document.querySelectorAll('script[data-seo="true"]');
    existingScripts.forEach((s) => s.remove());

    const schemas: object[] = [];

    // Organization Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: 'Professional residential & commercial landscaping cost calculators and material estimation tools.',
    });

    // WebSite / WebApplication Schema
    if (metadata.schemaType === 'WebApplication') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: metadata.h1,
        url: pageUrl,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        description: metadata.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      });
    } else if (metadata.schemaType === 'Article') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metadata.h1,
        description: metadata.metaDescription,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        datePublished: '2026-01-15T08:00:00+00:00',
        dateModified: '2026-09-28T03:00:00+00:00',
        author: {
          '@type': 'Organization',
          name: BRAND_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: BRAND_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/icon.svg`,
          },
        },
      });
    }

    // BreadcrumbList Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.path === '/' ? '' : crumb.path}`,
        })),
      });
    }

    // FAQPage Schema (only if faqs are present and non-empty)
    if (metadata.faqs && metadata.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: metadata.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // Append schemas
    schemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

    return () => {
      // cleanup schemas when unmounting / changing route
      const cleanups = document.querySelectorAll('script[data-seo="true"]');
      cleanups.forEach((s) => s.remove());
    };
  }, [metadata, breadcrumbs]);

  return null;
};
