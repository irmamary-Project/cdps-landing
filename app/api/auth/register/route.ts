import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sekolah, nama, email, password } = await req.json();

    if (!sekolah || !nama || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Create school
    const { data: school, error: schoolError } = await supabase
      .from("schools")
      .insert({ name: sekolah })
      .select("id")
      .single();

    if (schoolError) {
      return NextResponse.json({ error: "Gagal membuat sekolah" }, { status: 500 });
    }

    // 2. Create auth user with metadata
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
      // Rollback: delete school if user creation fails
      await supabase.from("schools").delete().eq("id", school.id);
      const message = signUpError.message === "User already registered"
        ? "Email sudah terdaftar"
        : signUpError.message;
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
