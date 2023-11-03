import { sendTemplateMessage } from "@/utils/whatsapp";
import twilio from "twilio";
const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
const token = <string>process.env.TWILIO_AUTH_TOKEN;

export async function POST(req: Request) {
  return Response.json({ ok: true });
}
