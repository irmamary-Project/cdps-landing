import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function GET(req: Request) {
  try {
    const { supabase, schoolId } = await getDashboardAuth();
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("siswa_id");
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = supabase.from("daily_reports").select("*, students!inner(nama, nis)").eq("school_id", schoolId).order("tanggal", { ascending: false }).limit(limit);
    if (studentId) query = query.eq("student_id", studentId);
    if (from) query = query.gte("tanggal", from);
    if (to) query = query.lte("tanggal", to);

    const { data } = await query;
    return NextResponse.json(data ?? []);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function POST(req: Request) {
  try {
    const { schoolId, user } = await getDashboardAuth();
    const body = await req.json();
    if (!body.student_id || !body.tanggal) return NextResponse.json({ error: "Siswa dan tanggal wajib" }, { status: 400 });

    const admin = createAdminClient();
    const { data, error } = await admin.from("daily_reports").insert({
      school_id: schoolId,
      ...body,
      created_by: user.id,
    }).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
