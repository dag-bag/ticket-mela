import axios from "axios";

function sendSMS(numbers: string[], message: string): void {
  const data = {
    message,
    language: "english",
    route: "q",
    numbers: numbers.join(","),
  };

  const headers = {
    Authorization:
      "hg2lk6unfYtCT7IwFexjAaZiqU8DmdLXGBS4soO50ycv3PVQ1bXjZiPNwU82oz0a7RpOkYugLVKbl4AW",
  };

  axios
    .post("https://www.fast2sms.com/dev/bulkV2", data, { headers })
    .then((response) => {
      console.log("SMS sent successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
    });
}

// Example usage:
const apiKey = "YOUR_API_KEY"; // Replace with your Fast2SMS API key
const numbers = ["9999999999", "8888888888", "7777777777"];
const message = "This is a test message";

export { sendSMS };
