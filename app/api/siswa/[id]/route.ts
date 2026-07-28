import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getDashboardAuth();
    const { id } = await params;
    const body = await req.json();
    const admin = createAdminClient();
    const { error } = await admin.from("students").update(body).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await getDashboardAuth();
    const { id } = await params;
    const admin = createAdminClient();
    const { error } = await admin.from("students").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
