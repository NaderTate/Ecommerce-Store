import { createUserAfterAuth } from "@/app/server_actions/users";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
const webhookSecret = process.env.WEBHOOK_SECRET || "";
async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }
  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data;
    await createUserAfterAuth(
      id,
      attributes.first_name + " " + attributes.last_name,
      attributes.email_addresses[0].email_address,
      attributes.image_url
    );
  }
}
type EventType = "user.created" | "*";
type Event = {
  data: Record<string, string | number | any>;
  object: "event";
  type: EventType;
};
export const GET = handler;
export const POST = handler;
export const PUT = handler;
