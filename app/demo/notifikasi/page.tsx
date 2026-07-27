"use client";

import { useState } from "react";
import { DEMO_NOTIFICATIONS } from "../lib/data";
import { Bell, MessageSquare, Info, CheckCheck } from "lucide-react";

const JENIS_ICON: Record<string, typeof Bell> = {
  laporan: Bell,
  pesan: MessageSquare,
  sistem: Info,
};

const JENIS_WARNA: Record<string, string> = {
  laporan: "bg-primary-pale text-primary",
  pesan: "bg-[#FEF9E7] text-accent",
  sistem: "bg-[#E6F9FA] text-secondary",
};

export default function NotifikasiPage() {
  const [filter, setFilter] = useState("");
  const [role, setRole] = useState<"guru" | "ortu" | "admin">("guru");

  const filtered = DEMO_NOTIFICATIONS.filter((n) => {
    if (filter && n.jenis !== filter) return false;
    if (n.role !== role) return false;
    return true;
  });

  const unread = filtered.filter((n) => !n.dibaca).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifikasi</h1>
          <p className="text-gray-500 text-sm mt-1">{unread} notifikasi belum dibaca</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["guru", "ortu", "admin"] as const).map((r) => (
          <button key={r} onClick={() => setRole(r)} className={`text-sm font-bold px-4 py-2 rounded-full transition-all ${role === r ? "bg-primary text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-primary"}`}>
            {r === "guru" ? "Sebagai Guru" : r === "ortu" ? "Sebagai Orang Tua" : "Sebagai Admin"}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {["", "laporan", "pesan", "sistem"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`text-xs font-medium px-3 py-1.5 rounded-full ${filter === f ? "bg-gray-900 text-white" : "bg-white text-gray-500 border border-gray-200"}`}>
            {f || "Semua"}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((n) => {
          const Icon = JENIS_ICON[n.jenis] || Bell;
          return (
            <div key={n.id} className={`bg-white rounded-xl border ${n.dibaca ? "border-gray-100" : "border-primary/20"} shadow-sm p-4 sm:p-5`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${JENIS_WARNA[n.jenis]}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-gray-900">{n.judul}</h3>
                    {!n.dibaca && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{n.isi}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-gray-400">{n.waktu}</span>
                    {n.dibaca && <CheckCheck size={12} className="text-gray-300" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
