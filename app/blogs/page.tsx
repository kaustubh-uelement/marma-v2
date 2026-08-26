import { getBlogs } from '@/lib/blogData';
import BlogCard from '@/components/blogs/BlogCard';

export const metadata = {
  title: 'Blogs | Marma Security',
  description: 'Read the latest insights and updates from the Marma Security team.',
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="bg-bg-light min-h-screen pt-[120px] pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
        
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <h1 className="banner-title-default !text-text-dark mb-6">Our Latest Insights</h1>
          <p className="font-body text-lg md:text-xl text-text-muted leading-relaxed font-light">
            Stay up to date with the latest cybersecurity trends, best practices, and insights from our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </main>
  );
}
