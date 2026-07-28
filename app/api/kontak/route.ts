import { NextResponse } from "next/server";

const WA_NUMBER = "6289656059612";
const ADMIN_EMAIL = "cdps@lumizo.my.id";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, email, sekolah, pesan } = body;

    if (!nama || !email || !pesan) {
      return NextResponse.json({ error: "Nama, email, dan pesan wajib diisi" }, { status: 400 });
    }

    const text = `*Pesan Baru dari CDPS*
Nama: ${nama}
Email: ${email}
Sekolah: ${sekolah || "-"}

Pesan:
${pesan}`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    return NextResponse.json({ success: true, waUrl });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan. Silakan coba lagi." }, { status: 500 });
  }
}
