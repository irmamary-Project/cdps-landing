import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardShell from "./DashboardShell";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sbCookie = cookieStore.get("sb");

  if (!sbCookie) redirect("/login");

  let sessionData: { access_token: string; refresh_token?: string; expires_at?: number };
  try { sessionData = JSON.parse(sbCookie.value); } catch { redirect("/login"); }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });

  await supabase.auth.setSession({
    access_token: sessionData.access_token,
    refresh_token: sessionData.refresh_token ?? "",
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, schools(name)")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");
  if (!profile.school_id) redirect("/onboarding");

  return (
    <DashboardShell profile={profile}>
      {children}
    </DashboardShell>
  );
}
