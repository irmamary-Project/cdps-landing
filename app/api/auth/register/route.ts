import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("[register] started");
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("[register] missing env vars");
      return NextResponse.json({ error: "Konfigurasi database belum lengkap." }, { status: 500 });
    }

    const { sekolah, nama, email, password } = await req.json();
    console.log("[register] received", { sekolah, nama, email });

    if (!sekolah || !nama || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Create school (RLS sudah dimatikan via SQL)
    console.log("[register] creating school");
    const { data: school, error: schoolError } = await supabase
      .from("schools")
      .insert({ name: sekolah })
      .select("id")
      .single();

    if (schoolError) {
      console.log("[register] school error:", schoolError);
      return NextResponse.json({ error: `Gagal membuat sekolah: ${schoolError.message}` }, { status: 500 });
    }
    console.log("[register] school created:", school.id);

    // 2. Create auth user
    console.log("[register] signing up user");
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          school_id: school.id,
          role: "admin",
          nama,
        },
      },
    });

    if (signUpError) {
      console.log("[register] signup error:", signUpError);
      await supabase.from("schools").delete().eq("id", school.id);
      const message = signUpError.message === "User already registered"
        ? "Email sudah terdaftar"
        : signUpError.message;
      return NextResponse.json({ error: message }, { status: 400 });
    }

    console.log("[register] success");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("[register] catch:", err);
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
