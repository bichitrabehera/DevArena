import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 6;

  const res = await fetch(
    `https://hackathon-backend-3stq.onrender.com/hackathons?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
