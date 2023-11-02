"use client";
declare global {
  interface Window {
    Razorpay: any;
  }
}
import axios from "axios";
import Script from "next/script";
import { type Body } from "../api/route";
import { useRouter, useSearchParams } from "next/navigation";
import SelfAdvertisement from "../components/SelfAdvertisement";

const accessToken =
  "EAANcjH4L2hkBO9ZCsInmmpeDTSFB73JfzICRcVLKEtkd2ocnZBZBalosGxEhwykcckhicR9argxpYuALmS4RtYMGKxdxKABZC6yCuaZCpOFZAvzupD30Y7IWZByP0qL0etqkyZBe00JuWb5FhIPqabBMRH5XT1gZAyJJrSOlGbeUjLWRzVuMmPfJPDZCQAHd7iyaRu";

export default function Page() {
  const router = useRouter();
  const P = useSearchParams();
  const lang = P.get("lang");
  // url must name qty mobile & n means name
  const getDataFromServer = async () => {
    const { data } = await axios.post("/api/payment", {
      qta: P.get("qta"),
      mobile: P.get("mobile"),
      username: P.get("n"),
      qtc: P.get("qtc"),
    });
    return data;
  };
  const handlePayment = () => {
    getDataFromServer().then((data) => {
      const options = {
        key: "rzp_test_pRflE2YIW49fNA",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: "Sample Transaction",
        description: "Test Transaction",
        handler: async function () {
          const name = P.get("n");
          const url =
            "https://graph.facebook.com/v18.0/122095984490018261/messages";

          await generateTickets({ ...data, entry_date: P.get("d") }).then(
            async ({ tickets }) => {
              await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                  messaging_product: "whatsapp",
                  recipient_type: "individual",
                  to: P.get("mobile"),
                  type: "interactive",
                  interactive: {
                    type: "button",
                    body: {
                      text:
                        lang === "english"
                          ? `Hello ${name},\n \nExciting news! You're all set for Rotart Club Bareilly South's Dusshera Mela. Access your event tickets through the provided link \n ${tickets} \n \nThere is Much more than just tickets`
                          : `नमस्ते ${name}, \n \nबड़े खुशी के साथ कहते हैं कि आपको रोटारी क्लब बरेली साउथ के दशहरा मेला में शामिल होने का सौभाग्य हुआ है। आगामी घटना के लिए कृपया दिए गए लिंक का उपयोग करके अपने टिकट देखें।\n ${tickets} \n \nटिकट्स के अलावा बहुत कुछ है`,
                    },
                    action: {
                      buttons: [
                        {
                          type: "reply",
                          reply: {
                            id: "UNIQUE_BUTTON_ID_1",
                            title:
                              lang === "english" ? "Mela Map!" : "मेला नक्शा",
                          },
                        },
                        {
                          type: "reply",
                          reply: {
                            id: "UNIQUE_BUTTON_ID_2",
                            title:
                              lang === "english"
                                ? "About Rotary Club"
                                : "रोटरी क्लब को जानें",
                          },
                        },
                        {
                          type: "reply",
                          reply: {
                            id: "UNIQUE_BUTTON_ID_3",
                            title:
                              lang === "english"
                                ? "About Sasahyog"
                                : "Sasahyog को जानें",
                          },
                        },
                      ],
                    },
                  },
                }),
              });
              router.push("http://wa.link/dsi49h");
            }
          );
        },
        modal: {
          ondismiss: function () {
            alert("Payment is dismissd!");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  return (
    <>
      {/* @ts-ignore */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="w-screen h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white w-[300px] p-2 rounded-xl">
          <SelfAdvertisement />
          <h2 className="text-xl mb-3 font-bold text-center ">
            Buy Tickets for Mela
          </h2>
          <p className=" text-center text-sm mb-3 px-2 font-medium text-gray-500">
            Come and enjoy the festivities at Bareilly&apos;s largest mela! 🎉
          </p>

          <button
            onClick={handlePayment}
            className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg w-full"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </>
  );
}

const generateTickets = async (data: any) => {
  const paylaod = {
    qta: data.qta,
    qtc: data.qtc,
    phone: data.mobile,
    username: data.username,
    entry_date: data.entry_date,
  };

  const ticketData = await axios.post("/api", paylaod as Body);
  return ticketData.data as ticketData;
};

export interface ticketData {
  tickets: string;
  phone: number;
}
