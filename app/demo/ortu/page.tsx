"use client";

import { useState } from "react";
import { ChevronRight, Bell, FileText, Image as ImageIcon } from "lucide-react";
import StudentAvatar from "@/components/StudentAvatar";
import { DEMO_STUDENTS, DEMO_DAILY_REPORTS, DEMO_PORTOFOLIO, DEMO_NOTIFICATIONS } from "../lib/data";

const anak = DEMO_STUDENTS[0];

export default function OrtuPage() {
  const [activeTab, setActiveTab] = useState<"report" | "portofolio" | "notifikasi">("report");

  const reportTerbaru = DEMO_DAILY_REPORTS.filter((r) => r.siswa.id === anak.id).slice(0, 3);
  const portofolioAnak = DEMO_PORTOFOLIO.filter((p) => p.siswa.id === anak.id).slice(0, 4);
  const notifOrtu = DEMO_NOTIFICATIONS.filter((n) => n.role === "ortu").slice(0, 5);

  const baseNav = (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StudentAvatar name={anak.nama} size="sm" />
          <div>
            <div className="text-sm font-bold text-gray-900">Portal Orang Tua</div>
            <div className="text-xs text-gray-400">{anak.nama}</div>
          </div>
        </div>
        <a href="/demo" className="text-xs text-primary font-semibold hover:underline">
          Kembali ke Demo
        </a>
      </div>
    </div>
  );

  return (
    <>
      {baseNav}

      <main className="pt-14">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-5 sm:p-6 text-white mb-6">
            <p className="text-white/70 text-xs mb-1">Selamat datang,</p>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">Ibu Dewi 👋</h1>
            <p className="text-white/70 text-sm">Pantau perkembangan {anak.nama} di sini</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { key: "report" as const, label: "Daily Report", icon: FileText, count: reportTerbaru.length },
              { key: "portofolio" as const, label: "Portofolio", icon: ImageIcon, count: portofolioAnak.length },
              { key: "notifikasi" as const, label: "Notifikasi", icon: Bell, count: notifOrtu.filter((n) => !n.dibaca).length },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                    activeTab === tab.key
                      ? "bg-primary-pale border-primary text-primary"
                      : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs font-semibold">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.key ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {activeTab === "report" && (
            <div className="space-y-3">
              <h2 className="font-bold text-gray-900 text-sm">Daily Report Terbaru</h2>
              {reportTerbaru.map((r) => (
                <div key={r.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">{r.tanggal} · {r.sesi}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.kehadiran === "Hadir" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                    }`}>{r.kehadiran}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{r.observasi_guru}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <span>😊 {r.mood_datang}</span>
                    <span>🍚 {r.makan_siang}</span>
                    <span>💤 {r.tidur_siang === "Tidur" ? "Tidur" : "Tidak tidur"}</span>
                  </div>
                  {r.catatan_ortu && (
                    <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-primary font-medium">
                      Catatan: "{r.catatan_ortu}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "portofolio" && (
            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-3">Portofolio {anak.nama}</h2>
              <div className="grid grid-cols-2 gap-3">
                {portofolioAnak.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gray-50">
                      <img src={p.media[0].url} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{p.observasi}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{p.tanggal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifikasi" && (
            <div>
              <h2 className="font-bold text-gray-900 text-sm mb-3">Notifikasi</h2>
              <div className="space-y-2">
                {notifOrtu.map((n) => (
                  <div
                    key={n.id}
                    className={`bg-white rounded-xl p-4 border shadow-sm flex items-start gap-3 ${
                      !n.dibaca ? "border-primary/20 bg-primary-pale/30" : "border-gray-100"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.jenis === "laporan" ? "bg-green-50" : n.jenis === "pesan" ? "bg-blue-50" : "bg-yellow-50"
                    }`}>
                      {n.jenis === "laporan" ? <FileText size={14} className="text-green-600" /> :
                       n.jenis === "pesan" ? <Bell size={14} className="text-blue-600" /> :
                       <ChevronRight size={14} className="text-yellow-600" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-gray-900">{n.judul}</span>
                        {!n.dibaca && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{n.isi}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{n.waktu}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 p-5 bg-gradient-to-br from-primary-pale to-white rounded-2xl border border-primary-pale text-center">
            <p className="text-sm text-gray-600 mb-3">Ingin tahu lebih lanjut tentang fitur CDPS?</p>
            <a
              href="/demo"
              className="inline-flex items-center gap-1 bg-primary hover:bg-primary-light text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
            >
              Lihat Demo Lengkap
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
