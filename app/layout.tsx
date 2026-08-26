import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, Sora } from "next/font/google";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import "./globals.css";
import CookieConsent from "@/components/global/CookieConsent";
import ClientProviders from "@/components/global/ClientProviders";
import Script from "next/script";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.marmasec.com";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Marma Security | Redefining Cybersecurity Through Simplicity",
  description:
    "Marma Security bridges the gap between complex, enterprise-grade security and the everyday needs of homes and businesses with automated, network-level protection requiring zero technical expertise.",
  keywords:
    "Cybersecurity, Network Security, Automated Security, Enterprise Security, Home Network Protection, SMB Security, Plug-and-Play Protection, SafeHome, SafeBiz, SafeEnterprise, SafeGov, SafeCloud, AI-Managed Platform, Zero Trust, Marma Security",
  authors: [{ name: "Marma Security" }],
  creator: "Marma Security",
  publisher: "Marma Security",
  verification: {
    google: "Ei6tcvtpZwNLw19v_uEk2EWkQB7hCIAfPR8RYrT_lNc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Marma Security | Redefining Cybersecurity Through Simplicity",
    description:
      "Marma Security bridges the gap between complex, enterprise-grade security and the everyday needs of homes and businesses with automated, network-level protection requiring zero technical expertise.",
    siteName: "Marma Security",
    images: [
      {
        url: `${BASE_URL}/images/home/heroEnterprise400.webp`,
        width: 1200,
        height: 630,
        alt: "Marma Security — Redefining Cybersecurity Through Simplicity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marma Security | Redefining Cybersecurity Through Simplicity",
    description:
      "Marma Security provides automated, plug-and-play network-level cybersecurity for enterprises, small businesses, and homes.",
    images: [`${BASE_URL}/images/home/heroEnterprise400.webp`],
    creator: "@marmasecurity",
    site: "@marmasecurity",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data - Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Marma Security",
    url: BASE_URL,
    logo: `${BASE_URL}/images/global/logo.svg`,
    description:
      "A cybersecurity firm dedicated to Redefining Cybersecurity Through Simplicity, offering automated network-level protection.",
    sameAs: ["https://www.linkedin.com/company/marmasecurity/"],
  };

  // Structured Data - Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Marma Security",
    url: BASE_URL,
  };

  // Structured Data - Site Navigation Schema
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Home",
        url: `${BASE_URL}/`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Solutions",
        url: `${BASE_URL}/solutions`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Products",
        url: `${BASE_URL}/product`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "About Us",
        url: `${BASE_URL}/about-us`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Contact",
        url: `${BASE_URL}/contact-us`,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${ibmPlexSans.variable} ${sora.variable} antialiased flex flex-col min-h-screen overflow-x-clip`}
      >
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WHWKPVJ5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <ClientProviders>
          <Navbar />
          <main className="flex-grow ">{children}</main>
          <Footer />
          <CookieConsent />
        </ClientProviders>

        {/* analytics scripts */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WHWKPVJ5');
        `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S9PDP4YZHK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-S9PDP4YZHK');
        `}
        </Script>
      </body>
    </html>
  );
}
