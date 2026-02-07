import { ImageResponse } from "next/og";
import { quizzes } from "../../../../../../config/quizzes";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string; profile: string }> }
) {
  const { id, profile } = await params;
  const quiz = quizzes[id];

  if (!quiz) return new Response("Not found", { status: 404 });

  const result = quiz.config.results[profile];
  if (!result) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: result.color,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: result.accent,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: result.accent,
              marginBottom: "16px",
            }}
          >
            {quiz.config.title}
          </p>

          <p style={{ fontSize: "64px", marginBottom: "8px" }}>
            {result.emoji}
          </p>

          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#F5F0E8",
              marginBottom: "4px",
              lineHeight: 1.1,
            }}
          >
            {result.name}
          </h1>

          <p
            style={{
              fontSize: "28px",
              fontStyle: "italic",
              color: result.accent,
              marginBottom: "24px",
            }}
          >
            {result.title}
          </p>

          <p
            style={{
              fontSize: "18px",
              color: "rgba(245,240,232,0.5)",
              maxWidth: "600px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            {result.description}
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            {result.traits.map((trait) => (
              <span
                key={trait}
                style={{
                  fontSize: "14px",
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: `1px solid ${result.accent}60`,
                  color: result.accent,
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "rgba(245,240,232,0.25)",
            fontSize: "14px",
          }}
        >
          <span>@asso_episteme</span>
          <span>·</span>
          <span>Episteme</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
