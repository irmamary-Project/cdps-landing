"use client";

import { useState } from "react";
import StudentAvatar from "@/components/StudentAvatar";
import { DEMO_DAILY_REPORTS, DEMO_HISTORY_REPORTS, DEMO_STUDENTS, MOOD_EMOJI_MAP } from "../lib/data";
import { Search, CalendarDays } from "lucide-react";

function DataBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <div className="text-gray-400 mb-0.5">{label}</div>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );
}

function DailyReportSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedSiswa, setSelectedSiswa] = useState("");

  const filtered = DEMO_DAILY_REPORTS.filter((r) => {
    if (selectedSiswa && r.siswa.id !== selectedSiswa) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    <StudentAvatar name={r.siswa.nama} size="md" />
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
                    <span className="text-lg">{MOOD_EMOJI_MAP[r.mood_datang]}</span>
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

function RiwayatDailyReportSection() {
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
    <div className="max-w-6xl mx-auto">
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

const TABS = [
  { key: "daily", label: "Daily Report" },
  { key: "riwayat", label: "Riwayat" },
];

export default function DailyReportPage() {
  const [tab, setTab] = useState("daily");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Report</h1>
          <p className="text-gray-500 text-sm mt-1">Laporan harian siswa TK Pelita Harapan</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-sm font-bold px-4 py-2 rounded-lg transition-all ${tab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === "daily" && <DailyReportSection />}
      {tab === "riwayat" && <RiwayatDailyReportSection />}
    </div>
  );
}
