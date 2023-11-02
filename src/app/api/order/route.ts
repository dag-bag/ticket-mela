import axios from "axios";
import { NextResponse } from "next/server";
import customFirestoreDocIdGenerator from "@/app/libs/customFirestoreDocIdGenerator";
export async function POST(request: Request) {
  const body = await request.json();
  try {
    return await axios
      .post("https://api.ekqr.in/api/create_order", {
        p_info: "Tickets",
        udf1: body.udf1,
        udf2: body.udf2,
        udf3: body.udf3,
        amount: body.amount,
        customer_name: body.customer_name,
        redirect_url: "http://google.com",
        customer_email: "test@gmail.com",
        customer_mobile: body.customer_mobile,
        key: "3e3feeca-9ab1-4476-b8f2-61caf05618a8",
        client_txn_id: customFirestoreDocIdGenerator(),
      })
      .then((res) => {
        console.log(res.data);
        return NextResponse.json({ ...res.data });
      });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error });
  }
}
