import { ReactNode } from "react";

const ICONS: Record<string, ReactNode> = {
  "daily-report": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="2" width="22" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M9 10h10M9 15h10M9 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="7" r="5" fill="#FBD321" stroke="#6741D9" strokeWidth="1.5" />
    </svg>
  ),
  "portofolio": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="4" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="10" cy="13" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M2 18l6-4 4 3 4-3 6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="8" r="2" fill="#FBD321" />
    </svg>
  ),
  "laporan": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M6 8h16M6 14h12M6 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 12l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "cctv": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="11" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M20 12l6-4v8l-6-4z" fill="currentColor" />
      <circle cx="11" cy="12" r="1" fill="#FBD321" />
    </svg>
  ),
  "absensi": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 21l-3 3-2-2" stroke="#04B5BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "notifikasi": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3a7 7 0 00-7 7v3l-2 4h18l-2-4v-3a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M11 22a3 3 0 006 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="5" r="4" fill="#FBD321" stroke="#6741D9" strokeWidth="1.5" />
    </svg>
  ),
  "sekolah": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 28V12l12-8 12 8v16H4z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 28v-8h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 16h0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  "guru": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2L2 10v2l14 8 14-8v-2L16 2z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M2 18v6c0 3.314 6.268 6 14 6s14-2.686 14-6v-6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  "ortu": (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M22 12a6 6 0 01-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 10l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "arrow-right": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "star": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2l3.09 6.26L24 9.27l-5 4.87 1.18 6.88L14 17.77l-6.18 3.25L9 14.14l-5-4.87 6.91-1.01L14 2z" fill="currentColor" />
    </svg>
  ),
  "chart": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="13" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="10" y="9" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="17" y="5" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  "checklist": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 14l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "upload": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3v14M8 9l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18v4a2 2 0 002 2h16a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "mobile": (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5" y="2" width="18" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="14" cy="21" r="1.5" fill="currentColor" />
      <path d="M10 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "wave": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 8c0-2.5 1-4 4-4s4 1.5 4 4c0 2-1 3-1 5 0 1.5 1.5 2.5 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M3 10c0-3 2-5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 15c.5 1 2 1.5 3.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "mail": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "play": (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 6l6 4-6 4V6z" fill="currentColor" />
    </svg>
  ),
};

export default function FeatureIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div className={`inline-flex items-center justify-center rounded-2xl ${className}`}>
      {ICONS[name] || ICONS["daily-report"]}
    </div>
  );
}

export function Icon({ name, className = "", size = 20 }: { name: string; className?: string; size?: number }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {ICONS[name] || null}
    </span>
  );
}
