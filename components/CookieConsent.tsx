"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const STORAGE_KEY = "cdps_cookie_consent";

function initGA() {
  if (!GA_ID || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) { window.dataLayer.push(args); }
  gtag("js", new Date());
  gtag("config", GA_ID);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      initGA();
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    initGA();
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  };

  return (
    <>
      {visible && GA_ID && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
          id="ga-script"
        />
      )}

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-6 pointer-events-auto">
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Kami menggunakan cookie untuk meningkatkan pengalaman Anda di platform ini.
              Dengan mengklik "Setuju", Anda menyetujui penggunaan cookie sesuai{" "}
              <a href="/kebijakan-privasi" className="text-primary hover:underline font-semibold">
                Kebijakan Privasi
              </a>{" "}
              kami.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={accept}
                className="bg-primary hover:bg-primary-light text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-lg"
              >
                Setuju
              </button>
              <button
                onClick={reject}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium px-4 py-2.5 rounded-full transition-all"
              >
                Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
