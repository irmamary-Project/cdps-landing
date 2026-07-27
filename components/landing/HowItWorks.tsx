"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@/components/decorative/FeatureIcon";

const STEPS = [
  {
    num: "01",
    title: "Daftarkan Sekolah",
    desc: "Hubungi tim kami untuk mendaftarkan sekolah Anda. Kami akan bantu setup portal dengan branding sekolah Anda.",
    icon: "checklist",
  },
  {
    num: "02",
    title: "Input Data & Aktivitas",
    desc: "Guru input daily report, upload portofolio, dan buat laporan perkembangan. Semua terpusat dan terstruktur.",
    icon: "upload",
  },
  {
    num: "03",
    title: "Pantau via Portal",
    desc: "Orang tua pantau perkembangan anak real-time melalui portal atau HP. Notifikasi otomatis setiap ada laporan baru.",
    icon: "mobile",
  },
];

function StepCard({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      <div className={`hidden lg:flex items-center ${isLeft ? "justify-start" : "justify-end"}`}>
        <div className={`w-1/2 ${isLeft ? "pr-16 text-right" : "pl-16 text-left"}`}>
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -40 : 40 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex items-center gap-5 ${isLeft ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="relative z-10 flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6741D9] to-[#7C5CF7] flex items-center justify-center shadow-lg shadow-[#6741D9]/20">
                <Icon name={step.icon} size={24} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#FBD321] rounded-full flex items-center justify-center text-[#6741D9] text-xs font-bold shadow-md">
                {step.num}
              </div>
            </div>
            <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-base">{step.desc}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:hidden flex items-center gap-4">
        <div className="relative z-10 flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6741D9] to-[#7C5CF7] flex items-center justify-center shadow-lg shadow-[#6741D9]/20">
            <Icon name={step.icon} size={20} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FBD321] rounded-full flex items-center justify-center text-[#6741D9] text-[10px] font-bold shadow-md">
            {step.num}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section aria-label="Cara Kerja CDPS" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EDE9FE] via-[#6741D9] to-[#EDE9FE] hidden lg:block -translate-x-1/2" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mulai dalam 3 Langkah Mudah
          </h2>
          <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
            Tidak perlu ribet. Dari pendaftaran hingga operasional, semua sudah otomatis.
          </p>
        </div>

        <div className="space-y-16">
          {STEPS.map((s, i) => (
            <StepCard key={s.num} step={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <a
            href="#kontak"
            className="group inline-flex items-center gap-2 bg-[#FBD321] hover:bg-[#D4A800] text-[#6741D9] font-bold px-8 py-4 rounded-full text-base transition-all hover:shadow-lg hover:shadow-[#FBD321]/30"
          >
            Hubungi Kami Sekarang
            <span className="group-hover:translate-x-1 transition-transform">
              <Icon name="arrow-right" size={18} className="text-[#6741D9]" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
