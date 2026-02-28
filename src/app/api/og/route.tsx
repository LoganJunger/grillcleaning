import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Seven Hills and Grill";
  const subtitle =
    searchParams.get("subtitle") || "Professional Grill Cleaning · Cincinnati, OH";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Flame icon */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "#f97316",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: 900,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 16,
            textAlign: "center",
            display: "flex",
          }}
        >
          {subtitle}
        </div>
        {/* Orange divider */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#f97316",
            borderRadius: 2,
            marginTop: 24,
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 18,
            color: "#64748b",
            marginTop: 16,
            display: "flex",
          }}
        >
          sevenhillsandgrill.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
