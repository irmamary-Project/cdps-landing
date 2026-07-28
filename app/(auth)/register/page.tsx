"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ sekolah: "", nama: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Gagal mendaftar");
      setLoading(false);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Silakan cek email Anda untuk verifikasi, lalu masuk ke akun.
          </p>
          <Link
            href="/login"
            className="inline-block bg-primary hover:bg-primary-light text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
          >
            Masuk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Daftar Sekolah</h1>
        <p className="text-sm text-gray-500 mb-6">Buat akun admin sekolah Anda</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sekolah" className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
            <input
              id="sekolah"
              required
              value={form.sekolah}
              onChange={(e) => setForm({ ...form, sekolah: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="TK Pelita Harapan"
            />
          </div>

          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              id="nama"
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Nama admin sekolah"
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="admin@sekolah.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg"
          >
            {loading ? "Mendaftarkan..." : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
