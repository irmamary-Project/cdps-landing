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

export default function FeatureIcon({
  name,
  className = "",
  size = 28,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
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
  const LucideIcon = ICONS[name] || null;
  if (!LucideIcon) return null;
  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <LucideIcon size={size} />
    </span>
  );
}
