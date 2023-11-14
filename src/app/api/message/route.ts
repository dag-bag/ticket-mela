import { sendSMS } from "@/utils/sms";
import { Tclient } from "@/utils/twillo";
import { sendTemplateMessage } from "@/utils/whatsapp";
import twilio from "twilio";
const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
const token = <string>process.env.TWILIO_AUTH_TOKEN;

export async function POST(req: Request) {
  await sendSMS(["8889737792"], `नमस्ते Deepak `);
  return Response.json({ ok: true });
}
