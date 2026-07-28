import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function GET() {
  try {
    const { supabase, schoolId } = await getDashboardAuth();
    const { data } = await supabase.from("classes").select("*").eq("school_id", schoolId).order("nama");
    return NextResponse.json(data ?? []);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function POST(req: Request) {
  try {
    const { schoolId } = await getDashboardAuth();
    const body = await req.json();
    if (!body.nama) return NextResponse.json({ error: "Nama kelas wajib diisi" }, { status: 400 });

    const admin = createAdminClient();
    const { data, error } = await admin.from("classes").insert({ school_id: schoolId, ...body }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function PUT(req: Request) {
  try {
    await getDashboardAuth();
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "ID kelas diperlukan" }, { status: 400 });
    const admin = createAdminClient();
    const { error } = await admin.from("classes").update(updates).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
