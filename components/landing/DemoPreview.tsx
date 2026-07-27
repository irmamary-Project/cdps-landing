"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlobPrimary } from "@/components/decorative/Blob";
import { Icon } from "@/components/decorative/FeatureIcon";

export default function DemoPreview() {
  return (
    <section aria-label="Demo Portal CDPS" className="py-20 sm:py-28 bg-gradient-to-br from-primary to-[#3720A0] relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 opacity-10 animate-float-slow">
          <BlobPrimary className="w-full h-full text-accent" />
        </div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 opacity-10 animate-float" style={{ animationDelay: "-2s" }}>
          <BlobPrimary className="w-full h-full text-white" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lihat Langsung Demo Portal
          </h2>
          <p className="text-white/60 text-base lg:text-lg max-w-2xl mx-auto">
            Coba sendiri bagaimana CDPS bekerja. Data dummy, tidak perlu login — klik dan jelajahi
            semua fitur.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative">
            <div className="bg-gray-800 rounded-t-3xl rounded-b-lg p-2 shadow-2xl">
              <div className="flex items-center gap-2 px-3 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="bg-white rounded-xl overflow-hidden aspect-video">
                <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-4 w-32 bg-gray-200 rounded-full" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-accent rounded-full" />
                        <div className="h-6 w-16 bg-gray-200 rounded-full" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                          <div className="h-3 w-12 bg-gray-200 rounded mb-1" />
                          <div className="h-5 w-8 bg-gradient-to-r from-primary to-primary-light rounded" />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <div className="col-span-2 bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                        <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-light" />
                            <div className="flex-1 h-2 bg-gray-100 rounded" />
                            <div className="h-4 w-10 bg-green-100 rounded-full" />
                          </div>
                        ))}
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                        <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-gray-100" />
                            <div className="flex-1 h-2 bg-gray-100 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-1/2 h-3 bg-gray-700 rounded-b-2xl" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-white text-primary font-bold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/30"
            >
              Buka Demo Lengkap
              <span className="group-hover:translate-x-1 transition-transform">
                <Icon name="play" size={20} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
