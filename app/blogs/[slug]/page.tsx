import { getBlogBySlug } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: {
      absolute: blog.metaTitle || `${blog.title} | Marma Security Blogs`,
    },
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: `/blogs/${blog.slug}`,
      images: blog.imageUrl ? [blog.imageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
    },
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-bg-white min-h-screen pt-[120px] pb-24">
      <article className="container mx-auto px-4 md:px-8 max-w-[800px]">
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-brand-red font-body font-medium mb-8 hover:opacity-80 transition-opacity"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
          Back to Blogs
        </Link>

        {/* Header */}
        <header className="mb-12 border-b border-[#E5E5E5] pb-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-body text-sm font-semibold text-brand-red uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="w-1 h-1 bg-[#D9D9D9] rounded-full"></span>
            <span className="fl5 text-text-muted">{blog.date}</span>
            <span className="w-1 h-1 bg-[#D9D9D9] rounded-full"></span>
            <span className="font-body text-sm text-text-muted">
              {blog.readTime}
            </span>
          </div>

          <h1 className="fl1 mb-6">{blog.title}</h1>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center font-title font-bold text-text-dark">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-body font-semibold text-[15px] text-text-dark">
                {blog.author}
              </p>
              <p className="font-body font-normal text-[13px] text-text-muted">
                Marma Security Expert
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="w-full mb-12 rounded-[16px] overflow-hidden border border-[#E5E5E5]">
            <Image
              src={blog.imageUrl}
              alt={blog.altText || blog.title}
              width={1200}
              height={630}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </main>
  );
}
