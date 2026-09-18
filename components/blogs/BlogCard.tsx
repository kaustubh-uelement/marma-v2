import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blogData";

export default function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="art card glass glass-hi glass-hover rv"
    >
      {blog.imageUrl && (
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden mb-2 -mt-1 border border-[var(--line-soft)]">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <span className="kicker">{blog.category || "Security"}</span>
      <h3 style={{ margin: "2px 0 6px" }}>{blog.title}</h3>
      <p style={{ margin: "0 0 8px", fontSize: "0.88rem", color: "var(--mute)" }} className="line-clamp-3">
        {blog.excerpt}
      </p>
      <div className="when">
        <span>{blog.date}</span>
        {blog.readTime && <span> &middot; {blog.readTime}</span>}
        {blog.author && <span> &middot; by {blog.author}</span>}
      </div>
    </Link>
  );
}
