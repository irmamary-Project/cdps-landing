"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/demo", label: "Dashboard", icon: "📊" },
  { href: "/demo/daily-report", label: "Daily Report", icon: "📋" },
  { href: "/demo/portofolio", label: "Portofolio", icon: "📷" },
  { href: "/demo/laporan", label: "Laporan Triwulan", icon: "📈" },
  { href: "#", label: "CCTV", icon: "📹", disabled: true },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Logo variant="vertical" size="sm" />
          <button
            className="lg:hidden text-white/50 hover:text-white p-1"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active = item.href !== "#" && pathname === item.href;
          return item.disabled ? (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed"
            >
              <span>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">Segera</span>
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            BA
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">Bpk. Ahmad</div>
            <div className="text-white/40 text-xs">Kepala Sekolah</div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      )}

      {/* Mobile drawer */}
      <aside
        className={clsx(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-64 flex flex-col transition-transform duration-300 bg-[#6741D9]",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {content}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col min-h-screen sticky top-0 bg-[#6741D9]">
        {content}
      </aside>
    </>
  );
}
