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

    // Call GoTrue API directly to see actual HTTP response
    const gotrueUrl = `${supabaseUrl}/auth/v1/signup`;
    const gotrueBody = JSON.stringify({
      email,
      password,
      data: { nama, role: "admin" },
    });

    let fetchResp;
    try {
      fetchResp = await fetch(gotrueUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
        },
        body: gotrueBody,
      });
    } catch (fetchErr) {
      return NextResponse.json({
        phase: "fetch threw",
        message: fetchErr instanceof Error ? fetchErr.message : String(fetchErr),
      }, { status: 500 });
    }

    const responseText = await fetchResp.text();
    return NextResponse.json({
      phase: "direct fetch",
      status: fetchResp.status,
      body: responseText,
      supabaseUrl,
    });
  } catch (err) {
    return NextResponse.json({
      phase: "outer catch",
      name: err instanceof Error ? err.name : typeof err,
      message: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
