const axios = require("axios"); // If you're using Node.js

function sendTemplateMessage(
  name: string,
  tickedUrls: string,
  customer_mobile: string
) {
  const url = "https://waba.sasahyog.com/api/v1/sendTemplateMessage";

  const data = {
    key: "af8f5f38093942c686f245bbb244b23b",
    to: `91${customer_mobile}`,
    languageCode: "hi",
    TemplateName: "ticket_new",
    headertype: "text",
    link: "",
    filename: "",
    headertext: "",
    BodyParameter: [
      {
        type: "text",
        text: name,
      },
      {
        type: "text",
        text: tickedUrls,
      },
    ],
  };

  axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response: any) => {
      console.log(response.data);
    })
    .catch((error: any) => {
      console.error("Error:", error);
    });
}

// Call the function to send the template message
export { sendTemplateMessage };
