"use client";

import { useState } from "react";
import { DEMO_STUDENTS, DEMO_GROWTH_RECORDS } from "../lib/data";
import StudentAvatar from "@/components/StudentAvatar";

function calcBMI(bb: number, tb: number) {
  const tm = tb / 100;
  return +(bb / (tm * tm)).toFixed(1);
}

function bmiLabel(bmi: number) {
  if (bmi < 14) return { label: "Kurus", color: "text-yellow-600" };
  if (bmi <= 16.5) return { label: "Normal", color: "text-green-600" };
  if (bmi <= 18.5) return { label: "Overweight", color: "text-orange-600" };
  return { label: "Obesitas", color: "text-red-600" };
}

function LineChart({ records, valueKey, color, maxVal }: { records: Array<{ bulan: string; bb: number; tb: number }>; valueKey: "bb" | "tb" | "bmi"; color: string; maxVal: number }) {
  const w = 300;
  const h = 160;
  const pad = { top: 16, right: 16, bottom: 28, left: 0 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const n = records.length;

  const points = records.map((r, i) => {
    const val = valueKey === "bmi" ? calcBMI(r.bb, r.tb) : r[valueKey];
    return {
      x: pad.left + (i / (n - 1 || 1)) * innerW,
      y: pad.top + innerH - ((val - 0) / maxVal) * innerH,
      val,
      label: r.bulan,
    };
  });

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const stroke = color === "primary" ? "#6741D9" : color === "secondary" ? "#04B5BB" : "#FBD321";
  const fill = color === "primary" ? "#EDE9FE" : color === "secondary" ? "#E6F9FA" : "#FEF9E7";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full mt-2" preserveAspectRatio="xMidYMid meet">
      {points.map((p, i) => (
        <line key={i} x1={p.x} y1={pad.top} x2={p.x} y2={h - pad.bottom} stroke="#f0f0f0" strokeWidth="1" />
      ))}
      <polyline points={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={stroke} strokeWidth="2" />
          <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill="#666">
            {p.val}
          </text>
          <text x={p.x} y={h - 4} textAnchor="middle" fontSize="9" fill="#999">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function whoConclusion(records: Array<{ bb: number; tb: number }>, bmi: number) {
  if (records.length < 2) return null;
  const last = records[records.length - 1];
  const prev = records[records.length - 2];
  const deltaBb = last.bb - prev.bb;
  const deltaTb = last.tb - prev.tb;

  const bbNormal = deltaBb >= 0.3 && deltaBb <= 0.8;
  const tbNormal = deltaTb >= 1.5 && deltaTb <= 3.5;
  const bmiInfo = bmiLabel(bmi);
  const bmiNormal = bmiInfo.label === "Normal";

  const parts: string[] = [];
  if (bbNormal) parts.push("BB/U: Normal");
  else parts.push("BB/U: Perhatian — kenaikan berat badan rendah");
  if (tbNormal) parts.push("TB/U: Normal");
  else parts.push("TB/U: Perhatian — pertumbuhan tinggi badan melambat");
  parts.push(`IMT/U: ${bmiInfo.label}`);

  const allNormal = bbNormal && tbNormal && bmiNormal;
  const text = parts.join(". ") + ". " + (allNormal
    ? "Anak berada dalam rentang pertumbuhan normal menurut standar WHO."
    : "Disarankan konsultasi dengan tenaga kesehatan untuk evaluasi lebih lanjut.");

  const statusVal: "normal" | "warning" = allNormal ? "normal" : "warning";
  return { status: statusVal, text, color: allNormal ? "bg-green-50 border-green-200 text-green-700" : "bg-yellow-50 border-yellow-200 text-yellow-700" };
}

export default function TrackingFisikPage() {
  const [selectedSiswa, setSelectedSiswa] = useState("s1");
  const records = DEMO_GROWTH_RECORDS[selectedSiswa] || [];
  const siswa = DEMO_STUDENTS.find((s) => s.id === selectedSiswa);

  const maxBb = Math.max(...records.map((r) => r.bb), 10);
  const maxTb = Math.max(...records.map((r) => r.tb), 80);
  const maxBmi = Math.max(...records.map((r) => calcBMI(r.bb, r.tb)), 20);
  const latestBmi = records.length > 0 ? calcBMI(records[records.length - 1].bb, records[records.length - 1].tb) : 0;
  const conclusion = whoConclusion(records, latestBmi);

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

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Berat Badan (kg)</h3>
          <LineChart records={records} valueKey="bb" color="secondary" maxVal={maxBb} />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-1">Tinggi Badan (cm)</h3>
          <LineChart records={records} valueKey="tb" color="primary" maxVal={maxTb} />
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-1">BMI ({latestBmi})</h3>
          <LineChart records={records} valueKey="bmi" color="accent" maxVal={maxBmi} />
          {records.length > 0 && (() => {
            const info = bmiLabel(latestBmi);
            return <p className={`text-xs font-semibold mt-2 text-center ${info.color}`}>{info.label}</p>;
          })()}
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
                <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">IMT</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Status IMT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {records.map((r, i) => {
                const bmi = calcBMI(r.bb, r.tb);
                const info = bmiLabel(bmi);
                return (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3 font-semibold text-gray-900">{r.bulan}</td>
                    <td className="px-5 py-3 text-gray-600">{r.bb}</td>
                    <td className="px-5 py-3 text-gray-600">{r.tb}</td>
                    <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{bmi}</td>
                    <td className="px-5 py-3 hidden sm:table-cell"><span className={`text-xs font-semibold ${info.color}`}>{info.label}</span></td>
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
