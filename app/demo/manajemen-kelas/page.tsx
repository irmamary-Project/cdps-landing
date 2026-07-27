"use client";

import { DEMO_CLASSES } from "../lib/data";
import { Users, UserCheck, Calendar, Settings } from "lucide-react";

export default function ManajemenKelasPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen Kelas</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola kelompok belajar dan wali kelas</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {DEMO_CLASSES.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{cls.nama}</h2>
                <span className="text-xs font-bold bg-[#EDE9FE] text-[#6741D9] px-3 py-1 rounded-full">{cls.usia}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-[#6741D9]" />
                  <span className="text-gray-600"><strong className="text-gray-900">{cls.siswa}</strong> siswa</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <UserCheck size={16} className="text-[#FBD321]" />
                  <span className="text-gray-600">Wali: <strong className="text-gray-900">{cls.wali}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-[#04B5BB]" />
                  <span className="text-gray-600">{cls.tahun}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cls.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{cls.status}</span>
                  <button className="inline-flex items-center gap-1.5 text-xs text-[#6741D9] font-semibold opacity-50 cursor-not-allowed">
                    <Settings size={14} /> Atur Kelas
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
