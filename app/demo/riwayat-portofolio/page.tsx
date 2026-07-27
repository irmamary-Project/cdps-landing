"use client";

import { useState } from "react";
import { DEMO_HISTORY_PORTOFOLIO, ASPEK_LIST } from "../lib/data";
import { Search, CalendarDays } from "lucide-react";

export default function RiwayatPortofolioPage() {
  const [siswa, setSiswa] = useState("");
  const [aspek, setAspek] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = DEMO_HISTORY_PORTOFOLIO.filter((p) => {
    if (siswa && p.siswa !== siswa) return false;
    if (aspek && !p.aspek.includes(aspek)) return false;
    if (tanggalAwal && p.tanggal < tanggalAwal) return false;
    if (tanggalAkhir && p.tanggal > tanggalAkhir) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Riwayat Portofolio</h1>
        <p className="text-gray-500 text-sm mt-1">Arsip portofolio digital per siswa — untuk evaluasi guru dan admin</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <select value={siswa} onChange={(e) => setSiswa(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
            <option value="">Semua Siswa</option>
            {[...new Set(DEMO_HISTORY_PORTOFOLIO.map((p) => p.siswa))].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={aspek} onChange={(e) => setAspek(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
            <option value="">Semua Aspek</option>
            {ASPEK_LIST.map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
          </select>
          <input type="date" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
          <span className="hidden sm:inline text-gray-300 self-center">–</span>
          <input type="date" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Tidak ada portofolio untuk filter ini</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button onClick={() => setLightbox(p.foto)} className="w-full aspect-video bg-gray-100 overflow-hidden group">
                <img src={p.foto} alt={p.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              </button>
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6741D9] to-[#7C5CF7] flex items-center justify-center text-white font-bold text-xs">{p.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{p.siswa}</div>
                    <div className="text-xs text-gray-400">{p.kelas} · {p.tanggal}</div>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{p.judul}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{p.observasi}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.aspek.map((fk) => {
                    const label = ASPEK_LIST.find((f) => f.key === fk)?.label || fk;
                    return <span key={fk} className="text-[11px] bg-[#EDE9FE] text-[#6741D9] px-2 py-0.5 rounded-full">{label}</span>;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Preview" className="max-w-full max-h-[90vh] rounded-lg object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
