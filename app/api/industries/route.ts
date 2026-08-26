import { NextResponse } from 'next/server';
import { fetchApi } from '@/lib/api';

export async function GET() {
  try {
    const res = await fetchApi('api/v1/industries/active', {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return NextResponse.json([]);
    }

    const data = await res.json();
    const items = Array.isArray(data) ? data : data?.data || [];

    // Fetch full industry details for each slug so extra_field (nav_title, nav_description) is retrieved
    const detailedItems = await Promise.all(
      items.map(async (item: any) => {
        if (item.slug) {
          try {
            const detailRes = await fetchApi(`api/v1/industries/active/${item.slug}`, {
              next: { revalidate: 30 },
            });
            if (detailRes.ok) {
              const detailJson = await detailRes.json();
              return detailJson?.data || detailJson || item;
            }
          } catch {
            return item;
          }
        }
        return item;
      })
    );

    return NextResponse.json(detailedItems);
  } catch (error) {
    console.error('Error fetching industries from backend:', error);
    return NextResponse.json([]);
  }
}
