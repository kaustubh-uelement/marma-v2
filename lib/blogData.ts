export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  altText?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;
    
    if (!tenantSlug) {
      console.warn("Missing NEXT_PUBLIC_TENANT_SLUG in env");
      return [];
    }

    const res = await fetch(`${apiUrl}/api/v1/blog/active`, {
      headers: {
        'x-tenant-slug': tenantSlug,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.statusText);
      return [];
    }

    const json = await res.json();
    const data = Array.isArray(json) ? json : json.data || [];

    return data.map(mapBackendToBlog);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;
    
    if (!tenantSlug) {
      return null;
    }

    const res = await fetch(`${apiUrl}/api/v1/blog/slug/${slug}`, {
      headers: {
        'x-tenant-slug': tenantSlug,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    const data = json.data || json;

    if (!data || !data.id) return null;

    return mapBackendToBlog(data);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

function mapBackendToBlog(backendBlog: any): BlogPost {
  // Format date nicely
  let formattedDate = backendBlog.published_at || new Date().toISOString();
  try {
    const dateObj = new Date(formattedDate);
    formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(dateObj);
  } catch (e) {
    // keep original string if invalid
  }

  return {
    id: backendBlog.id,
    slug: backendBlog.slug,
    title: backendBlog.title || "",
    excerpt: backendBlog.excerpt || "",
    content: backendBlog.content || "",
    author: backendBlog.author_name || "Admin",
    date: formattedDate,
    readTime: backendBlog.reading_time || "5 min read",
    category: backendBlog.tags && backendBlog.tags.length > 0 ? backendBlog.tags[0] : "General",
    imageUrl: backendBlog.cover_image_url || undefined,
    altText: backendBlog.title || "Blog image",
    metaTitle: backendBlog.seo?.title || backendBlog.title || undefined,
    metaDescription: backendBlog.seo?.description || backendBlog.excerpt || undefined,
  };
}
