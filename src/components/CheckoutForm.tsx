"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import SelfAdvertisement from "@/app/components/SelfAdvertisement";

export default function CheckoutForm({ n }: any): JSX.Element {
  const [response, setResponse] = useState<any>(undefined);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (data?.qtc && data?.qta && data?.name) {
      await axios
        .post("api/order", {
          udf1: `${data.qtc}`,
          udf2: `${data.qta}`,
          udf3: `${data.name}`,
          amount: `${data?.qta * 60 + data?.qtc * 30}`,
          customer_name: data.name,
          customer_mobile: n.replace(/91/g, ""),
        })
        .then((res) => {
          console.log(res.data);
          setPaymentPopup(true);
          setResponse(res.data);
        })
        .catch((err) => alert(err));
    } else {
      alert("Please fill form");
    }
  };

  if (paymentPopup) {
    return <PaymentPopup {...response} />;
  }

  return (
    <div className="w-screen h-screen md:flex md:items-center md:justify-center ">
      <div className="max-w-md">
        <div className="flex items-center justify-center mt-5">
          <SelfAdvertisement />
        </div>

        <h2 className="text-xl mb-3 font-bold text-center ">
          Buy Tickets for Mela
        </h2>
        <p className=" text-center text-sm mb-3 px-2 font-medium text-gray-500">
          Come and enjoy the festivities at Bareilly&apos;s largest mela! 🎉
        </p>

        <form className="w-full grid space-y-2 p-5" onSubmit={onSubmit}>
          <TextInput
            setData={setData}
            data={data}
            type="text"
            name="name"
            title="Name"
            placeholder="Your Name"
          />

          <label>
            <p className="text-sm font-bold mb-1">Mobile Number</p>
            <input
              value={n}
              disabled
              className="px-2 py-2 rounded-md w-full border placeholder:text-sm font-mono"
              name={"number"}
              required
              type={"text"}
              placeholder="Mobile Number"
            />
          </label>

          <TextInput
            setData={setData}
            data={data}
            type="number"
            name="qtc"
            title="Children Ticket Quantity"
            placeholder="30 Rupees per person"
          />
          <TextInput
            setData={setData}
            data={data}
            type="number"
            name="qta"
            title="Adult Ticket Quantity"
            placeholder="60 Rupees per person"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg w-full"
          >
            Pay{" "}
            {data?.qta && data?.qtc ? (
              <span className="font-mono">
                ₹ {data?.qta * 60 + data?.qtc * 30}
              </span>
            ) : null}
          </button>
        </form>
      </div>
    </div>
  );
}
import QRCode from "react-qr-code";

const PaymentPopup = (props: any) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-5 rounded-xl min-w-[300px]">
        <SelfAdvertisement />
        <div className="">
          <QRCode
            value={props.data.upi_intent.bhim_link}
            className="w-[230px] mx-auto"
          />
        </div>

        <div>
          <p className="text-sm text-center font-bold my-3">Pay with Apps</p>
        </div>

        <div className="flex flex-col gap-2 ">
          <Button
            img="/paytm.png"
            href={props.data.upi_intent.paytm_link}
            title={"Paytm "}
          />
          <Button
            img="/Phonepe.png"
            href={props.data.upi_intent.phonepe_link}
            title={"PhonePe "}
          />
          <Button
            img="/gpay.png"
            href={props.data.upi_intent.gpay_link}
            title={"Gpay "}
          />
          <Button
            img="/BHIM.png"
            href={props.data.upi_intent.bhim_link}
            title={"Bhim Pay "}
          />
        </div>
      </div>
    </div>
  );
};

import Image from "next/image";

const Button = ({ href, title, img }: any) => {
  return (
    <Link
      href={href}
      className=" bg-gray-100 border flex px-10 rounded-full itmes-center justify-center p-2"
    >
      <Image src={img} alt={title} height={20} width={100} />
    </Link>
  );
};

const LoadingComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-white">
      <div className=" font-semibold text-center">
        <div className="loader">Loading...</div>
      </div>
    </div>
  );
};

const TextInput = ({ title, name, placeholder, type, setData, data }: any) => {
  return (
    <label>
      <p className="text-sm font-bold mb-1">{title}</p>
      <input
        onChange={(e) => {
          setData({ ...data, [name]: e.target.value });
        }}
        className="px-2 py-2 rounded-md w-full border placeholder:text-sm font-mono"
        name={name}
        required
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
};

{
  /* <div className="bg-white w-[300px] p-2 rounded-xl">
<SelfAdvertisement />
<h2 className="text-xl mb-3 font-bold text-center ">
  Buy Tickets for Mela
</h2>
<p className=" text-center text-sm mb-3 px-2 font-medium text-gray-500">
  Come and enjoy the festivities at Bareilly&apos;s largest mela! 🎉
</p>

<form className="w-full grid" onSubmit={onSubmit}>
  <button
    type="submit"
    className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg w-full"
  >
    Buy
  </button>
</form>

<a href="upi://pay?pa=VYAPAR.167536626998@HDFCBANK&pn=YOGESH%20KUMAR%20AGARWAL&am=1&tn=20260781698559205289&tr=20260781698559205289">
  pay here
</a>
</div> */
}
