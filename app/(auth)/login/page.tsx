"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState(errorParam || "");

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Masuk</h1>
        <p className="text-sm text-gray-500 mb-6">Masuk ke akun CDPS Anda</p>

        <form
          action="/api/auth/login"
          method="POST"
          onSubmit={() => setLoading(true)}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="contoh@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Minimal 6 karakter"
            />
          </div>

          {clientError && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{clientError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-primary hover:underline font-medium">
            Lupa password?
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
