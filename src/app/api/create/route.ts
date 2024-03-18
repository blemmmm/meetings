import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await fetch("https://api.dyte.io/v2/meetings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(
        `${process.env.ORG_ID}:${process.env.API_KEY}`,
        "utf-8"
      ).toString("base64")}`,
    },

    body: JSON.stringify(req.body),
  });

  const data = await res.json();

  return Response.json(data);
}
