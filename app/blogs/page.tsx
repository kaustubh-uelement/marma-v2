import { getBlogs } from "@/lib/blogData";
import BlogCard from "@/components/blogs/BlogCard";
import PageHero from "@/components/common/PageHero";
import CtaSection from "@/components/common/CtaSection";

export const metadata = {
  title: "Blog & Intelligence Reports | Marma Security",
  description:
    "Notes on what is actually going wrong. Short essays on incident investigations, architectural trade-offs, and live cyber telemetry.",
};

export const revalidate = 60;

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        eyebrow="Intelligence & Field Notes"
        title="Notes on what is actually going wrong."
        lede="Short essays on incident investigations, architectural trade-offs and what we learn from watching traffic on customer estates."
        primaryCta={{ text: "Start 30-day trial →", href: "/contact-us" }}
        secondaryCta={{ text: "See the platform", href: "/technology" }}
      />

      <section className="sec">
        <div className="wrap">
          <div className="sec-hd rv">
            <div className="eyebrow">Recent dispatches</div>
            <h2>Latest investigations & security research.</h2>
          </div>

          <div className="g3 mt">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection primaryHref="/contact-us" secondaryHref="/contact-us" />
    </>
  );
}
