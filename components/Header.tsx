import type { ReactNode } from "react";

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <nav aria-label="Navigasi utama" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
}
