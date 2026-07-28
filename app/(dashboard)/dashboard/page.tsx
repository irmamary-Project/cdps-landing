import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sbCookie = cookieStore.get("sb");

  if (!sbCookie) redirect("/login");

  let sessionData: { access_token: string };
  try { sessionData = JSON.parse(sbCookie.value); } catch { redirect("/login"); }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${sessionData.access_token}` } },
    auth: { persistSession: false },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, schools(name)")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const { count: siswa } = await supabase
    .from("students")
    .select("*", { count: "exact", head: true })
    .eq("school_id", profile.school_id!);

  const { count: reports } = await supabase
    .from("daily_reports")
    .select("*", { count: "exact", head: true })
    .eq("school_id", profile.school_id!);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang, {profile.nama}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Siswa" value={siswa ?? 0} icon="👶" />
        <StatCard label="Laporan Bulan Ini" value={reports ?? 0} icon="📋" />
        <StatCard label="Paket" value="Gratis" icon="📦" />
        <StatCard label="Sekolah" value={profile.schools?.name ?? "-"} icon="🏫" />
      </div>

      {siswa === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-gray-400 text-sm mb-4">Belum ada data siswa. Mulai dengan menambahkan siswa pertama.</p>
          <a
            href="/dashboard/manajemen"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all"
          >
            Tambah Siswa
          </a>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <div className="text-xl mb-2">{icon}</div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
}
