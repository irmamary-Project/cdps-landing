"use client";

import StudentAvatar from "@/components/StudentAvatar";
import { DEMO_SCHOOL, DEMO_LAPORAN, ASPEK_LIST, CAPAIAN_OPTIONS } from "../lib/data";
import { Printer } from "lucide-react";

const colorMap: Record<string, string> = {
  BSB: "bg-green-100 text-green-700",
  BSH: "bg-blue-100 text-blue-700",
  MB: "bg-yellow-100 text-yellow-700",
  BB: "bg-red-100 text-red-700",
};

export default function LaporanPage() {
  const l = DEMO_LAPORAN;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Laporan Triwulan</h1>
          <p className="text-gray-500 text-sm mt-1">Laporan perkembangan siswa per triwulan</p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all"
        >
          <Printer size={16} />
          Cetak PDF
        </button>
      </div>

      <div className="print-header hidden">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">{DEMO_SCHOOL.name}</h2>
          <p className="text-sm text-gray-500">{DEMO_SCHOOL.address}</p>
          <p className="text-sm text-gray-500">{DEMO_SCHOOL.phone}</p>
        </div>
        <hr className="mb-6" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden laporan-card">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <StudentAvatar name={l.siswa.nama} size="lg" />
            <div>
              <div className="text-lg font-bold text-gray-900">{l.siswa.nama}</div>
              <div className="text-sm text-gray-400">
                {l.siswa.kelas} · {l.periode} {l.tahun}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            Penilaian 8 Aspek Perkembangan
          </h3>
          <div className="space-y-3">
            {ASPEK_LIST.map((f) => {
              const entry = l.penilaian[f.key as keyof typeof l.penilaian];
              if (!entry) return null;
              return (
                <div key={f.key} className="flex items-start gap-4 py-3 border-b border-gray-50 last:border-b-0">
                  <div className="w-24 flex-shrink-0">
                    <div className="text-sm font-semibold text-gray-900">{f.label}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${colorMap[entry.capaian] || "bg-gray-100 text-gray-600"}`}>
                      {CAPAIAN_OPTIONS.find((c) => c.value === entry.capaian)?.label || entry.capaian}
                    </span>
                    <p className="text-xs text-gray-500 mt-1.5">{entry.catatan}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Catatan Umum</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{l.catatan_umum}</p>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Rekomendasi</h3>
            <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{l.rekomendasi}</p>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Status:{" "}
              <span className="font-semibold text-green-600">{l.status.toUpperCase()}</span>
            </span>
            <span className="text-xs text-gray-400">
              {DEMO_SCHOOL.name} · {l.siswa.nama} · {l.periode} {l.tahun}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
