export interface Body {
  qtc: number,
  qta: number,
  phone: string,
  username: string,
  entry_date: string
}
import { NextResponse } from "next/server";
import { db } from "../../../firebase.config";
import { doc, writeBatch } from "firebase/firestore";
import ticketArrayGenerator from "../../libs/ticketArray";
import dateToTimestamp from "../../libs/dateToTimestamp";
import shortenUrlWithTinyURL from "../../libs/shortenTinyUrl";

export async function POST(request: Request) {
  const batch = writeBatch(db);
  const body: Body = await request.json();
  console.log(body)
  const { phone, username, qta, qtc, entry_date } = body;
  const tickets = qta + qtc;
  const ticketIds = ticketArrayGenerator(tickets);

  ticketIds.forEach(async (id, index) => {
    const timestamp = dateToTimestamp(entry_date);
    const nycRef = doc(db, "tickets", id as any);
    const isChild = index < qtc;
    batch.set(nycRef, {
      id,
      phone,
      isExpired: false,
      entry_date: timestamp,
      type: isChild ? "child" : "adult",
    });
  });
  const sanitizedUsername = encodeURIComponent(username);
  const tickedUrls = `https://www.tickets.sasahyog.com/ticket?ids=${ticketIds.join(",")}&mobile=${phone}&n=${sanitizedUsername}`;
  return await batch.commit().then(async () => {
    const shortenedUrl = await shortenUrlWithTinyURL(tickedUrls);
    return NextResponse.json({
      tickets: shortenedUrl,
      phone,
    });
  }).catch((error) => console.log(error))
}
