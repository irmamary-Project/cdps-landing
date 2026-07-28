import { createAdminClient } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, address, phone } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Nama sekolah wajib diisi" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: school, error: schoolError } = await supabase
      .from("schools")
      .insert({ name, address, phone })
      .select()
      .single();

    if (schoolError || !school) {
      return NextResponse.json({ error: schoolError?.message || "Gagal membuat sekolah" }, { status: 500 });
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ school_id: school.id })
      .eq("id", user.id);

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
