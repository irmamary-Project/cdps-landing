"use client";

import { DEMO_SCHOOL } from "../lib/data";
import { Building2, MapPin, Phone, Mail, Camera } from "lucide-react";

export default function SettingsPage() {
  const s = DEMO_SCHOOL;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 text-sm mt-1">Profil dan konfigurasi sekolah</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-primary-pale flex items-center justify-center flex-shrink-0">
              <Building2 size={28} className="text-primary" />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center cursor-not-allowed opacity-60" disabled aria-label="Upload logo">
                <Camera size={12} className="text-gray-400" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{s.name}</h2>
              <p className="text-xs text-gray-400">Logo sekolah · Klik untuk mengganti (tersedia di versi lengkap)</p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Sekolah</label>
            <input
              defaultValue={s.name}
              disabled
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat</label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-3 text-gray-300" />
              <input
                defaultValue={s.address}
                disabled
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telepon</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-3 text-gray-300" />
                <input
                  defaultValue={s.phone}
                  disabled
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-3 text-gray-300" />
                <input
                  defaultValue="admin@tkpelita.sch.id"
                  disabled
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tahun Ajaran Aktif</label>
            <select disabled className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed">
              <option>2026/2027</option>
            </select>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Fitur pengubahan profil akan tersedia di versi lengkap</span>
          <button
            disabled
            className="bg-gray-300 text-gray-500 text-sm font-bold px-6 py-2.5 rounded-full cursor-not-allowed"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
