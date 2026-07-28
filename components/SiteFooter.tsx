import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-deep-purple text-white/60 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <span>&copy; {new Date().getFullYear()} Lumizo. All rights reserved.</span>
        <Link href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
      </div>
    </footer>
  );
}
