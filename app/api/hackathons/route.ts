import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathons?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
