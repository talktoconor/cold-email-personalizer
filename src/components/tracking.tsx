"use client";

import { useEffect } from "react";

export function TrackingPixels() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingData = {
      event: "page_view",
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      url: window.location.href,
      referrer: document.referrer,
    };

    if (Object.values(trackingData).some((v) => v)) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingData),
      }).catch(() => {});
    }
  }, []);

  return (
    <>
      {/* Google Ads gtag.js — replace GA_TRACKING_ID with your actual ID */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-XXXXXXX');
        `}
      </Script> */}

      {/* Meta Pixel — replace with your actual Pixel ID */}
      {/* <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        `}
      </Script> */}

      {/* LinkedIn Insight Tag — replace with your Partner ID */}
      {/* <Script id="linkedin-tag" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "YOUR_PARTNER_ID";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script> */}
    </>
  );
}

export function trackEvent(eventName: string, data?: Record<string, unknown>) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: eventName,
      ...data,
      url: window.location.href,
    }),
  }).catch(() => {});

  // Google Ads conversion events
  // if (typeof window !== 'undefined' && (window as any).gtag) {
  //   (window as any).gtag('event', 'conversion', {
  //     send_to: `AW-XXXXXXX/${eventName}`,
  //   });
  // }

  // Meta Pixel events
  // if (typeof window !== 'undefined' && (window as any).fbq) {
  //   (window as any).fbq('track', eventName, data);
  // }
}
