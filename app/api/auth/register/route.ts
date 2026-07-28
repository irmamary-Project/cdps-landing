import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nama, email, password } = await req.json();

    if (!nama || !email || !password) {
      return NextResponse.json({ error: "Nama, email, dan password wajib diisi" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Konfigurasi database belum lengkap." }, { status: 500 });
    }

    // Gunakan fetch langsung ke GoTrue API
    const signUpRes = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
      },
      body: JSON.stringify({ email, password, data: { nama, role: "admin" } }),
    });

    if (!signUpRes.ok) {
      const body = await signUpRes.text();
      return NextResponse.json({ error: `GoTrue error: ${body}` }, { status: 400 });
    }

    const signUpData = await signUpRes.json();

    // Auto-confirm user
    if (serviceRoleKey && signUpData?.id) {
      const admin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      await admin.auth.admin.updateUserById(signUpData.id, {
        email_confirm: true,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Terjadi kesalahan server",
    }, { status: 500 });
  }
}
