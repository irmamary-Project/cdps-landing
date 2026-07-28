import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function GET() {
  try {
    const { supabase, schoolId } = await getDashboardAuth();
    const { data } = await supabase.from("students").select("*, classes(nama)").eq("school_id", schoolId).order("nama");
    return NextResponse.json(data ?? []);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function POST(req: Request) {
  try {
    const { schoolId, user } = await getDashboardAuth();
    const body = await req.json();
    if (!body.nama) return NextResponse.json({ error: "Nama siswa wajib diisi" }, { status: 400 });

    const admin = createAdminClient();
    const { data, error } = await admin.from("students").insert({ school_id: schoolId, ...body, created_at: new Date().toISOString() }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
