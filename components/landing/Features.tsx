"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FeatureIcon from "@/components/decorative/FeatureIcon";

const FEATURES = [
  {
    key: "daily-report",
    title: "Daily Report",
    desc: "Catat mood, makan, tidur, ibadah, dan aktivitas harian anak dalam satu klik. Guru input, orang tua pantau real-time.",
    color: "bg-[#6741D9]",
    iconColor: "text-white",
  },
  {
    key: "portofolio",
    title: "Portofolio Digital",
    desc: "Dokumentasi foto dan video kegiatan anak. Orang tua bisa melihat momen berharga putra-putrinya di sekolah.",
    color: "bg-[#04B5BB]",
    iconColor: "text-white",
  },
  {
    key: "laporan",
    title: "Laporan Perkembangan",
    desc: "Laporan triwulan berdasarkan 8 aspek fitrah. Evaluasi perkembangan anak secara komprehensif dan terstruktur.",
    color: "bg-[#FBD321]",
    iconColor: "text-[#6741D9]",
  },
  {
    key: "cctv",
    title: "Live CCTV",
    desc: "Pantau kegiatan anak di sekolah secara langsung melalui streaming CCTV. Tenang karena anak selalu terpantau.",
    color: "bg-[#6741D9]",
    iconColor: "text-white",
  },
  {
    key: "absensi",
    title: "Absensi Guru",
    desc: "Sistem check-in/out dengan geofence. Rekap kehadiran guru otomatis, akurat, dan real-time.",
    color: "bg-[#04B5BB]",
    iconColor: "text-white",
  },
  {
    key: "notifikasi",
    title: "Notifikasi & Pengumuman",
    desc: "Info penting dari sekolah langsung sampai ke orang tua. Tidak ada lagi miss informasi.",
    color: "bg-[#FBD321]",
    iconColor: "text-[#6741D9]",
  },
];

function FeatureRow({ feature, index }: { feature: typeof FEATURES[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-16 py-12 lg:py-16`}
    >
      <div className="flex-shrink-0">
        <div className={`w-24 h-24 lg:w-32 lg:h-32 ${feature.color} rounded-3xl flex items-center justify-center shadow-lg ${isEven ? "-rotate-3" : "rotate-3"} hover:rotate-0 transition-transform duration-300`}>
          <FeatureIcon name={feature.key} className={feature.iconColor} />
        </div>
      </div>
      <div className={`flex-1 text-center ${isEven ? "lg:text-left" : "lg:text-right"}`}>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{feature.title}</h3>
        <p className="text-gray-500 text-base lg:text-lg leading-relaxed max-w-lg inline-block">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="fitur" aria-label="Fitur CDPS" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Semua yang Anda Butuhkan
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            Dari laporan harian hingga portofolio digital — CDPS menyediakan semua alat yang
            dibutuhkan sekolah dan orang tua.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.key} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
