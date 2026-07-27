"use client";
export default function DemoError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex-1 min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Gagal Memuat Halaman Demo</h2>
        <p className="text-gray-500 mb-4">Silakan coba lagi.</p>
        <button onClick={() => reset()} className="bg-primary text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all">
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
