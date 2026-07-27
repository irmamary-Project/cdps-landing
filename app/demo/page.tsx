"use client";

import StudentAvatar from "@/components/StudentAvatar";
import { DEMO_STATS, DEMO_DAILY_REPORTS, DEMO_PORTOFOLIO, DEMO_STUDENTS } from "./lib/data";
import { useState } from "react";

export default function DashboardPage() {
  const [selectedSiswa, setSelectedSiswa] = useState("");

  const stats = [
    { label: "Total Siswa", value: DEMO_STATS.total_siswa, icon: "👶", color: "from-primary to-primary-light" },
    { label: "Total Guru", value: DEMO_STATS.total_guru, icon: "👩‍🏫", color: "from-primary-light to-secondary" },
    { label: "Laporan Bulan Ini", value: DEMO_STATS.laporan_bulan_ini, icon: "📋", color: "from-accent to-accent-dark" },
    { label: "Portofolio Bulan Ini", value: DEMO_STATS.portofolio_bulan_ini, icon: "📷", color: "from-green-500 to-emerald-600" },
  ];

  const filteredReports = DEMO_DAILY_REPORTS.filter((r) => {
    if (selectedSiswa && r.siswa.id !== selectedSiswa) return false;
    return true;
  }).slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Pantau perkembangan TK Pelita Harapan</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg sm:text-2xl">{s.icon}</span>
              <span className={`text-[10px] font-bold text-white bg-gradient-to-r ${s.color} px-2 py-0.5 rounded-full`}>
                &bull; Real-time
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-bold text-gray-900">Daily Report Terbaru</h2>
            <select
              value={selectedSiswa}
              onChange={(e) => setSelectedSiswa(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white"
            >
              <option value="">Semua Siswa</option>
              {DEMO_STUDENTS.map((s) => (
                <option key={s.id} value={s.id}>{s.nama}</option>
              ))}
            </select>
          </div>
          <div className="divide-y divide-gray-50">
            {filteredReports.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-400">
                Tidak ada laporan untuk siswa ini
              </div>
            ) : (
              filteredReports.map((r) => (
                <div key={r.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-gray-50/50">
                  <div className="flex items-center gap-3 min-w-0">
                    <StudentAvatar name={r.siswa.nama} size="xs" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate">{r.siswa.nama}</div>
                      <div className="text-xs text-gray-400">
                        {r.tanggal} · {r.sesi}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400">{r.mood_datang === "senang" ? "😊" : r.mood_datang === "biasa" ? "😐" : r.mood_datang === "sedih" ? "😢" : "😤"}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.kehadiran === "Hadir" ? "bg-green-50 text-green-600" : r.kehadiran === "Izin" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                    }`}>{r.kehadiran}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Portofolio Terbaru</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {DEMO_PORTOFOLIO.slice(0, 4).map((p) => (
              <div key={p.id} className="p-4 sm:p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={p.media[0].url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{p.siswa.nama}</div>
                  <div className="text-xs text-gray-400">{p.tanggal} · {p.media.length} foto</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
