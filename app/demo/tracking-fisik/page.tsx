"use client";

import { useState } from "react";
import { DEMO_STUDENTS, DEMO_GROWTH_RECORDS } from "../lib/data";
import StudentAvatar from "@/components/StudentAvatar";

function whoConclusion(records: Array<{ bb: number; tb: number }>) {
  if (records.length < 2) return null;
  const last = records[records.length - 1];
  const prev = records[records.length - 2];
  const deltaBb = last.bb - prev.bb;
  const deltaTb = last.tb - prev.tb;

  const bbNormal = deltaBb >= 0.3 && deltaBb <= 0.8;
  const tbNormal = deltaTb >= 1.5 && deltaTb <= 3.5;

  if (bbNormal && tbNormal) {
    return { status: "normal" as const, text: "BB/U & TB/U: Normal — Anak berada dalam rentang pertumbuhan normal menurut standar WHO.", color: "bg-green-50 border-green-200 text-green-700" };
  }
  if (!bbNormal && deltaBb < 0.3) {
    return { status: "warning" as const, text: "BB/U: Perhatian — Kenaikan berat badan cenderung rendah. Disarankan konsultasi dengan ahli gizi untuk evaluasi asupan makanan.", color: "bg-yellow-50 border-yellow-200 text-yellow-700" };
  }
  return { status: "normal" as const, text: "TB/U: Normal — Pertumbuhan tinggi badan dalam rentang yang diharapkan menurut kurva WHO.", color: "bg-green-50 border-green-200 text-green-700" };
}

export default function TrackingFisikPage() {
  const [selectedSiswa, setSelectedSiswa] = useState("s1");
  const records = DEMO_GROWTH_RECORDS[selectedSiswa] || [];
  const siswa = DEMO_STUDENTS.find((s) => s.id === selectedSiswa);

  const maxBb = Math.max(...records.map((r) => r.bb), 10);
  const maxTb = Math.max(...records.map((r) => r.tb), 80);
  const conclusion = whoConclusion(records);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tracking Fisik</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau pertumbuhan berat & tinggi badan anak</p>
        </div>
        <select
          value={selectedSiswa}
          onChange={(e) => setSelectedSiswa(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white"
        >
          {DEMO_STUDENTS.map((s) => (
            <option key={s.id} value={s.id}>{s.nama}</option>
          ))}
        </select>
      </div>

      {siswa && (
        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
          <StudentAvatar name={siswa.nama} size="md" />
          <div>
            <div className="font-bold text-gray-900">{siswa.nama}</div>
            <div className="text-xs text-gray-400">{siswa.kelas} · {siswa.usia}</div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Berat Badan (kg)</h3>
          <div className="flex items-end gap-2 h-48 mt-4">
            {records.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 justify-end h-full">
                <span className="text-[10px] font-semibold text-gray-500">{r.bb}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-secondary to-secondary/60 transition-all"
                  style={{ height: `${(r.bb / maxBb) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400 mt-1 -rotate-45 origin-left whitespace-nowrap">{r.bulan}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Tinggi Badan (cm)</h3>
          <div className="flex items-end gap-2 h-48 mt-4">
            {records.map((r, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 justify-end h-full">
                <span className="text-[10px] font-semibold text-gray-500">{r.tb}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all"
                  style={{ height: `${(r.tb / maxTb) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400 mt-1 -rotate-45 origin-left whitespace-nowrap">{r.bulan}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Tabel Pertumbuhan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-600">Bulan</th>
                <th className="px-5 py-3 font-semibold text-gray-600">BB (kg)</th>
                <th className="px-5 py-3 font-semibold text-gray-600">TB (cm)</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Delta BB</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Delta TB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {records.map((r, i) => {
                const deltaBb = i > 0 ? (r.bb - records[i - 1].bb).toFixed(1) : "–";
                const deltaTb = i > 0 ? (r.tb - records[i - 1].tb).toFixed(1) : "–";
                return (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-semibold text-gray-900">{r.bulan}</td>
                    <td className="px-5 py-3 text-gray-600">{r.bb}</td>
                    <td className="px-5 py-3 text-gray-600">{r.tb}</td>
                    <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{deltaBb}</td>
                    <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{deltaTb}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {conclusion && (
        <div className={`p-5 rounded-xl border ${conclusion.color}`}>
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">
              {conclusion.status === "normal" ? "✅" : "⚠️"}
            </span>
            <div>
              <h4 className="font-bold text-sm mb-1">
                {conclusion.status === "normal" ? "Pertumbuhan Normal" : "Perlu Perhatian"}
              </h4>
              <p className="text-sm leading-relaxed">{conclusion.text}</p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 text-center">
        *Standar berdasarkan grafik pertumbuhan WHO untuk anak usia 3-5 tahun.
        Disarankan konsultasi rutin dengan dokter anak untuk pemantauan lebih lanjut.
      </p>
    </div>
  );
}
