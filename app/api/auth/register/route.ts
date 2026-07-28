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

    if (!serviceRoleKey) {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { nama, role: "admin" } },
      });
      if (error) {
        return NextResponse.json({
          error: error.message === "User already registered" ? "Email sudah terdaftar" : error.message,
        }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: "Cek email untuk konfirmasi" });
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { nama, role: "admin" },
    });

    if (error) {
      return NextResponse.json({
        error: error.message === "User already registered" ? "Email sudah terdaftar" : error.message,
      }, { status: 400 });
    }

    if (data?.user?.id) {
      const { error: profileError } = await admin
        .from("profiles")
        .upsert({
          id: data.user.id,
          nama,
          email,
          role: "admin",
          is_active: true,
        }, { onConflict: "id" });

      if (profileError) {
        console.error("Profile creation failed:", profileError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Terjadi kesalahan server",
    }, { status: 500 });
  }
}
