"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlobPrimary } from "@/components/decorative/Blob";
import { Icon } from "@/components/decorative/FeatureIcon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Hero() {
  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary min-h-[85vh] flex items-center">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,211,33,0.15),transparent_50%)] animate-pulse-soft" aria-hidden="true" />

      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-80 h-80 opacity-20 animate-float-slow">
          <BlobPrimary className="w-full h-full text-white" />
        </div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 opacity-15 animate-float" style={{ animationDelay: "-3s" }}>
          <BlobPrimary className="w-full h-full text-accent" />
        </div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 opacity-[0.08] animate-spin-slow pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" strokeDasharray="8 12" />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-16 h-16 opacity-20 animate-float" style={{ animationDelay: "-1s" }}>
          <svg viewBox="0 0 60 60" fill="none">
            <rect x="2" y="2" width="56" height="56" rx="12" stroke="white" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-3 text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-2 rounded-full mb-6 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Platform Manajemen Tumbuh Kembang Anak
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-6xl xl:text-6xl font-bold text-white leading-none mb-6">
              Pantau Tumbuh
              <br />
              Kembang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent">
                Lebih Mudah
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base sm:text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
              CDPS membantu sekolah, guru, dan orang tua memantau perkembangan anak secara real-time.
              Daily report, portofolio digital, laporan triwulan, dan CCTV — semua dalam satu portal.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4">
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 bg-accent hover:bg-white text-primary font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/40"
              >
                Coba Demo Gratis
                <span className="group-hover:translate-x-1 transition-transform">
                  <Icon name="arrow-right" size={20} />
                </span>
              </Link>
              <a
                href="#fitur"
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white/80 hover:text-white hover:bg-white/10 px-8 py-4 rounded-full text-base font-medium transition-all backdrop-blur-sm"
              >
                Pelajari Lebih Lanjut
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"].map((c, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white/50" style={{ background: c }}>
                    <svg viewBox="0 0 40 40" className="w-full h-full opacity-60">
                      <circle cx="20" cy="20" r="8" fill="white" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="text-white/60 text-sm">
                <span className="text-white font-bold text-lg">50+</span> Sekolah telah bergabung
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="lg:col-span-2 hidden lg:flex justify-center">
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl animate-pulse-soft" />
              <div className="absolute -inset-4 border border-white/10 rounded-full animate-spin-slow" />
              <div className="absolute -inset-8 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />

              {/* Main image card */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/15 p-3 shadow-2xl">
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/40 to-secondary/40 p-2">
                  <img
                    src="/logo.png"
                    alt="CDPS Dashboard Preview"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>

              {/* Floating badge - top */}
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-accent rounded-2xl -rotate-12 flex items-center justify-center shadow-lg shadow-accent/30">
                <Icon name="star" size={24} className="text-primary" />
              </div>

              {/* Floating badge - bottom */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center animate-float">
                <Icon name="chart" size={24} className="text-white/80" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
