import {
  FileText,
  FolderOpen,
  ClipboardList,
  Camera,
  UserCheck,
  Bell,
  Building2,
  GraduationCap,
  Users,
  ArrowRight,
  Star,
  BarChart3,
  ClipboardCheck,
  Upload,
  Smartphone,
  Waves,
  Mail,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "daily-report": FileText,
  "portofolio": FolderOpen,
  "laporan": ClipboardList,
  "cctv": Camera,
  "absensi": UserCheck,
  "notifikasi": Bell,
  "sekolah": Building2,
  "guru": GraduationCap,
  "ortu": Users,
  "arrow-right": ArrowRight,
  "star": Star,
  "chart": BarChart3,
  "checklist": ClipboardCheck,
  "upload": Upload,
  "mobile": Smartphone,
  "wave": Waves,
  "mail": Mail,
  "play": PlayCircle,
};

function WhatsappIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M2 16l1.11-4.05A7 7 0 119 16H2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M6 7.5c0-.276.224-.5.5-.5h.5c.276 0 .5.224.5.5V8a2 2 0 002 2h.5c.276 0 .5.224.5.5v.5a.5.5 0 01-.5.5H9a3 3 0 01-3-3v-.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function FeatureIcon({
  name,
  className = "",
  size = 28,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  if (name === "whatsapp") {
    return (
      <div className={`inline-flex items-center justify-center rounded-2xl ${className}`}>
        <WhatsappIcon size={size} />
      </div>
    );
  }
  const LucideIcon = ICONS[name] || FileText;
  return (
    <div className={`inline-flex items-center justify-center rounded-2xl ${className}`}>
      <LucideIcon size={size} />
    </div>
  );
}

export function Icon({
  name,
  className = "",
  size = 20,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  if (name === "whatsapp") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <WhatsappIcon size={size} />
      </span>
    );
  }
  const LucideIcon = ICONS[name] || null;
  if (!LucideIcon) return null;
  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <LucideIcon size={size} />
    </span>
  );
}
