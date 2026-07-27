"use client";

import { DEMO_DAILY_REPORTS, DEMO_STUDENTS, MOOD_OPTIONS } from "../lib/data";
import { useState } from "react";

const moodEmoji: Record<string, string> = {};
MOOD_OPTIONS.forEach((m) => { moodEmoji[m.value] = m.emoji; });

export default function DailyReportPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedSiswa, setSelectedSiswa] = useState("");

  const filtered = DEMO_DAILY_REPORTS.filter((r) => {
    if (selectedSiswa && r.siswa.id !== selectedSiswa) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Report</h1>
          <p className="text-gray-500 text-sm mt-1">Laporan harian siswa TK Pelita Harapan</p>
        </div>
        <select
          value={selectedSiswa}
          onChange={(e) => setSelectedSiswa(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-4 py-2 text-gray-600 bg-white self-start"
        >
          <option value="">Semua Siswa</option>
          {DEMO_STUDENTS.map((s) => (
            <option key={s.id} value={s.id}>{s.nama}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">
          Tidak ada laporan untuk filter ini
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => {
            const isOpen = expanded === r.id;
            return (
              <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : r.id)}
                  className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6741D9] to-[#7C5CF7] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {r.siswa.nama.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-gray-900">{r.siswa.nama}</div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {r.tanggal} · {r.sesi}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          r.kehadiran === "Hadir" ? "bg-green-50 text-green-600" : r.kehadiran === "Izin" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                        }`}>{r.kehadiran}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
                    <span className="text-lg">{moodEmoji[r.mood_datang]}</span>
                    <span className="text-[11px] text-gray-400">{r.status}</span>
                    <span className="text-xs text-gray-300">{isOpen ? "▲" : "▼"}</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 border-t border-gray-50">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                      <div className="col-span-full">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Kesehatan & Fisik</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                          <DataBadge label="Suhu" value={`${r.suhu_tubuh}°C`} />
                          <DataBadge label="Kondisi" value={r.kondisi_kesehatan} />
                          <DataBadge label="Bak" value={`${r.bak_kali}x`} />
                          <DataBadge label="BAB" value={r.bab} />
                          <DataBadge label="Tidur" value={r.tidur_siang} />
                          <DataBadge label="Durasi" value={r.durasi_tidur} />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Makan & Minum</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <DataBadge label="Sarapan" value={r.sarapan} />
                          <DataBadge label="Snack Pagi" value={r.snack_pagi} />
                          <DataBadge label="Makan Siang" value={r.makan_siang} />
                          <DataBadge label="Snack Sore" value={r.snack_sore} />
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="text-gray-400">Minum: </span>
                          <span className="font-semibold">{r.minum_gelas} gelas</span>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Observasi</h4>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {r.ibadah_checklist.map((item) => (
                            <span key={item} className="text-[11px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">✓ {item}</span>
                          ))}
                        </div>
                        <div className="text-xs space-y-2">
                          <div>
                            <span className="text-gray-400">Observasi Guru:</span>
                            <p className="text-gray-700 mt-0.5">{r.observasi_guru}</p>
                          </div>
                          {r.catatan_ortu && (
                            <div>
                              <span className="text-gray-400">Catatan Orang Tua:</span>
                              <p className="text-gray-700 mt-0.5">{r.catatan_ortu}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DataBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <div className="text-gray-400 mb-0.5">{label}</div>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );
}
