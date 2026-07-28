import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function GET() {
  try {
    const { supabase, schoolId } = await getDashboardAuth();
    const { data: school } = await supabase.from("schools").select("*").eq("id", schoolId).single();
    return NextResponse.json(school ?? { error: "not found" });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function PUT(req: Request) {
  try {
    const { supabase, schoolId } = await getDashboardAuth();
    const body = await req.json();
    const allowed = ["name", "address", "phone", "email"];
    const updates: Record<string, any> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "Tidak ada data yang diubah" }, { status: 400 });
    }
    const admin = createAdminClient();
    const { error } = await admin.from("schools").update(updates).eq("id", schoolId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
