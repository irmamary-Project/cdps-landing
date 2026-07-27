"use client";
export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex-1 min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h2>
        <p className="text-gray-500 mb-6">Maaf, terjadi kesalahan yang tidak terduga.</p>
        <button onClick={() => reset()} className="bg-primary hover:bg-primary-light text-white font-bold px-6 py-3 rounded-full text-sm transition-all">
          Coba Lagi
        </button>
      </div>
    </main>
  );
}
