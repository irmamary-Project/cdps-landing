"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/decorative/FeatureIcon";

const FAQS = [
  {
    q: "Apa itu CDPS?",
    a: "CDPS (Child Development Portal System) adalah platform all-in-one untuk sekolah anak usia dini dalam mengelola dan memantau perkembangan anak. Mulai dari daily report, portofolio digital, laporan triwulan, hingga CCTV.",
    color: "#6741D9",
  },
  {
    q: "Berapa biaya berlangganan CDPS?",
    a: "Kami menawarkan paket yang fleksibel sesuai kebutuhan sekolah. Hubungi tim kami untuk informasi harga dan demo khusus.",
    color: "#04B5BB",
  },
  {
    q: "Apakah data aman?",
    a: "Keamanan data adalah prioritas utama. Semua data terenkripsi dan disimpan di database yang aman. Hanya pihak yang berwenang (sekolah, guru, orang tua) yang bisa mengakses data terkait.",
    color: "#6741D9",
  },
  {
    q: "Apakah bisa diakses dari HP?",
    a: "Ya! CDPS dioptimalkan untuk semua perangkat — desktop, tablet, maupun smartphone. Orang tua bisa memantau anak langsung dari HP.",
    color: "#04B5BB",
  },
  {
    q: "Apakah perlu instalasi software?",
    a: "Tidak perlu. CDPS berbasis web, cukup akses melalui browser. Tidak ada instalasi atau maintenance yang merepotkan.",
    color: "#FBD321",
  },
  {
    q: "Bagaimana cara mendaftarkan sekolah?",
    a: "Hubungi kami melalui WhatsApp atau email. Tim kami akan membantu setup portal dengan branding sekolah Anda dalam waktu 1-2 hari kerja.",
    color: "#6741D9",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="kontak" aria-label="Pertanyaan Umum tentang CDPS" className="py-20 sm:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-pale rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ada Pertanyaan?
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            Beberapa pertanyaan yang sering ditanyakan. Jika belum terjawab, hubungi kami langsung.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-gray-100 text-left hover:shadow-md transition-all duration-200"
                  style={{ borderColor: isOpen ? faq.color : undefined }}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: faq.color }}
                  />
                  <span className="flex-1 text-sm font-semibold text-gray-900">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="text-gray-300 text-xl flex-shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-4 bg-white/50 rounded-b-2xl border-x border-b border-gray-100 -mt-1">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-gradient-to-br from-primary-pale to-white rounded-3xl border border-primary-pale"
        >
          <p className="text-gray-700 font-semibold mb-2">Masih punya pertanyaan lain?</p>
          <p className="text-gray-500 text-sm mb-4">Tim kami siap membantu Anda.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="/kontak"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg"
            >
              Hubungi Kami
              <Icon name="arrow-right" size={14} />
            </a>
            <a
              href="https://wa.me/6289656059612"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary text-white font-bold px-6 py-3 rounded-full text-sm transition-all hover:shadow-lg"
            >
              <Icon name="whatsapp" size={16} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
