"use client";

import { useState } from "react";
import { MapPin, Clock, CheckCircle2, XCircle, LogIn, LogOut } from "lucide-react";

const TEACHERS = [
  { id: "g1", nama: "Bu Rina", role: "Wali Kelas KB", checkIn: "07:15", checkOut: null, status: "hadir" as const, lat: -6.2088, lng: 106.8456 },
  { id: "g2", nama: "Bu Sari", role: "Wali Kelas TK A", checkIn: "07:20", checkOut: null, status: "hadir" as const, lat: -6.2090, lng: 106.8458 },
  { id: "g3", nama: "Pak Budi", role: "Wali Kelas TK B", checkIn: "06:55", checkOut: null, status: "hadir" as const, lat: -6.2086, lng: 106.8454 },
  { id: "g4", nama: "Bu Dewi", role: "Guru Pendamping", checkIn: "07:30", checkOut: null, status: "hadir" as const, lat: -6.2092, lng: 106.8460 },
  { id: "g5", nama: "Pak Agus", role: "Guru Olahraga", checkIn: "08:00", checkOut: null, status: "izin" as const, lat: -6.2095, lng: 106.8465 },
  { id: "g6", nama: "Bu Fitri", role: "Guru Seni", checkIn: "07:10", checkOut: "12:30", status: "pulang" as const, lat: -6.2084, lng: 106.8452 },
  { id: "g7", nama: "Bu Ani", role: "Staff Administrasi", checkIn: "07:05", checkOut: null, status: "hadir" as const, lat: -6.2087, lng: 106.8455 },
];

export default function AbsensiPage() {
  const [currentTime] = useState(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
  const hadir = TEACHERS.filter((t) => t.status === "hadir").length;
  const izin = TEACHERS.filter((t) => t.status === "izin").length;
  const total = TEACHERS.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Absensi Guru</h1>
          <p className="text-gray-500 text-sm mt-1">Check-in/out dengan geofence — real-time</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          <Clock size={14} />
          <span>{currentTime}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{hadir}</div>
              <div className="text-xs text-gray-400">Hadir</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
              <XCircle size={20} className="text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{izin}</div>
              <div className="text-xs text-gray-400">Izin / Tidak Hadir</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-pale flex items-center justify-center">
              <Clock size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{total}</div>
              <div className="text-xs text-gray-400">Total Guru</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Daftar Kehadiran Hari Ini</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {TEACHERS.map((t) => (
              <div key={t.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {t.nama.split(" ")[1]?.charAt(0) || t.nama.charAt(1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{t.nama}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {t.checkIn && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <LogIn size={12} className="text-green-500" />
                      <span>{t.checkIn}</span>
                    </div>
                  )}
                  {t.checkOut ? (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <LogOut size={12} className="text-orange-500" />
                      <span>{t.checkOut}</span>
                    </div>
                  ) : (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      t.status === "hadir" ? "bg-green-50 text-green-600" :
                      t.status === "izin" ? "bg-yellow-50 text-yellow-600" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {t.status === "hadir" ? "Di Sekolah" : t.status === "izin" ? "Izin" : "Pulang"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Peta Geofence</h2>
          </div>
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 m-4 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-56 h-56">
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-secondary/30 animate-spin-slow" />
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-secondary/20 animate-spin-slow" style={{ animationDirection: "reverse" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/30">
                    <MapPin size={18} className="text-white" />
                  </div>
                </div>
                {TEACHERS.filter((t) => t.status === "hadir").map((t, i) => {
                  const angle = (i / TEACHERS.filter((x) => x.status === "hadir").length) * 360;
                  const dist = 70 + Math.random() * 20;
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <div
                      key={t.id}
                      className="absolute w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"
                      style={{
                        left: `calc(50% + ${Math.cos(rad) * dist}px - 8px)`,
                        top: `calc(50% + ${Math.sin(rad) * dist}px - 8px)`,
                      }}
                      title={t.nama}
                    />
                  );
                })}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-medium whitespace-nowrap">
                  TK Pelita Harapan
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span>Guru di area</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span>Sekolah</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
