import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Konfigurasi database belum lengkap. Hubungi admin." }, { status: 500 });
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Konfigurasi service role belum lengkap." }, { status: 500 });
    }

    const { sekolah, nama, email, password } = await req.json();

    if (!sekolah || !nama || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }

    const admin = createAdminClient();

    // 1. Create school (admin client bypasses RLS)
    const { data: school, error: schoolError } = await admin
      .from("schools")
      .insert({ name: sekolah })
      .select("id")
      .single();

    if (schoolError) {
      return NextResponse.json({ error: `Gagal membuat sekolah: ${schoolError.message}` }, { status: 500 });
    }

    // 2. Create auth user with metadata
    const auth = await createClient();
    const { error: signUpError } = await auth.auth.signUp({
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
      await admin.from("schools").delete().eq("id", school.id);
      const message = signUpError.message === "User already registered"
        ? "Email sudah terdaftar"
        : signUpError.message;
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: `Terjadi kesalahan server: ${err instanceof Error ? err.message : "unknown"}` }, { status: 500 });
  }
}
