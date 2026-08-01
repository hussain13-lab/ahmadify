import React, { useEffect } from 'react';
import { CompanyInfo, SEOSettings, Product, BlogPost, Category, LegalPolicyDoc } from '../types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  type?: 'website' | 'product' | 'article' | 'faq' | 'category';
  product?: Product;
  blogPost?: BlogPost;
  category?: Category;
  faqList?: Array<{ question: string; answer: string }>;
  companyInfo: CompanyInfo;
  seoSettings?: SEOSettings;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  type = 'website',
  product,
  blogPost,
  category,
  faqList,
  companyInfo,
  seoSettings,
}) => {
  const pageTitle = title
    ? `${title} | ${companyInfo.name}`
    : seoSettings?.defaultTitle || `${companyInfo.name} | Premium Electronics & Modern Living`;

  const metaDescription =
    description ||
    seoSettings?.defaultDescription ||
    `${companyInfo.name} (Reg: ${companyInfo.registrationNumber}, Office 12846, 182-184 High Street North, East Ham, London E6 2JA). Shop premium gadgets, timepieces and home decor with fast UK delivery.`;

  const metaKeywords = (keywords && keywords.length > 0)
    ? keywords.join(', ')
    : (seoSettings?.defaultKeywords || ['AHMADIFY LTD', 'ahmadify store', 'smart electronics', 'luxury watches', 'UK eCommerce']).join(', ');

  const metaOgImage = ogImage || product?.images[0] || blogPost?.image || seoSettings?.ogImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=630&q=80';
  const fullCanonicalUrl = canonicalUrl || companyInfo.domain;

  useEffect(() => {
    // 1. Update Document Title
    document.title = pageTitle;

    // Helper function to create or update meta tag
    const updateMetaTag = (attribute: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // Helper function to update link tag
    const updateLinkTag = (rel: string, hrefValue: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', hrefValue);
    };

    // 2. Core Meta Tags
    updateMetaTag('name', 'description', metaDescription);
    updateMetaTag('name', 'keywords', metaKeywords);
    updateMetaTag('name', 'author', companyInfo.name);

    // 3. Open Graph Meta Tags
    updateMetaTag('property', 'og:site_name', companyInfo.name);
    updateMetaTag('property', 'og:title', pageTitle);
    updateMetaTag('property', 'og:description', metaDescription);
    updateMetaTag('property', 'og:image', metaOgImage);
    updateMetaTag('property', 'og:url', fullCanonicalUrl);
    updateMetaTag('property', 'og:type', type === 'product' ? 'og:product' : type === 'article' ? 'article' : 'website');

    // 4. Twitter Cards Meta Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', seoSettings?.twitterHandle || '@ahmadify_store');
    updateMetaTag('name', 'twitter:title', pageTitle);
    updateMetaTag('name', 'twitter:description', metaDescription);
    updateMetaTag('name', 'twitter:image', metaOgImage);

    // 5. Canonical Link
    updateLinkTag('canonical', fullCanonicalUrl);

    // 6. JSON-LD Structured Data
    const existingJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
    existingJsonLd.forEach(el => el.remove());

    // Schema 1: Organization Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': companyInfo.name,
      'legalName': companyInfo.name,
      'url': companyInfo.domain,
      'logo': `${companyInfo.domain}/logo.png`,
      'email': companyInfo.email,
      'telephone': companyInfo.whatsapp,
      'foundingDate': '2026',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': `${companyInfo.registeredOffice.line1}, ${companyInfo.registeredOffice.line2}`,
        'addressLocality': companyInfo.registeredOffice.city,
        'postalCode': companyInfo.registeredOffice.postcode,
        'addressCountry': 'GB'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': companyInfo.whatsapp,
        'contactType': 'customer support',
        'email': companyInfo.email,
        'areaServed': 'Worldwide',
        'availableLanguage': ['English']
      },
      'sameAs': [
        'https://facebook.com/ahmadify.store',
        'https://instagram.com/ahmadify.store',
        'https://x.com/ahmadify_store'
      ]
    };

    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(orgSchema);
    document.head.appendChild(orgScript);

    // Schema 2: Product Schema (If Product Type)
    if (type === 'product' && product) {
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.title,
        'image': product.images,
        'description': product.shortDescription || product.description,
        'sku': product.sku,
        'brand': {
          '@type': 'Brand',
          'name': product.brand || companyInfo.name
        },
        'offers': {
          '@type': 'Offer',
          'url': `${companyInfo.domain}/product/${product.slug}`,
          'priceCurrency': companyInfo.defaultCurrency || 'GBP',
          'price': product.price.toFixed(2),
          'itemCondition': 'https://schema.org/NewCondition',
          'availability': product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          'seller': {
            '@type': 'Organization',
            'name': companyInfo.name
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating || 4.9,
          'reviewCount': product.reviewCount || 128
        }
      };
      const productScript = document.createElement('script');
      productScript.type = 'application/ld+json';
      productScript.text = JSON.stringify(productSchema);
      document.head.appendChild(productScript);
    }

    // Schema 3: FAQ Schema
    if (type === 'faq' && faqList && faqList.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqList.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      };
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.text = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
    }

    // Schema 4: Blog Posting Schema
    if (type === 'article' && blogPost) {
      const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': blogPost.title,
        'image': blogPost.image,
        'datePublished': blogPost.date,
        'author': {
          '@type': 'Organization',
          'name': blogPost.author || companyInfo.name
        },
        'publisher': {
          '@type': 'Organization',
          'name': companyInfo.name,
          'logo': {
            '@type': 'ImageObject',
            'url': `${companyInfo.domain}/logo.png`
          }
        },
        'description': blogPost.excerpt
      };
      const blogScript = document.createElement('script');
      blogScript.type = 'application/ld+json';
      blogScript.text = JSON.stringify(blogSchema);
      document.head.appendChild(blogScript);
    }
  }, [pageTitle, metaDescription, metaKeywords, metaOgImage, fullCanonicalUrl, type, product, blogPost, companyInfo]);

  return null;
};
