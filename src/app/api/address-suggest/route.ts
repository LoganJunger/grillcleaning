import { NextRequest, NextResponse } from "next/server";

interface NominatimResult {
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const params = new URLSearchParams({
      q: `${q}, Cincinnati, OH`,
      format: "json",
      addressdetails: "1",
      countrycodes: "us",
      limit: "5",
    });

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: {
          "User-Agent": "SevenHillsGrillCo/1.0 (info@sevenhillsgrillco.com)",
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return NextResponse.json([]);
    }

    const data: NominatimResult[] = await res.json();

    const suggestions = data.map((r) => {
      const street = [r.address.house_number, r.address.road]
        .filter(Boolean)
        .join(" ");
      const city =
        r.address.city || r.address.town || r.address.village || r.address.hamlet || "";
      const state = r.address.state || "";
      const zip = r.address.postcode || "";

      return {
        display: r.display_name,
        street,
        city,
        state: stateToAbbr(state),
        zip,
      };
    });

    return NextResponse.json(suggestions);
  } catch {
    return NextResponse.json([]);
  }
}

function stateToAbbr(state: string): string {
  const map: Record<string, string> = {
    Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
    Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
    Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA",
    Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
    Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS", Missouri: "MO",
    Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND",
    Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA", "Rhode Island": "RI",
    "South Carolina": "SC", "South Dakota": "SD", Tennessee: "TN", Texas: "TX", Utah: "UT",
    Vermont: "VT", Virginia: "VA", Washington: "WA", "West Virginia": "WV",
    Wisconsin: "WI", Wyoming: "WY",
  };
  return map[state] || state;
}
