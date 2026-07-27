export default function SiteFooter() {
  return (
    <footer className="bg-deep-purple text-white/60 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
        <span>&copy; {new Date().getFullYear()} Lumizo. All rights reserved.</span>
      </div>
    </footer>
  );
}
