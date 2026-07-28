import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan platform CDPS oleh Lumizo.",
};

export default function SyaratKetentuanPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Syarat & Ketentuan</h1>
            <p className="text-sm text-gray-400 mb-10">Terakhir diperbarui: 28 Juli 2026</p>

            <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed space-y-8">
              <Section title="1. Penerimaan Ketentuan">
                <p>
                  Dengan mengakses atau menggunakan platform CDPS ("Child Development Portal System")
                  yang dikembangkan oleh <strong>Lumizo</strong>, Anda menyatakan telah membaca,
                  memahami, dan menyetujui seluruh syarat dan ketentuan yang tercantum dalam dokumen ini.
                </p>
                <p>
                  Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, Anda tidak diizinkan
                  menggunakan platform CDPS.
                </p>
              </Section>

              <Section title="2. Definisi">
                <ul>
                  <li><strong>Platform:</strong> Aplikasi web CDPS yang diakses melalui cdps.lumizo.my.id.</li>
                  <li><strong>Lumizo:</strong> Pengembang dan penyedia platform CDPS.</li>
                  <li><strong>Sekolah:</strong> Lembaga pendidikan yang mendaftar dan menggunakan platform.</li>
                  <li><strong>Pengguna:</strong> Guru, staf sekolah, orang tua, atau pihak lain yang mengakses platform.</li>
                  <li><strong>Data Pribadi:</strong> Data sebagaimana didefinisikan dalam UU PDP No. 27/2022.</li>
                </ul>
              </Section>

              <Section title="3. Pendaftaran Akun">
                <ul>
                  <li>Pengguna wajib memberikan informasi yang benar, lengkap, dan akurat saat pendaftaran.</li>
                  <li>Setiap akun bersifat pribadi dan tidak dapat dialihkan kepada pihak lain.</li>
                  <li>Pengguna bertanggung jawab penuh atas keamanan kredensial akun masing-masing.</li>
                  <li>Lumizo berhak menolak pendaftaran atau menonaktifkan akun tanpa pemberitahuan jika ditemukan pelanggaran.</li>
                </ul>
              </Section>

              <Section title="4. Hak & Kewajiban Sekolah">
                <p>Sekolah yang mendaftar sebagai pengguna platform bertanggung jawab untuk:</p>
                <ul>
                  <li>Memastikan data siswa, guru, dan orang tua yang dimasukkan ke platform adalah benar dan sah.</li>
                  <li>Memperoleh persetujuan dari orang tua/wali sebelum memasukkan data anak ke platform.</li>
                  <li>Memberitahukan keberadaan kamera CCTV kepada seluruh pihak yang terpantau.</li>
                  <li>Menjaga kerahasiaan akses akun guru dan staf di lingkungan sekolah.</li>
                  <li>Tidak menyalahgunakan fitur platform untuk tujuan di luar pendidikan anak usia dini.</li>
                </ul>
              </Section>

              <Section title="5. Hak & Kewajiban Orang Tua">
                <ul>
                  <li>Orang tua berhak mengakses data laporan harian, portofolio, dan perkembangan anak.</li>
                  <li>Orang tua dapat memberikan catatan atau tanggapan pada laporan harian anak.</li>
                  <li>Orang tua wajib menjaga kerahasiaan akun akses portal orang tua.</li>
                </ul>
              </Section>

              <Section title="6. Layanan & Pembayaran">
                <ul>
                  <li>Paket <strong>Gratis</strong> dapat digunakan tanpa biaya dengan batas maksimal 5 siswa.</li>
                  <li>Paket <strong>Pro</strong> dikenakan biaya berlangganan Rp199.000/bulan dengan batas maksimal 50 siswa.</li>
                  <li>Paket <strong>Enterprise</strong> memiliki harga khusus sesuai kesepakatan.</li>
                  <li>Biaya langganan dibayarkan di awal setiap bulan dan tidak dapat dikembalikan (non-refundable) kecuali ada kesalahan dari pihak Lumizo.</li>
                  <li>Live CCTV: biaya pemasangan, perangkat, dan bandwidth ditanggung oleh sekolah dan tidak termasuk biaya langganan.</li>
                  <li>Lumizo berhak mengubah harga paket dengan pemberitahuan minimal 30 hari sebelumnya.</li>
                </ul>
              </Section>

              <Section title="7. Pembatasan Tanggung Jawab">
                <ul>
                  <li>Platform disediakan "apa adanya" (<em>as is</em>) tanpa jaminan tersirat mengenai ketersediaan atau keakuratan.</li>
                  <li>Lumizo tidak bertanggung jawab atas kerugian langsung atau tidak langsung akibat penggunaan atau ketidakmampuan menggunakan platform.</li>
                  <li>Lumizo tidak bertanggung jawab atas konten yang diunggah oleh pengguna (guru, sekolah, atau orang tua).</li>
                  <li>Lumizo tidak bertanggung jawab atas gangguan layanan yang disebabkan oleh pihak ketiga (Penyedia hosting, internet, listrik, dll).</li>
                  <li>Dalam hal terjadi kegagalan sistem yang menyebabkan hilangnya data, tanggung jawab Lumizo terbatas pada upaya pemulihan data terbaik.</li>
                </ul>
              </Section>

              <Section title="8. Hak Kekayaan Intelektual">
                <ul>
                  <li>Seluruh kode, desain, logo, dan konten platform adalah milik Lumizo dan dilindungi oleh undang-undang hak cipta Indonesia.</li>
                  <li>Pengguna tidak diizinkan mereproduksi, mendistribusikan, atau membuat karya turunan tanpa izin tertulis dari Lumizo.</li>
                  <li>Nama "CDPS" dan logo terkait adalah merek dagang dari Lumizo.</li>
                </ul>
              </Section>

              <Section title="9. Larangan">
                <p>Pengguna dilarang:</p>
                <ul>
                  <li>Menggunakan platform untuk kegiatan melanggar hukum atau melanggar hak pihak ketiga.</li>
                  <li>Melakukan rekayasa balik (<em>reverse engineering</em>) atau mencoba mengakses source code platform.</li>
                  <li>Menyebarkan malware, virus, atau kode berbahaya melalui platform.</li>
                  <li>Melakukan akses tidak sah (unauthorized access) ke akun pengguna lain.</li>
                  <li>Menggunakan bot, scraper, atau alat otomatis lainnya untuk mengakses platform.</li>
                </ul>
              </Section>

              <Section title="10. Penghentian Layanan">
                <ul>
                  <li>Lumizo dapat menghentikan akses pengguna jika terjadi pelanggaran terhadap syarat & ketentuan ini.</li>
                  <li>Pengguna dapat berhenti menggunakan platform kapan saja dengan menghubungi Lumizo.</li>
                  <li>Setelah penghentian, data akan dihapus sesuai kebijakan privasi (maksimal 90 hari).</li>
                </ul>
              </Section>

              <Section title="11. Penyelesaian Sengketa">
                <ul>
                  <li>Setiap sengketa akan diselesaikan secara musyawarah terlebih dahulu.</li>
                  <li>Apabila tidak tercapai kesepakatan, sengketa akan diselesaikan melalui Pengadilan Negeri Jakarta Pusat.</li>
                  <li>Hukum yang berlaku adalah hukum Republik Indonesia.</li>
                </ul>
              </Section>

              <Section title="12. Perubahan Syarat & Ketentuan">
                <p>
                  Lumizo dapat mengubah syarat & ketentuan ini dari waktu ke waktu. Perubahan akan
                  diberitahukan melalui email atau notifikasi di platform minimal 14 hari sebelum
                  berlaku. Dengan terus menggunakan platform setelah perubahan, Anda dianggap
                  menyetujui syarat yang telah diperbarui.
                </p>
              </Section>

              <Section title="13. Kontak">
                <p>
                  Jika ada pertanyaan terkait syarat & ketentuan ini, hubungi:
                </p>
                <p className="mt-2">
                  <strong>Lumizo</strong><br />
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
