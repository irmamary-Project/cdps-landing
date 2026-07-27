"use client";

import Logo from "@/components/Logo";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14"
      style={{ background: "#6741D9", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      <Logo variant="vertical" size="sm" />
      <button
        onClick={onMenuClick}
        className="text-white/70 hover:text-white p-2"
        aria-label="Buka menu"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  );
}
