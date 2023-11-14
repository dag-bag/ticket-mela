import { NextResponse } from "next/server";

import { sendTemplateMessage } from "@/utils/whatsapp";
export async function POST(request: Request) {
  const data = await sendTemplateMessage(
    "deepak" as string,
    "test",
    "7354657459" as string
  )
  return NextResponse.json({
    data: data
  })
}
