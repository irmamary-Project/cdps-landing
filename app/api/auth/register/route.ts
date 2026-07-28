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

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nama, role: "admin" } },
    });

    if (error) {
      return NextResponse.json({
        error: error.message === "User already registered" ? "Email sudah terdaftar" : error.message,
        name: error.name,
        status: error.status,
        code: error.code,
      }, { status: 400 });
    }

    if (serviceRoleKey && data.user) {
      const admin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { error: confirmErr } = await admin.auth.admin.updateUserById(data.user.id, {
        email_confirm: true,
      });
      if (confirmErr) {
        console.warn("Auto-confirm gagal:", confirmErr.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Terjadi kesalahan server",
    }, { status: 500 });
  }
}
