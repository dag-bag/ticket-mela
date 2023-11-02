import twilio from "twilio";
const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
const token = <string>process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, token);

export async function POST(req: Request) {
  client.messages
    .create({
      body: "Your Tickets Are There",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: "+918766203976",
    })
    .then((message: any) =>
      Response.json({
        success: true,
      })
    )
    .catch((error: any) => {
      console.log(error);
      Response.json({
        success: false,
      });
    });
}
