import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const baseUrl = "https://cdps.lumizo.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CDPS - Pantau Tumbuh Kembang Anak | by Lumizo",
    template: "%s | CDPS by Lumizo",
  },
  description:
    "Pantau tumbuh kembang anak usia dini dengan mudah. Daily report, portofolio, dan laporan triwulan dalam satu portal terpadu.",
  keywords: [
    "CDPS",
    "Child Development Portal System",
    "tumbuh kembang anak",
    "daily report anak",
    "portofolio digital anak",
    "laporan perkembangan anak",
    "sistem informasi sekolah",
    "platform PAUD",
    "manajemen TK",
    "aplikasi orang tua murid",
    "Lumizo",
    "sekolah anak usia dini",
    "absensi guru geofence",
    "CCTV sekolah",
    "portal orang tua",
  ],
  applicationName: "CDPS - Child Development Portal System",
  authors: [{ name: "Lumizo" }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: "Lumizo",
  publisher: "Lumizo",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "CDPS by Lumizo",
    title: "CDPS - Pantau Tumbuh Kembang Anak Lebih Mudah",
    description:
      "Pantau tumbuh kembang anak usia dini dengan mudah. Daily report, portofolio, dan laporan triwulan dalam satu portal.",
    url: baseUrl,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "CDPS - Child Development Portal System by Lumizo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CDPS - Pantau Tumbuh Kembang Anak | by Lumizo",
    description:
      "Pantau tumbuh kembang anak usia dini dengan mudah. Daily report, portofolio, dan laporan triwulan.",
    images: ["/opengraph-image.jpg"],
    creator: "@lumizo",
    site: "@lumizo",
  },
  alternates: {
    canonical: baseUrl,
  },
  other: {
    "google-site-verification": "isi_kode_verifikasi_dari_google_search_console",
    "theme-color": "#6741D9",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
