import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const requestData = await req.json();

  const res = await fetch(
    `https://api.dyte.io/v2/meetings/${requestData.id}/participants`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.ORG_ID}:${process.env.API_KEY}`,
          "utf-8"
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        name: requestData.name,
        preset_name: requestData.preset_name,
        custom_participant_id: requestData.custom_participant_id,
      }),
    }
  );

  const data = await res.json();

  return Response.json(data);
}
