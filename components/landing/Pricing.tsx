"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/decorative/FeatureIcon";

const PLANS = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "selamanya",
    desc: "Coba fitur dasar CDPS tanpa biaya. Cocok untuk pengenalan.",
    color: "#6741D9",
    bg: "bg-[#EDE9FE]",
    btn: "bg-[#6741D9] hover:bg-[#7C5CF7] text-white",
    features: [
      "Maksimal 5 siswa",
      "Daily report harian",
      "Portofolio digital",
      "Laporan perkembangan",
      "Akses orang tua via HP",
      "Dukungan email",
    ],
    exclude: [],
    cta: "Mulai Gratis",
    href: "mailto:cdps@lumizo.my.id",
  },
  {
    name: "Pro",
    price: "Rp 199rb",
    period: "/bulan",
    desc: "Fitur lengkap untuk sekolah dengan kebutuhan lebih besar.",
    color: "#FBD321",
    bg: "bg-[#FEF9E7]",
    btn: "bg-[#FBD321] hover:bg-[#D4A800] text-[#6741D9]",
    featured: true,
    features: [
      "Maksimal 50 siswa",
      "Semua fitur Gratis",
      "Laporan triwulan otomatis",
      "Notifikasi WhatsApp",
      "Multi guru & kelas",
      "Live CCTV",
      "Dukungan prioritas",
    ],
    notes: ["Live CCTV: biaya pemasangan & alat dibayar terpisah"],
    exclude: [],
    cta: "Hubungi Kami",
    href: "mailto:cdps@lumizo.my.id?subject=Paket%20Pro",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Solusi khusus untuk yayasan atau dinas pendidikan.",
    color: "#04B5BB",
    bg: "bg-[#E6F9FA]",
    btn: "bg-[#04B5BB] hover:bg-[#03A0A8] text-white",
    features: [
      "Siswa tidak terbatas",
      "Semua fitur Pro",
      "Absensi guru (geofence)",
      "Live CCTV",
      "SSO & branding khusus",
      "Dedicated support",
    ],
    exclude: [],
    cta: "Hubungi Kami",
    href: "#kontak",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" aria-label="Paket Harga CDPS" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pilih Paket Sesuai Kebutuhan
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            Mulai dari gratis hingga enterprise. Semua paket bisa dicoba tanpa risiko.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border-2 overflow-hidden ${
                plan.featured ? "border-[#FBD321] shadow-xl shadow-[#FBD321]/10 scale-105" : "border-gray-100"
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#FBD321] text-[#6741D9] text-xs font-bold px-6 py-1.5 rounded-b-xl">
                  PALING POPULER
                </div>
              )}

              <div className={`p-6 lg:p-8 ${plan.bg}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 text-sm ml-1">{plan.period}</span>}
                </div>
                <a
                  href={plan.href}
                  className={`block text-center font-bold px-6 py-3 rounded-full text-sm transition-all ${plan.btn}`}
                >
                  {plan.cta}
                </a>
              </div>

              <div className="p-6 lg:p-8 bg-white space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Icon name="checklist" size={16} className="text-[#04B5BB] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{f}</span>
                  </div>
                ))}
                {plan.notes?.map((n) => (
                  <div key={n} className="flex items-start gap-3 mt-3 pt-3 border-t border-gray-50">
                    <span className="w-4 h-4 rounded-full bg-[#FBD321]/30 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="text-[8px] text-[#6741D9] font-bold">i</span>
                    </span>
                    <span className="text-xs text-gray-400 italic">{n}</span>
                  </div>
                ))}
                {plan.exclude?.map((f) => (
                  <div key={f} className="flex items-start gap-3 opacity-50">
                    <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <span className="w-1.5 h-0.5 bg-gray-300 rounded-full" />
                    </span>
                    <span className="text-sm text-gray-400 line-through">{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
