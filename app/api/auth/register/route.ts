import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, password } = body;

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
      const message = error.message === "User already registered"
        ? "Email sudah terdaftar"
        : error.message;
      return NextResponse.json({
        error: message,
        errName: error.name,
        errStatus: error.status,
        errCode: error.code,
      }, { status: 400 });
    }

    // Auto-confirm user if service role key is available
    if (serviceRoleKey && data.user) {
      const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { error: confirmError } = await adminClient.auth.admin.updateUserById(data.user.id, {
        email_confirm: true,
      });
      if (confirmError) {
        return NextResponse.json({ warn: "User created but email confirmation failed", detail: confirmError.message }, { status: 200 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({
      phase: "outer catch",
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
