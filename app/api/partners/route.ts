import { NextResponse } from "next/server";
import { fetchActivePartners } from "@/lib/mainstay";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchActivePartners({ forceServer: true });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/partners route:", error);
    return NextResponse.json({}, { status: 500 });
  }
}
