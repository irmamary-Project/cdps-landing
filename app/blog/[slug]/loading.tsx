export default function BlogPostLoading() {
  return (
    <main className="flex-1 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 animate-pulse">
        <div className="h-4 w-24 bg-gray-100 rounded mb-8" />
        <div className="h-4 w-32 bg-gray-100 rounded mb-4" />
        <div className="h-12 w-full bg-gray-100 rounded mb-6" />
        <div className="aspect-[16/9] bg-gray-100 rounded-2xl mb-10" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-5/6 bg-gray-100 rounded" />
          <div className="h-4 w-4/6 bg-gray-100 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-3/4 bg-gray-100 rounded" />
        </div>
      </div>
    </main>
  );
}
