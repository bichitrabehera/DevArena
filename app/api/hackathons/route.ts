import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "6";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Backend error:", res.status);
      return NextResponse.json([]);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API route failed:", error);

    return NextResponse.json([]);
  }
}
