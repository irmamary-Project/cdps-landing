"use client";

import { useState } from "react";
import StudentAvatar from "@/components/StudentAvatar";
import { DEMO_STUDENTS_FULL, DEMO_CLASSES, DEMO_TEACHERS } from "../lib/data";
import { Search, Plus, Users, UserCheck, Calendar, Settings } from "lucide-react";

function ManajemenSiswaSection() {
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
    <div className="max-w-6xl mx-auto">
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
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
            <button className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
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
                      <StudentAvatar name={s.nama} size="sm" />
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

function ManajemenKelasSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {DEMO_CLASSES.map((cls) => (
          <div key={cls.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{cls.nama}</h2>
                <span className="text-xs font-bold bg-primary-pale text-primary px-3 py-1 rounded-full">{cls.usia}</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-primary" />
                  <span className="text-gray-600"><strong className="text-gray-900">{cls.siswa}</strong> siswa</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <UserCheck size={16} className="text-accent" />
                  <span className="text-gray-600">Wali: <strong className="text-gray-900">{cls.wali}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-secondary" />
                  <span className="text-gray-600">{cls.tahun}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cls.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{cls.status}</span>
                  <button className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold opacity-50 cursor-not-allowed">
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

function ManajemenGuruSection() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = DEMO_TEACHERS.filter((t) => {
    if (search && !t.nama.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterRole && t.role !== filterRole) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    return true;
  });

  const roles = [...new Set(DEMO_TEACHERS.map((t) => t.role))];
  const aktif = DEMO_TEACHERS.filter((t) => t.status === "Aktif").length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{DEMO_TEACHERS.length}</div>
          <div className="text-xs text-gray-400 mt-1">Total Guru</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{aktif}</div>
          <div className="text-xs text-gray-400 mt-1">Aktif</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-400">{DEMO_TEACHERS.length - aktif}</div>
          <div className="text-xs text-gray-400 mt-1">Nonaktif / Izin</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari guru..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
              <option value="">Semua Role</option>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Izin">Izin</option>
            </select>
            <button className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
              <Plus size={16} /> Tambah
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-5 py-3 font-semibold text-gray-600">Nama</th>
                <th className="px-5 py-3 font-semibold text-gray-600">Role</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Email</th>
                <th className="px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">No. WA</th>
                <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {t.nama.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-semibold text-gray-900">{t.nama}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{t.role}</td>
                  <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{t.email}</td>
                  <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{t.wa}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${t.status === "Aktif" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>{t.status}</span>
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

const TABS = [
  { key: "siswa", label: "Siswa" },
  { key: "kelas", label: "Kelas" },
  { key: "guru", label: "Guru" },
];

export default function ManajemenPage() {
  const [tab, setTab] = useState("siswa");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data siswa, kelas, dan guru</p>
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

      {tab === "siswa" && <ManajemenSiswaSection />}
      {tab === "kelas" && <ManajemenKelasSection />}
      {tab === "guru" && <ManajemenGuruSection />}
    </div>
  );
}
