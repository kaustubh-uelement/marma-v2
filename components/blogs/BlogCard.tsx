import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blogData';

export default function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <div className="bg-bg-white border border-[#E5E5E5] rounded-[16px] overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      {blog.imageUrl ? (
        <div className="relative h-[200px] w-full border-b border-[#E5E5E5]">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="font-body font-bold text-brand-red uppercase tracking-wide text-[10px]">{blog.category}</span>
          </div>
        </div>
      ) : (
        <div className="h-[200px] w-full bg-[#f7f7f7] flex items-center justify-center border-b border-[#E5E5E5]">
          <span className="font-body font-medium text-[#BBBBBB] uppercase tracking-wide text-sm">{blog.category}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="fl5 text-text-muted">{blog.date}</span>
          <span className="font-body text-xs text-text-muted font-medium bg-[#f0f0f0] px-2 py-1 rounded-full">{blog.readTime}</span>
        </div>
        
        <h3 className="fl3 mb-3 hover:text-brand-red transition-colors line-clamp-2">
          <Link href={`/blogs/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>
        
        <p className="fl4 text-text-muted mb-6 flex-grow line-clamp-3">
          {blog.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="font-body text-sm font-semibold text-text-dark">{blog.author}</span>
          <Link href={`/blogs/${blog.slug}`} className="explore-link-text flex items-center gap-1 group font-semibold">
            Read More
            <svg
              className="explore-link-arrow group-hover:translate-x-1 transition-transform"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
