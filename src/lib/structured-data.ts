import { BASE_URL, SITE_NAME } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [],
    description:
      "AI-powered cold email personalization tool for sales teams. Generate personalized cold emails that get replies.",
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: BASE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free - 5 personalized emails/month",
      },
      {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
        description: "Pro - 200 personalized emails/month",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        price: "99",
        priceCurrency: "USD",
        description: "Team - Unlimited emails per seat",
        billingDuration: "P1M",
      },
      {
        "@type": "Offer",
        price: "299",
        priceCurrency: "USD",
        description: "Agency - 5 seats, white-label, API access",
        billingDuration: "P1M",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };
}

export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} - AI Cold Email Personalization`,
    url: `${BASE_URL}/pricing`,
    description:
      "AI-powered cold email personalization tool. Researches prospects and generates personalized emails that get 3x more replies.",
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2027-12-31",
        description: "Free tier - 5 emails/month",
      },
      {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2027-12-31",
        description: "Pro - 200 emails/month",
      },
      {
        "@type": "Offer",
        price: "99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2027-12-31",
        description: "Team - Unlimited per seat",
      },
      {
        "@type": "Offer",
        price: "299",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2027-12-31",
        description: "Agency - 5 seats, white-label",
      },
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
  };
}
