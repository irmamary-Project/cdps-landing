import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getDashboardAuth();
    const { id } = await params;
    const body = await req.json();
    const admin = createAdminClient();
    const { error } = await admin.from("daily_reports").update(body).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
