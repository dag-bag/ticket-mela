import { NextResponse } from "next/server";
import { setDoc, doc } from "firebase/firestore";
import { writeBatch } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import dateToTimestamp from "@/app/libs/dateToTimestamp";
import ticketArrayGenerator from "@/app/libs/ticketArray";
import shortenUrlWithTinyURL from "@/app/libs/shortenTinyUrl";
import { sendSMS } from "@/utils/sms";

export async function POST(request: Request) {
  // Parse the raw content as URL-encoded data
  const formData = new URLSearchParams(await request.text());
  // Extract the form values
  const id = formData.get("id");
  const customer_vpa = formData.get("customer_vpa");
  const amount = formData.get("amount");
  const client_txn_id = formData.get("client_txn_id");
  const customer_name = formData.get("customer_name");
  const customer_email = formData.get("customer_email");
  const customer_mobile = formData.get("customer_mobile");
  const p_info = formData.get("p_info");
  const upi_txn_id = formData.get("upi_txn_id");
  const status = formData.get("status");
  const remark = formData.get("remark");
  const udf1 = formData.get("udf1");
  const udf2 = formData.get("udf2");
  const udf3 = formData.get("udf3");
  const txnAt = formData.get("txnAt");
  const redirect_url = formData.get("redirect_url");
  const createdAt = formData.get("createdAt");

  const qta = formData.get("udf2");
  const qtc = formData.get("udf1");

  const batch = writeBatch(db);
  const tickets = parseInt(qta as string) + parseInt(qtc as string);
  const ticketIds = ticketArrayGenerator(tickets);

  ticketIds.forEach(async (id2, index) => {
    const nycRef = doc(db, "tickets", id2 as any);
    const timestamp = dateToTimestamp("29-10-2023");
    batch.set(nycRef, {
      id: id2,
      number: customer_mobile,
      isExpired: false,
      entry_date: timestamp,
      type: "tickets",
      name: customer_name,
    });
  });
  const sanitizedUsername = encodeURIComponent(customer_name || "test");
  const tickedUrls = `https://www.tickets.sasahyog.com/ticket?ids=${ticketIds.join(
    ","
  )}&mobile=${customer_mobile}&n=${sanitizedUsername}`;
  return await batch
    .commit()
    .then(async () => {
      const shortenedUrl = await shortenUrlWithTinyURL(tickedUrls);
      console.log(udf3);
      sendSMS(
        ["8766203976"],
        `नमस्ते ${customer_name},\n\nरोटारी क्लब बरेली के दिवाली मेला में शामिल होने के लिए धन्यवाद! इस लिंक का इस्तेमाल कर अपनी टिकट प्राप्त करें!\n\n${shortenedUrl}\n\nससहयोग टेक्नोलॉजीज की और से दिवाली की बहुत बहुत शुभकामनाएं`
      );

      return new Response(request.url, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    })
    .catch((error) => console.log(error));
}
