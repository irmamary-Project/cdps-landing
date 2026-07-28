import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi CDPS — bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda sesuai UU PDP No. 27/2022.",
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
                  kembang anak usia dini.
                </p>
                <p>
                  Kebijakan privasi ini disusun sesuai dengan{" "}
                  <strong>Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong>{" "}
                  dan peraturan pelaksanaannya. Dengan menggunakan platform CDPS, Anda menyetujui
                  praktik pemrosesan data yang dijelaskan dalam dokumen ini.
                </p>
              </Section>

              <Section title="2. Pengendali Data Pribadi">
                <p>
                  Pengendali data pribadi dalam layanan ini adalah <strong>Lumizo</strong>.
                  Sebagai pengendali data, kami bertanggung jawab menentukan tujuan dan cara
                  pemrosesan data pribadi pengguna.
                </p>
                <p>
                  Untuk keperluan pengelolaan layanan, sekolah bertindak sebagai pengendali data
                  bersama (joint controller) untuk data siswa dan orang tua, sementara CDPS
                  menyediakan infrastruktur dan alat pemrosesan.
                </p>
              </Section>

              <Section title="3. Dasar Hukum Pemrosesan Data">
                <p>Kami memproses data pribadi Anda berdasarkan dasar hukum berikut:</p>
                <ul>
                  <li>
                    <strong>Persetujuan (consent):</strong> Anda memberikan persetujuan eksplisit
                    saat mendaftar dan menggunakan layanan CDPS.
                  </li>
                  <li>
                    <strong>Kepentingan sah (legitimate interest):</strong> Untuk meningkatkan
                    kualitas layanan dan keamanan platform.
                  </li>
                  <li>
                    <strong>Kewajiban hukum (legal obligation):</strong> Untuk memenuhi ketentuan
                    peraturan perundang-undangan yang berlaku.
                  </li>
                </ul>
              </Section>

              <Section title="4. Informasi yang Kami Kumpulkan">
                <p>Kami dapat mengumpulkan informasi berikut:</p>
                <ul>
                  <li><strong>Data Sekolah:</strong> nama sekolah, alamat, nomor telepon, email.</li>
                  <li><strong>Data Guru & Staf:</strong> nama lengkap, email, nomor WhatsApp, role/jabatan, data kehadiran dan lokasi (geofence).</li>
                  <li><strong>Data Siswa:</strong> nama, kelas, foto, data tumbuh kembang (berat badan, tinggi badan, BMI), daily report, portofolio digital, dan catatan observasi.</li>
                  <li><strong>Data Orang Tua:</strong> nama, nomor WhatsApp, email, dan catatan komunikasi dengan pihak sekolah.</li>
                  <li><strong>Data Penggunaan:</strong> alamat IP, jenis peramban, halaman yang dikunjungi, durasi kunjungan, dan interaksi dengan fitur (melalui Google Analytics).</li>
                </ul>
              </Section>

              <Section title="5. Tujuan Pemrosesan Data">
                <p>Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
                <ul>
                  <li>Menyediakan, mengelola, dan mengoperasikan layanan daily report, portofolio digital, dan laporan perkembangan.</li>
                  <li>Memfasilitasi komunikasi antara guru, sekolah, dan orang tua.</li>
                  <li>Menyusun laporan triwulan dan memantau pertumbuhan fisik anak.</li>
                  <li>Verifikasi lokasi guru melalui fitur geofence untuk keperluan absensi.</li>
                  <li>Meningkatkan kualitas layanan melalui analisis penggunaan platform.</li>
                  <li>Mengirim notifikasi terkait aktivitas anak di sekolah.</li>
                  <li>Memenuhi kewajiban hukum dan peraturan yang berlaku.</li>
                </ul>
              </Section>

              <Section title="6. Periode Penyimpanan Data">
                <p>
                  Data pribadi akan disimpan selama akun pengguna masih aktif dan/atau selama
                  hubungan kontraktual antara sekolah dan CDPS masih berlangsung. Setelah akun
                  dihapus atau hubungan diakhiri, data akan dihapus dalam jangka waktu paling lama
                  <strong> 90 (sembilan puluh) hari</strong>, kecuali:
                </p>
                <ul>
                  <li>Diwajibkan lain oleh peraturan perundang-undangan yang berlaku.</li>
                  <li>Diperlukan untuk kepentingan pembuktian hukum (paling lama 5 tahun sesuai UU ITE dan KUHPerdata).</li>
                </ul>
                <p>
                  Data CCTV bersifat <em>live streaming</em> dan tidak disimpan secara permanen
                  di server kami.
                </p>
              </Section>

              <Section title="7. Penyimpanan & Keamanan Data">
                <p>
                  Data Anda disimpan di server cloud milik pihak ketiga terpercaya (<strong>Vercel Inc.</strong>,
                  Amerika Serikat) yang telah menerapkan standar keamanan internasional (SOC 2).
                  Kami menerapkan langkah-langkah keamanan teknis dan organisasi meliputi:
                </p>
                <ul>
                  <li>Enkripsi data dalam transit menggunakan protokol HTTPS/TLS.</li>
                  <li>Akses terbatas berdasarkan peran pengguna (role-based access control).</li>
                  <li>Otentikasi dua faktor untuk akun administratif.</li>
                  <li>Audit akses secara berkala.</li>
                </ul>
              </Section>

              <Section title="8. Transfer Data Lintas Negara">
                <p>
                  Dengan menggunakan layanan CDPS, Anda menyadari bahwa data pribadi Anda dapat
                  ditransfer dan diproses di luar wilayah Indonesia, khususnya di server Vercel Inc.
                  yang berlokasi di <strong>Amerika Serikat</strong>.
                </p>
                <p>
                  Transfer dilakukan dengan memastikan tingkat perlindungan data yang setara dengan
                  standar UU PDP, termasuk melalui mekanisme perjanjian pengalihan data (data transfer
                  agreement) dengan penyedia layanan.
                </p>
              </Section>

              <Section title="9. Pengungkapan ke Pihak Ketiga">
                <p>Kami tidak menjual data pribadi Anda ke pihak ketiga. Kami dapat membagikan data jika:</p>
                <ul>
                  <li>Diperlukan untuk memenuhi kewajiban hukum berdasarkan peraturan perundang-undangan.</li>
                  <li>Dengan persetujuan eksplisit dari Anda sebagai subjek data.</li>
                  <li>Kepada penyedia layanan yang membantu operasional kami (Vercel, Google Analytics) dengan ikatan perjanjian kerahasiaan dan standar perlindungan data yang setara.</li>
                  <li>Atas permintaan lembaga penegak hukum yang sah sesuai prosedur hukum yang berlaku.</li>
                </ul>
              </Section>

              <Section title="10. Hak Subjek Data">
                <p>Sesuai dengan UU PDP, Anda memiliki hak-hak berikut:</p>
                <ul>
                  <li><strong>Hak akses:</strong> Memperoleh informasi tentang data pribadi yang kami proses.</li>
                  <li><strong>Hak koreksi:</strong> Meminta perbaikan data yang tidak akurat atau tidak lengkap.</li>
                  <li><strong>Hak penghapusan:</strong> Meminta penghapusan data pribadi (dengan batasan tertentu sesuai regulasi).</li>
                  <li><strong>Hak pembatasan pemrosesan:</strong> Meminta pembatasan pemrosesan data dalam kondisi tertentu.</li>
                  <li><strong>Hak portabilitas data:</strong> Meminta salinan data pribadi dalam format yang terstruktur dan dapat dibaca.</li>
                  <li><strong>Hak keberatan:</strong> Menolak pemrosesan data untuk kepentingan tertentu, termasuk pemasaran langsung.</li>
                  <li><strong>Hak penarikan persetujuan:</strong> Menarik persetujuan yang telah diberikan, tanpa mempengaruhi keabsahan pemrosesan yang telah dilakukan sebelumnya.</li>
                </ul>
                <p>
                  Untuk menggunakan hak-hak di atas, hubungi kami melalui kontak yang tercantum di
                  bagian akhir dokumen ini. Kami akan merespons permohonan Anda dalam waktu paling
                  lama <strong>30 (tiga puluh) hari</strong> sesuai ketentuan UU PDP.
                </p>
              </Section>

              <Section title="11. Cookie & Teknologi Pelacakan">
                <p>
                  Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna
                  dan menganalisis penggunaan platform. Google Analytics digunakan untuk memahami
                  interaksi pengguna secara agregat.
                </p>
                <p>
                  Saat pertama kali mengunjungi platform, Anda akan diminta memberikan persetujuan
                  untuk penggunaan cookie non-esensial. Anda dapat mengubah preferensi cookie
                  kapan saja melalui pengaturan browser Anda. Cookie esensial yang diperlukan untuk
                  fungsi dasar platform akan tetap aktif tanpa memerlukan persetujuan.
                </p>
                <p>Jenis cookie yang digunakan:</p>
                <ul>
                  <li><strong>Cookie esensial:</strong> Diperlukan untuk autentikasi dan keamanan platform.</li>
                  <li><strong>Cookie analitik:</strong> Digunakan untuk memahami pola penggunaan platform (Google Analytics).</li>
                </ul>
              </Section>

              <Section title="12. Data CCTV">
                <p>
                  Fitur CCTV memungkinkan sekolah memantau aktivitas secara langsung. Akses terbatas
                  pada pengguna yang berwenang. Rekaman tidak disimpan secara permanen — hanya
                  streaming langsung.
                </p>
                <p>
                  Sekolah bertanggung jawab untuk memberitahukan keberadaan kamera CCTV kepada
                  seluruh pihak yang terpantau sesuai ketentuan UU PDP dan peraturan perundang-undangan
                  lainnya. Biaya pemasangan, perangkat, dan bandwidth ditanggung oleh sekolah.
                </p>
              </Section>

              <Section title="13. Mekanisme Pengaduan">
                <p>
                  Jika Anda memiliki keluhan terkait pemrosesan data pribadi Anda, silakan hubungi
                  kami terlebih dahulu melalui kontak di bawah. Kami akan menangani keluhan Anda
                  dalam waktu 30 hari.
                </p>
                <p>
                  Apabila keluhan tidak terselesaikan dengan memuaskan, Anda berhak mengajukan
                  pengaduan kepada lembaga pengawas perlindungan data pribadi sesuai dengan
                  ketentuan UU PDP, yaitu:
                </p>
                <p className="mt-2">
                  <strong>Kementerian Komunikasi dan Digital (Kemenkomdigi)</strong><br />
                  Jl. Medan Merdeka Barat No. 9, Jakarta Pusat 10110<br />
                  atau melalui portal pengaduan yang ditetapkan kemudian oleh Pemerintah.
                </p>
              </Section>

              <Section title="14. Perubahan Kebijakan">
                <p>
                  Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan signifikan
                  akan diberitahukan melalui email atau notifikasi di platform minimal
                  <strong> 14 (empat belas) hari</strong> sebelum perubahan berlaku. Tanggal
                  "Terakhir diperbarui" di bagian atas menunjukkan kapan revisi terakhir dilakukan.
                  Dengan terus menggunakan platform setelah perubahan berlaku, Anda dianggap
                  menyetujui kebijakan yang telah diperbarui.
                </p>
              </Section>

              <Section title="15. Kontak">
                <p>
                  Jika ada pertanyaan, permohonan hak subjek data, atau kekhawatiran tentang
                  kebijakan privasi ini, hubungi:
                </p>
                <p className="mt-2">
                  <strong>Lumizo</strong><br />
                  Email: <a href="mailto:cdps@lumizo.my.id" className="text-primary hover:underline">cdps@lumizo.my.id</a><br />
                  WhatsApp: <a href="https://wa.me/6289656059612" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">0896-5605-9612</a><br />
                  Respons permohonan: maksimal 30 hari kerja
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
