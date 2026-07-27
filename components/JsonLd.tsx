const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lumizo",
  alternateName: "CDPS by Lumizo",
  url: "https://lumizo.my.id",
  logo: "https://lumizo.my.id/logo.png",
  description:
    "Penyedia platform Child Development Portal System (CDPS) untuk sekolah anak usia dini dalam mengelola dan memantau perkembangan anak.",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+6289656059612",
      contactType: "sales",
      email: "cdps@lumizo.my.id",
      availableLanguage: ["Indonesian", "English"],
    },
  ],
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CDPS - Child Development Portal System",
  alternateName: "CDPS by Lumizo",
  url: "https://lumizo.my.id",
  description:
    "Platform all-in-one untuk pantau tumbuh kembang anak. Daily report, portofolio digital, laporan triwulan, CCTV, dan absensi guru.",
  inLanguage: "id",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://lumizo.my.id/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apa itu CDPS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CDPS (Child Development Portal System) adalah platform all-in-one untuk sekolah anak usia dini dalam mengelola dan memantau perkembangan anak. Mulai dari daily report, portofolio digital, laporan triwulan, hingga CCTV.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa biaya berlangganan CDPS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kami menawarkan paket yang fleksibel sesuai kebutuhan sekolah. Hubungi tim kami untuk informasi harga dan demo khusus.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah data aman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keamanan data adalah prioritas utama. Semua data terenkripsi dan disimpan di database yang aman. Hanya pihak yang berwenang (sekolah, guru, orang tua) yang bisa mengakses data terkait.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa diakses dari HP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya! CDPS dioptimalkan untuk semua perangkat — desktop, tablet, maupun smartphone. Orang tua bisa memantau anak langsung dari HP.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah perlu instalasi software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak perlu. CDPS berbasis web, cukup akses melalui browser. Tidak ada instalasi atau maintenance yang merepotkan.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara mendaftarkan sekolah?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hubungi kami melalui WhatsApp atau email. Tim kami akan membantu setup portal dengan branding sekolah Anda dalam waktu 1-2 hari kerja.",
      },
    },
  ],
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
