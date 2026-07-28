import Logo from "@/components/Logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <nav className="p-4 sm:p-6">
        <Link href="/" aria-label="CDPS - Beranda">
          <Logo size="sm" />
        </Link>
      </nav>
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        {children}
      </main>
    </div>
  );
}
