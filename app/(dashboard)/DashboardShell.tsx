"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import {
  LayoutDashboard, ClipboardList, FolderOpen, BarChart3, Users,
  MapPin, Bell, Eye, Settings, LogOut, Menu, X, Activity,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/daily-report", label: "Daily Report", icon: ClipboardList },
  { href: "/dashboard/portofolio", label: "Portofolio", icon: FolderOpen },
  { href: "/dashboard/laporan", label: "Perkembangan", icon: BarChart3 },
  { href: "/dashboard/manajemen", label: "Manajemen", icon: Users },
  { href: "/dashboard/monitoring", label: "Monitoring", icon: MapPin },
  { href: "/dashboard/notifikasi", label: "Notifikasi", icon: Bell },
  // { href: "/dashboard/ortu", label: "Portal Orang Tua", icon: Eye },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Settings },
];

export default function DashboardShell({
  profile,
  children,
}: {
  profile: { id: string; nama: string; role: string; email?: string; schools: { name: string } | null };  // schools is null during onboarding (should not appear after redirect but keep safe)
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const { createClient } = await import("@/utils/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-100 transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Logo size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary-pale text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-white">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
              {profile.nama.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-900 truncate">{profile.nama}</div>
              <div className="text-xs text-gray-400 capitalize">{profile.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between px-4 sm:px-6 h-14">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu size={20} />
            </button>
            <div className="text-sm text-gray-400 ml-auto">
              {profile.schools?.name ?? ""}
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
