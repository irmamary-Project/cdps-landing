import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";

export default function NotFoundPage() {
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

      <main className="flex-1 flex items-center justify-center py-24 sm:py-32">
        <div className="text-center px-4">
          <div className="text-8xl sm:text-9xl font-bold text-primary/10 mb-4 select-none">404</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            Halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau URL-nya salah.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary text-gray-600 hover:text-primary font-bold px-6 py-3 rounded-full text-sm transition-all"
            >
              Coba Demo
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
