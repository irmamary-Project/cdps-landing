import Logo from "@/components/Logo";
import Wave from "@/components/decorative/Wave";
import { Icon } from "@/components/decorative/FeatureIcon";

export default function Footer() {
  return (
    <footer className="bg-[#3B1F8A] text-white/60">
      <div className="text-[#3B1F8A] overflow-hidden leading-0">
        <Wave className="w-full h-12 sm:h-16 lg:h-20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="/" aria-label="CDPS - Beranda">
              <Logo size="md" />
            </a>
            <p className="text-sm leading-relaxed mt-4 max-w-sm">
              Child Development Portal System — platform all-in-one untuk memantau
              tumbuh kembang anak usia dini. Digunakan oleh 50+ sekolah di Indonesia.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="mailto:cdps@lumizo.my.id" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Email">
                <Icon name="mail" size={18} className="text-white/70" />
              </a>
              <a href="https://wa.me/6289656059612" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="WhatsApp">
                <Icon name="whatsapp" size={18} className="text-white/70" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Menu</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#pricing" className="hover:text-white transition-colors">Harga</a></li>
              <li><a href="/kontak" className="hover:text-white transition-colors">Kontak</a></li>
              <li><a href="/demo/daily-report" className="hover:text-white transition-colors">Daily Report</a></li>
              <li><a href="/demo/portofolio" className="hover:text-white transition-colors">Portofolio Digital</a></li>
              <li><a href="/demo/laporan" className="hover:text-white transition-colors">Laporan Perkembangan</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <address className="not-italic">
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:cdps@lumizo.my.id" className="hover:text-white transition-colors">
                  cdps@lumizo.my.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/6289656059612" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  0896-5605-9612
                </a>
              </li>
              <li className="text-white/40 text-xs pt-4">
                &copy; {new Date().getFullYear()} Lumizo.
              </li>
            </ul>
          </address>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>for better childhood education</span>
          <span>CDPS by Lumizo</span>
        </div>
      </div>
    </footer>
  );
}
