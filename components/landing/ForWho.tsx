"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FeatureIcon from "@/components/decorative/FeatureIcon";

const AUDIENCES = [
  {
    key: "sekolah",
    title: "Sekolah",
    desc: "Solusi manajemen data siswa dan branding sekolah dalam satu portal.",
    items: [
      "Sistem manajemen data siswa terpusat",
      "Laporan perkembangan otomatis",
      "Komunikasi efektif dengan orang tua",
      "Branding sekolah melalui portal",
    ],
    bg: "bg-[#6741D9]",
    badge: "bg-white/20 text-white",
    iconColor: "text-white",
    rot: "-rotate-2",
  },
  {
    key: "guru",
    title: "Guru",
    desc: "Workflow lebih cepat, rekap otomatis, dan fokus ke hal yang benar-benar penting.",
    items: [
      "Input daily report cepat & mudah",
      "Upload portofolio foto/video",
      "Buat laporan triwulan otomatis",
      "Absensi dengan geofence",
    ],
    bg: "bg-[#04B5BB]",
    badge: "bg-white/20 text-white",
    iconColor: "text-white",
    rot: "rotate-1",
  },
  {
    key: "ortu",
    title: "Orang Tua",
    desc: "Pantau tumbuh kembang buah hati secara real-time, kapan saja dan di mana saja.",
    items: [
      "Pantau aktivitas anak real-time",
      "Lihat portofolio kegiatan",
      "Terima notifikasi otomatis",
      "Akses CCTV langsung dari HP",
    ],
    bg: "bg-[#FBD321]",
    badge: "bg-[#6741D9]/10 text-[#6741D9]",
    iconColor: "text-[#6741D9]",
    rot: "rotate-3",
  },
];

function AudienceCard({ a, index }: { a: typeof AUDIENCES[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`${a.bg} rounded-3xl p-8 lg:p-10 ${a.rot} hover:rotate-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
    >
      <div className="mb-6">
        <FeatureIcon name={a.key} className={a.iconColor} />
      </div>
      <h3 className={`text-2xl font-bold mb-2 ${a.key === "ortu" ? "text-[#6741D9]" : "text-white"}`}>{a.title}</h3>
      <p className={`text-sm mb-6 leading-relaxed ${a.key === "ortu" ? "text-[#6741D9]/70" : "text-white/70"}`}>{a.desc}</p>
      <ul className="space-y-3">
        {a.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm">
            <span className={`flex-shrink-0 mt-0.5 ${a.key === "ortu" ? "text-[#6741D9]" : "text-white"}`}>✦</span>
            <span className={`${a.key === "ortu" ? "text-[#6741D9]/80" : "text-white/80"}`}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ForWho() {
  return (
    <section aria-label="Untuk Siapa CDPS" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[#EDE9FE] opacity-50 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#FBD321]/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Solusi untuk Semua Pihak
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            CDPS dirancang untuk memenuhi kebutuhan sekolah, guru, dan orang tua dalam
            satu platform terpadu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
          {AUDIENCES.map((a, i) => (
            <AudienceCard key={a.key} a={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
