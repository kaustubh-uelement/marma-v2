import { getBlogBySlug, getBlogs } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CtaSection from "@/components/common/CtaSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) return { title: "Blog Not Found | Marma Security" };

  return {
    title: `${blog.metaTitle || blog.title} | Marma Security`,
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
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blogs" },
          { label: blog.category || "Article" },
        ]}
        eyebrow={blog.category || "Security Dispatch"}
        title={blog.title}
        lede={blog.excerpt}
        primaryCta={undefined}
        secondaryCta={undefined}
      />

      <section className="sec-sm">
        <div className="wrap">
          <div className="max-w-[840px] mx-auto">
            {/* Meta Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--line-soft)] font-mono text-[0.72rem] text-[var(--mute-2)] uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="text-[var(--red)] font-semibold">{blog.author || "Marma Security Team"}</span>
                <span>&middot;</span>
                <span>{blog.date}</span>
              </div>
              {blog.readTime && <span>{blog.readTime}</span>}
            </div>

            {/* Featured Image */}
            {blog.imageUrl && (
              <div className="relative w-full h-[360px] md:h-[460px] rounded-2xl overflow-hidden mb-10 border border-[var(--line-soft)] shadow-sm">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose glass glass-hi rounded-2xl">
              <div
                className="prose-blog leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <div className="mt-12 pt-6 border-t border-[var(--line-soft)] flex justify-between items-center">
                <Link href="/blogs" className="btn btn-glass" style={{ padding: "8px 18px", fontSize: "0.72rem" }}>
                  &larr; Back to all dispatches
                </Link>
                <Link href="/contact-us" className="btn btn-red" style={{ padding: "8px 18px", fontSize: "0.72rem" }}>
                  Start 30-day trial &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
