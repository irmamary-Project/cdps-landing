import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, password } = body;

    if (!nama || !email || !password) {
      return NextResponse.json({ error: "Nama, email, dan password wajib diisi" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ config: "env vars tidak ditemukan" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    let signUpResult;
    try {
      signUpResult = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nama, role: "admin" } },
      });
    } catch (signUpCatchErr) {
      return NextResponse.json({
        phase: "signUp threw",
        name: signUpCatchErr instanceof Error ? signUpCatchErr.name : typeof signUpCatchErr,
        message: signUpCatchErr instanceof Error ? signUpCatchErr.message : String(signUpCatchErr),
      }, { status: 500 });
    }

    if (signUpResult.error) {
      return NextResponse.json({
        phase: "signUp returned error",
        message: signUpResult.error.message,
        code: signUpResult.error.code,
        statusCode: signUpResult.error.status,
        name: signUpResult.error.name,
        supabaseUrl: supabaseUrl,
        anonKeyPrefix: supabaseKey.substring(0, 20) + "...",
      }, { status: 400 });
    }

    return NextResponse.json({
      phase: "success",
      userId: signUpResult.data?.user?.id,
    });
  } catch (err) {
    return NextResponse.json({
      phase: "outer catch",
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
