"use client";

import { useState } from "react";
import StudentAvatar from "@/components/StudentAvatar";
import { DEMO_HISTORY_REPORTS, DEMO_STUDENTS, MOOD_EMOJI_MAP } from "../lib/data";
import { Search, CalendarDays } from "lucide-react";

export default function RiwayatDailyReportPage() {
  const [siswa, setSiswa] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const filtered = DEMO_HISTORY_REPORTS.filter((r) => {
    if (siswa && r.siswa !== siswa) return false;
    if (tanggalAwal && r.tanggal < tanggalAwal) return false;
    if (tanggalAkhir && r.tanggal > tanggalAkhir) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, r) => {
    if (!acc[r.siswa]) acc[r.siswa] = [];
    acc[r.siswa].push(r);
    return acc;
  }, {});

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Riwayat Daily Report</h1>
        <p className="text-gray-500 text-sm mt-1">Historis laporan harian per siswa — untuk evaluasi guru dan admin</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Search size={16} className="text-gray-300" />
            <select value={siswa} onChange={(e) => setSiswa(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
              <option value="">Semua Siswa</option>
              {[...new Set(DEMO_HISTORY_REPORTS.map((r) => r.siswa))].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-gray-300" />
            <input type="date" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
            <span className="text-gray-300">–</span>
            <input type="date" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
          </div>
        </div>
      </div>

      {Object.entries(grouped).length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Tidak ada laporan untuk filter ini</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([nama, reports]) => (
            <div key={nama} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-bold text-gray-900">{nama}</h2>
                <p className="text-xs text-gray-400">{reports.length} laporan</p>
              </div>
              <div className="divide-y divide-gray-50">
                {reports.map((r) => (
                  <div key={r.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-gray-50/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <StudentAvatar name={r.siswa} size="xs" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">{r.tanggal}</span>
                          <span className="text-xs text-gray-400">· {r.sesi}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.observasi}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm">{MOOD_EMOJI_MAP[r.mood] || "–"}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.kehadiran === "Hadir" ? "bg-green-50 text-green-600" : r.kehadiran === "Izin" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"}`}>{r.kehadiran}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
