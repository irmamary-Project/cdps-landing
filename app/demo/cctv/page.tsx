"use client";

import { useState } from "react";
import { Camera, Maximize2, Minimize2, RefreshCw } from "lucide-react";

const CAMERAS = [
  { id: "cam1", name: "Ruang Kelas A - TK A", status: "online", seed: "cam-a" },
  { id: "cam2", name: "Ruang Kelas B - TK B", status: "online", seed: "cam-b" },
  { id: "cam3", name: "Taman Bermain", status: "online", seed: "cam-play" },
  { id: "cam4", name: "Lobby Utama", status: "online", seed: "cam-lobby" },
  { id: "cam5", name: "Ruang Makan", status: "offline", seed: "cam-eat" },
  { id: "cam6", name: "Halaman Depan", status: "online", seed: "cam-yard" },
  { id: "cam7", name: "Ruang Guru", status: "online", seed: "cam-staff" },
  { id: "cam8", name: "Kantin", status: "maintenance", seed: "cam-cafe" },
];

export default function CCTVPage() {
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Live CCTV</h1>
          <p className="text-gray-500 text-sm mt-1">Pantau kegiatan sekolah secara langsung</p>
        </div>
        <button
          onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary border border-gray-200 hover:border-primary px-4 py-2 rounded-xl transition-all"
        >
          <RefreshCw size={14} />
          {layout === "grid" ? "Tampilan Grid" : "Tampilan Daftar"}
        </button>
      </div>

      <div className={`grid gap-4 ${fullscreen ? "grid-cols-1" : layout === "grid" ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
        {CAMERAS.map((cam) => {
          if (fullscreen && fullscreen !== cam.id) return null;
          const isOffline = cam.status === "offline" || cam.status === "maintenance";
          return (
            <div
              key={cam.id}
              className={`relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group ${fullscreen === cam.id ? "min-h-[70vh]" : "aspect-video"}`}
            >
              {isOffline ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 bg-gray-950">
                  <Camera size={40} className="mb-3 opacity-30" />
                  <span className="text-sm font-medium">
                    {cam.status === "maintenance" ? "Perawatan" : "Offline"}
                  </span>
                </div>
              ) : (
                <img
                  src={`https://picsum.photos/seed/${cam.seed}/640/360`}
                  alt={`Camera ${cam.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cam.status === "online" ? "bg-green-500 animate-pulse" : cam.status === "maintenance" ? "bg-yellow-500" : "bg-red-500"}`} />
                <span className="text-white/80 text-xs font-medium drop-shadow-sm">{cam.name}</span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/50 text-white/70 text-[10px] px-2 py-0.5 rounded font-mono">REC</span>
                <button
                  onClick={() => setFullscreen(fullscreen === cam.id ? null : cam.id)}
                  className="bg-black/50 text-white/70 hover:text-white p-1.5 rounded-lg transition-colors"
                  aria-label={fullscreen === cam.id ? "Keluar layar penuh" : "Layar penuh"}
                >
                  {fullscreen === cam.id ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>

              <div className="absolute bottom-3 left-3 text-white/50 text-[10px] font-mono">
                {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{CAMERAS.filter((c) => c.status === "online").length} Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>{CAMERAS.filter((c) => c.status === "offline").length} Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>{CAMERAS.filter((c) => c.status === "maintenance").length} Perawatan</span>
          </div>
          <span className="text-gray-300 mx-2 hidden sm:inline">|</span>
          <span className="text-xs text-gray-400">*Live CCTV tersedia di paket Pro & Enterprise (biaya pemasangan & alat dibayar terpisah)</span>
        </div>
      </div>
    </div>
  );
}
