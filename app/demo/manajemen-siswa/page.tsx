"use client";

import { useState } from "react";
import { DEMO_STUDENTS_FULL, DEMO_CLASSES } from "../lib/data";
import { Search, Plus, Filter } from "lucide-react";

export default function ManajemenSiswaPage() {
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = DEMO_STUDENTS_FULL.filter((s) => {
    if (search && !s.nama.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterKelas && s.kelas !== filterKelas) return false;
    if (filterStatus && s.status !== filterStatus) return false;
    return true;
  });

  const aktif = DEMO_STUDENTS_FULL.filter((s) => s.status === "Aktif").length;
  const alumni = DEMO_STUDENTS_FULL.filter((s) => s.status === "Alumni").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen Siswa</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola data siswa dan orang tua</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{DEMO_STUDENTS_FULL.length}</div>
          <div className="text-xs text-gray-400 mt-1">Total Siswa</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{aktif}</div>
          <div className="text-xs text-gray-400 mt-1">Aktif</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-400">{alumni}</div>
          <div className="text-xs text-gray-400 mt-1">Alumni</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari siswa..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6741D9]/20 focus:border-[#6741D9]"
            />
          </div>
          <div className="flex gap-2">
            <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
              <option value="">Semua Kelas</option>
              {[...new Set(DEMO_STUDENTS_FULL.map((s) => s.kelas))].map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Alumni">Alumni</option>
            </select>
            <button className="inline-flex items-center gap-1.5 bg-[#6741D9] text-white text-sm font-bold px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
              <Plus size={16} /> Tambah
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-600">Nama</th>
                <th className="px-5 py-3 font-semibold text-gray-600">Kelas</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Orang Tua</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">No. WA</th>
                <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6741D9] to-[#7C5CF7] flex items-center justify-center text-white font-bold text-xs">{s.nama[0]}</div>
                      <span className="font-semibold text-gray-900">{s.nama}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{s.kelas}</td>
                  <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{s.ortu}</td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{s.wa}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
