import twilio from "twilio";
const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
const token = <string>process.env.TWILIO_AUTH_TOKEN;
const Tclient = twilio(accountSid, token);

export { Tclient };
