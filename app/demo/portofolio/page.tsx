"use client";

import { DEMO_PORTOFOLIO, FITRAH_LIST } from "../lib/data";
import { useState } from "react";

export default function PortofolioPage() {
  const [lightbox, setLightbox] = useState<{ url: string; nama: string } | null>(null);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Portofolio</h1>
        <p className="text-gray-500 text-sm mt-1">Dokumentasi foto kegiatan siswa</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {DEMO_PORTOFOLIO.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6741D9] to-[#7C5CF7] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {p.siswa.nama.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{p.siswa.nama}</div>
                  <div className="text-xs text-gray-400">{p.tanggal} · {p.sesi}</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <div className="grid grid-cols-3 gap-2">
                {p.media.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setLightbox({ url: m.url, nama: m.nama_file })}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 group relative"
                  >
                    <img
                      src={m.url}
                      alt={m.nama_file}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.fitrah.map((fk) => {
                  const label = FITRAH_LIST.find((f) => f.key === fk)?.label || fk;
                  return (
                    <span key={fk} className="text-[11px] bg-[#EDE9FE] text-[#6741D9] px-2 py-0.5 rounded-full">
                      {label}
                    </span>
                  );
                })}
              </div>

              <p className="text-xs text-gray-600 mt-3 leading-relaxed">{p.observasi}</p>

              {p.catatan_ortu && (
                <p className="text-xs text-gray-400 mt-2 italic">"{p.catatan_ortu}"</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.nama}
            className="max-w-full max-h-[90vh] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white/60 text-sm">{lightbox.nama}</div>
        </div>
      )}
    </div>
  );
}
