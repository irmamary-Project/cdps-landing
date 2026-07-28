"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { createClient } = await import("@/utils/supabase/client");
    const supabase = createClient();

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/password-update`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-primary-pale flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Cek Email Anda</h2>
          <p className="text-sm text-gray-500">
            Kami telah mengirim tautan reset password ke <strong>{email}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Lupa Password</h1>
        <p className="text-sm text-gray-500 mb-6">Masukkan email untuk menerima tautan reset</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="contoh@email.com"
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
            {loading ? "Mengirim..." : "Kirim Tautan Reset"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="text-primary hover:underline font-medium">
            Kembali ke masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
