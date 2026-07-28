import { NextResponse } from "next/server";
import { getDashboardAuth, createAdminClient } from "@/utils/dashboard-auth";

export async function GET() {
  try {
    const { schoolId } = await getDashboardAuth();
    const admin = createAdminClient();
    const { data } = await admin.from("profiles").select("id, nama, email, role, is_active, phone").eq("school_id", schoolId).order("nama");
    return NextResponse.json(data ?? []);
  } catch { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }
}
