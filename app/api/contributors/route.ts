import { NextResponse } from "next/server";

export async function GET() {
  const owner = "Masaru124";
  const repo = "Hackathon-backend";

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!Array.isArray(data)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json([]);
  }
}
