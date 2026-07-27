import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import SiteFooter from "@/components/SiteFooter";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog - Informasi Tumbuh Kembang Anak PAUD & TK",
  description:
    "Baca artikel seputar tips parenting, edukasi anak usia dini, daily report, portofolio digital, dan informasi bermanfaat lainnya dari CDPS.",
  openGraph: {
    title: "Blog - Informasi Tumbuh Kembang Anak PAUD & TK",
    description:
      "Tips parenting, edukasi PAUD/TK, dan informasi tumbuh kembang anak dari CDPS.",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header>
        <Link href="/" aria-label="CDPS - Beranda">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-primary font-medium transition-colors">
            Beranda
          </Link>
          <Link href="/blog" className="text-sm text-primary font-bold transition-colors">
            Blog
          </Link>
        </div>
      </Header>

      <main className="flex-1 pt-16">
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Blog CDPS
              </h1>
              <p className="text-gray-500 text-base lg:text-lg max-w-2xl mx-auto">
                Tips parenting, edukasi anak usia dini, dan informasi tumbuh kembang anak.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-pale transition-all"
                >
                  <div className="aspect-[16/9] bg-primary-pale overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                    <div className="mt-3">
                      <span className="text-xs font-medium text-primary bg-primary-pale px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
