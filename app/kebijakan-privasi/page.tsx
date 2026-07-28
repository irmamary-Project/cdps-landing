import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi CDPS — bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.",
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Header>
        <Link href="/" aria-label="CDPS - Beranda">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-primary font-medium transition-colors">
            Blog
          </Link>
          <Link href="/kontak" className="text-sm font-bold bg-accent hover:bg-accent-dark text-primary px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-accent/30">
            Hubungi Kami
          </Link>
        </div>
      </Header>

      <main className="flex-1 pt-16">
        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
            <p className="text-sm text-gray-400 mb-10">Terakhir diperbarui: 28 Juli 2026</p>

            <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed space-y-8">
              <Section title="1. Pendahuluan">
                <p>
                  CDPS ("Child Development Portal System") adalah platform yang dikembangkan oleh{" "}
                  <strong>Lumizo</strong> untuk membantu sekolah, guru, dan orang tua memantau tumbuh
                  kembang anak usia dini. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan,
                  menggunakan, dan melindungi data pribadi Anda.
                </p>
              </Section>

              <Section title="2. Informasi yang Kami Kumpulkan">
                <p>Kami dapat mengumpulkan informasi berikut:</p>
                <ul>
                  <li><strong>Data Sekolah:</strong> nama sekolah, alamat, kontak.</li>
                  <li><strong>Data Guru & Staf:</strong> nama, email, nomor WhatsApp, role, dan data kehadiran.</li>
                  <li><strong>Data Siswa:</strong> nama, kelas, foto, data tumbuh kembang (berat badan, tinggi badan, BMI), daily report, dan portofolio digital.</li>
                  <li><strong>Data Orang Tua:</strong> nama, nomor WhatsApp, dan catatan komunikasi.</li>
                  <li><strong>Data Penggunaan:</strong> halaman yang dikunjungi, durasi, dan interaksi dengan fitur (melalui Google Analytics).</li>
                </ul>
              </Section>

              <Section title="3. Cara Kami Menggunakan Informasi">
                <p>Informasi yang kami kumpulkan digunakan untuk:</p>
                <ul>
                  <li>Menyediakan dan mengelola layanan daily report, portofolio digital, dan laporan perkembangan.</li>
                  <li>Memfasilitasi komunikasi antara guru dan orang tua.</li>
                  <li>Menyusun laporan triwulan dan pantau pertumbuhan fisik anak.</li>
                  <li>Meningkatkan kualitas layanan melalui analisis penggunaan.</li>
                  <li>Mengirim notifikasi terkait aktivitas anak di sekolah.</li>
                </ul>
              </Section>

              <Section title="4. Penyimpanan & Keamanan Data">
                <p>
                  Data Anda disimpan secara aman di server cloud milik pihak ketiga terpercaya (Vercel).
                  Kami menerapkan langkah-langkah keamanan teknis termasuk enkripsi data dalam transit
                  (HTTPS) dan akses terbatas berdasarkan peran pengguna.
                </p>
                <p>
                  Data CCTV bersifat live streaming dan tidak disimpan secara permanen di server kami.
                  Biaya pemasangan dan perangkat CCTV ditanggung oleh sekolah.
                </p>
              </Section>

              <Section title="5. Pengungkapan ke Pihak Ketiga">
                <p>Kami tidak menjual data pribadi Anda ke pihak ketiga. Kami dapat membagikan data jika:</p>
                <ul>
                  <li>Diperlukan untuk memenuhi kewajiban hukum.</li>
                  <li>Dengan persetujuan eksplisit dari Anda.</li>
                  <li>Kepada penyedia layanan yang membantu operasional kami (misal: hosting, analytics) dengan ikatan kerahasiaan.</li>
                </ul>
              </Section>

              <Section title="6. Hak Pengguna">
                <p>Anda memiliki hak untuk:</p>
                <ul>
                  <li>Mengakses data pribadi yang kami simpan.</li>
                  <li>Meminta koreksi data yang tidak akurat.</li>
                  <li>Meminta penghapusan data (dengan batasan tertentu sesuai regulasi).</li>
                  <li>Menarik persetujuan penggunaan data kapan saja.</li>
                </ul>
                <p>Untuk menggunakan hak-hak di atas, hubungi kami melalui kontak di bawah.</p>
              </Section>

              <Section title="7. Cookie & Pelacakan">
                <p>
                  Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna
                  dan menganalisis penggunaan platform. Google Analytics digunakan untuk memahami
                  interaksi pengguna secara agregat. Anda dapat mengatur preferensi cookie melalui
                  pengaturan browser Anda.
                </p>
              </Section>

              <Section title="8. Data CCTV">
                <p>
                  Fitur CCTV memungkinkan sekolah memantau aktivitas secara langsung. Akses terbatas
                  pada pengguna yang berwenang. Rekaman tidak disimpan secara permanen — hanya
                  streaming langsung. Biaya pemasangan, perangkat, dan bandwidth ditanggung oleh
                  sekolah dan tidak termasuk dalam biaya langganan.
                </p>
              </Section>

              <Section title="9. Perubahan Kebijakan">
                <p>
                  Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan signifikan
                  akan diberitahukan melalui email atau notifikasi di platform. Tanggal "Terakhir
                  diperbarui" di bagian atas menunjukkan kapan revisi terakhir dilakukan.
                </p>
              </Section>

              <Section title="10. Kontak">
                <p>Jika ada pertanyaan atau kekhawatiran tentang kebijakan privasi ini, hubungi:</p>
                <p className="mt-2">
                  Lumizo<br />
                  Email: <a href="mailto:cdps@lumizo.my.id" className="text-primary hover:underline">cdps@lumizo.my.id</a><br />
                  WhatsApp: <a href="https://wa.me/6289656059612" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">0896-5605-9612</a>
                </p>
              </Section>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
