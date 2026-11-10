import { NextResponse } from "next/server";

const HACKALENDAR_API_URL = "https://hackalendar.com/api/events";

type HackalendarEvent = {
  id: string;
  name: string;
  city?: string | null;
  cityLabel?: string | null;
  venue?: string | null;
  countryCode?: string | null;
  mode?: "in_person" | "online" | "hybrid" | null;
  prizePool?: number | null;
  startAt?: string | null;
  endAt?: string | null;
  organizer?: string | null;
  url?: string | null;
};

type Hackathon = {
  id: string;
  name: string;
  location?: string | null;
  prize?: string | null;
  participants?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  platform?: string | null;
  link?: string | null;
};

function mapHackalendarEvent(event: HackalendarEvent): Hackathon {
  const locationParts = [
    event.cityLabel || event.city,
    event.venue,
    event.countryCode,
  ].filter(Boolean);

  const mode = event.mode;

  return {
    id: event.id,
    name: event.name,
    location: locationParts.length > 0 ? locationParts.join(", ") : null,
    prize: event.prizePool != null ? `$${event.prizePool}` : "N/A",
    participants: "N/A",
    start_date: event.startAt ?? null,
    end_date: event.endAt ?? null,
    platform: event.organizer ?? null,
    link: event.url ?? null,
    // Keep mode for frontend filtering even though it's not in the type used by card
    mode,
  } as Hackathon;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = searchParams.get("limit") || "100";
    const offset = searchParams.get("offset") || "0";
    const mode = searchParams.get("mode"); // online | offline | all
    const city = searchParams.get("city");

    const params = new URLSearchParams({
      limit,
      offset,
    });

    if (city) {
      params.set("city", city);
    }

    // Hackalendar supports server-side mode filtering.
    // We map frontend "offline" -> in_person, "online" -> online.
    if (mode === "online") {
      params.set("mode", "online");
    } else if (mode === "offline") {
      params.set("mode", "in_person");
    }

    const res = await fetch(`${HACKALENDAR_API_URL}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Hackalendar error:", res.status);
      return NextResponse.json([]);
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.data)) {
      return NextResponse.json([]);
    }

    const hackathons = data.data.map(mapHackalendarEvent);

    return NextResponse.json({
      data: hackathons,
      meta: data.meta ?? { total: hackathons.length },
    });
  } catch (error) {
    console.error("API route failed:", error);

    return NextResponse.json([]);
  }
}
