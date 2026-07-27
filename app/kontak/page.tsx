"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Icon } from "@/components/decorative/FeatureIcon";

export default function KontakPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nama: "", email: "", sekolah: "", pesan: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <nav aria-label="Navigasi utama" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" aria-label="CDPS - Beranda">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-[#6741D9] font-medium transition-colors">
              Blog
            </Link>
            <Link href="/#pricing" className="text-sm text-gray-500 hover:text-[#6741D9] font-medium transition-colors">
              Harga
            </Link>
            <Link href="/demo" className="bg-[#FBD321] hover:bg-[#D4A800] text-[#6741D9] text-sm font-bold px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-[#FBD321]/30">
              Coba Demo
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
              <div className="lg:col-span-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Hubungi Kami
                </h1>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Punya pertanyaan atau ingin mendaftarkan sekolah? Tim kami siap membantu.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                      <Icon name="mail" size={18} className="text-[#6741D9]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Email</p>
                      <a href="mailto:cdps@lumizo.my.id" className="text-sm text-[#6741D9] hover:underline">
                        cdps@lumizo.my.id
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FEF9E7] flex items-center justify-center flex-shrink-0">
                      <Icon name="whatsapp" size={18} className="text-[#FBD321]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
                      <a href="https://wa.me/6289656059612" target="_blank" rel="noopener noreferrer" className="text-sm text-[#6741D9] hover:underline">
                        0896-5605-9612
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">Senin-Jumat, 08:00-17:00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F9FA] flex items-center justify-center flex-shrink-0">
                      <Icon name="sekolah" size={18} className="text-[#04B5BB]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Kantor</p>
                      <p className="text-sm text-gray-500">Lumizo, Indonesia</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-gradient-to-br from-[#EDE9FE] to-white rounded-2xl border border-[#EDE9FE]">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">Lebih suka WhatsApp?</h3>
                  <p className="text-sm text-gray-500 mb-4">Klik tombol di bawah untuk chat langsung.</p>
                  <a
                    href="https://wa.me/6289656059612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#04B5BB] hover:bg-[#03A0A8] text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
                  >
                    <Icon name="whatsapp" size={16} />
                    Chat WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 shadow-sm">
                  {sent ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center mx-auto mb-4">
                        <Icon name="checklist" size={24} className="text-[#04B5BB]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
                      <p className="text-gray-500 text-sm mb-6">Tim kami akan menghubungi Anda dalam 1-2 hari kerja.</p>
                      <button
                        onClick={() => { setSent(false); setForm({ nama: "", email: "", sekolah: "", pesan: "" }); }}
                        className="text-sm text-[#6741D9] font-semibold hover:underline"
                      >
                        Kirim pesan lain
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                          <input
                            id="nama"
                            required
                            value={form.nama}
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6741D9]/20 focus:border-[#6741D9] transition-all"
                            placeholder="Masukkan nama Anda"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6741D9]/20 focus:border-[#6741D9] transition-all"
                            placeholder="contoh@email.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="sekolah" className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                          <input
                            id="sekolah"
                            value={form.sekolah}
                            onChange={(e) => setForm({ ...form, sekolah: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6741D9]/20 focus:border-[#6741D9] transition-all"
                            placeholder="Nama sekolah / yayasan (opsional)"
                          />
                        </div>
                        <div>
                          <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                          <textarea
                            id="pesan"
                            required
                            rows={4}
                            value={form.pesan}
                            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6741D9]/20 focus:border-[#6741D9] transition-all resize-none"
                            placeholder="Tulis pesan Anda..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#6741D9] hover:bg-[#7C5CF7] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all hover:shadow-lg"
                        >
                          Kirim Pesan
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#3B1F8A] text-white/60 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
          <span>&copy; {new Date().getFullYear()} Lumizo. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
