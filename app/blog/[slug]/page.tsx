import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import { blogPosts } from "@/lib/blog-posts";
import { Icon } from "@/components/decorative/FeatureIcon";

function BlogContent({ content }: { content: string[] }) {
  return (
    <>
      {content.map((block, i) => {
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
              {block.slice(3)}
            </h2>
          );
        }
        return (
          <p key={i} className="text-gray-600 leading-relaxed mb-5 text-base lg:text-lg">
            {block}
          </p>
        );
      })}
    </>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <nav aria-label="Navigasi utama" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" aria-label="CDPS - Beranda">
            <Logo size="sm" />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#6741D9] font-medium transition-colors">
              Beranda
            </Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-[#6741D9] font-medium transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-16">
        <article className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#6741D9] transition-colors mb-8"
            >
              <Icon name="arrow-right" size={14} className="rotate-180" />
              Kembali ke Blog
            </Link>

            <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
              <span className="text-xs font-medium text-[#6741D9] bg-[#EDE9FE] px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="aspect-[16/9] bg-[#EDE9FE] rounded-2xl overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-none">
              <BlogContent content={post.content} />
            </div>

            <div className="border-t border-gray-100 mt-12 pt-8">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Ditulis oleh <span className="font-medium text-gray-600">{post.author}</span>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#FBD321] text-[#6741D9] font-bold px-6 py-3 rounded-full text-sm hover:shadow-lg hover:shadow-[#FBD321]/30 transition-all"
                >
                  Coba CDPS Gratis
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-[#3B1F8A] text-white/60 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
          <span>&copy; {new Date().getFullYear()} Lumizo. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
