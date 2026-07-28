import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const sbCookie = cookieStore.get("sb");

  let sessionData: any = null;
  let parsedOk = false;
  if (sbCookie) {
    try {
      sessionData = JSON.parse(sbCookie.value);
      parsedOk = true;
    } catch {
      sessionData = { error: "parse failed", raw: sbCookie.value.substring(0, 100) };
    }
  }

  let user: any = null;
  let getUserError: any = null;
  if (sessionData?.access_token) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });
      await supabase.auth.setSession({ access_token: sessionData.access_token, refresh_token: sessionData.refresh_token ?? "" });
      const { data, error } = await supabase.auth.getUser();
      user = data?.user ? { email: data.user.email, id: data.user.id } : null;
      getUserError = error?.message ?? null;
    } catch (e: any) {
      getUserError = e.message;
    }
  }

  return NextResponse.json({
    cookieNames: allCookies.map(c => c.name),
    hasSbCookie: !!sbCookie,
    sbValuePreview: sbCookie?.value.substring(0, 80) ?? null,
    parsedOk,
    user,
    getUserError,
  });
}
