import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  try {
    const { name, address, phone } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Nama sekolah wajib diisi" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const sbCookie = cookieStore.get("sb");
    if (!sbCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let sessionData: { access_token: string; refresh_token?: string };
    try { sessionData = JSON.parse(sbCookie.value); } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
    await supabase.auth.setSession({ access_token: sessionData.access_token, refresh_token: sessionData.refresh_token ?? "" });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const { data: school, error: schoolError } = await admin
      .from("schools")
      .insert({ name, address, phone })
      .select()
      .single();

    if (schoolError || !school) {
      return NextResponse.json({ error: schoolError?.message || "Gagal membuat sekolah" }, { status: 500 });
    }

    const { error: profileError } = await admin
      .from("profiles")
      .upsert({
        id: user.id,
        school_id: school.id,
        nama: user.user_metadata?.nama ?? user.email ?? "",
        email: user.email ?? "",
        role: user.user_metadata?.role ?? "admin",
        is_active: true,
      }, { onConflict: "id" });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
