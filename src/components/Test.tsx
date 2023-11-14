"use client";
import * as Yup from "yup";
import axios from "axios";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import SelfAdvertisement from "@/app/components/SelfAdvertisement";
const TestForm = ({ data, content }: any): JSX.Element => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile Number must be a 10-digit number")
      .required("Mobile Number is required"),
    selectedDate: Yup.string().required("Date is required"),
    // @ts-ignore
    ...data.reduce((schema, field) => {
      if (field.category !== "N/A") {
        schema[field.name] = Yup.number()
          .nullable()
          .required(`${field.category} is required`);
      }
      return schema;
    }, {}),
  });

  // Initial form values based on data
  const initialFormValues: any = {
    name: "",
    number: 0,
  };
  data.forEach((field: any) => {
    initialFormValues[field.name] = field.type === "number" ? 0 : "";
    (initialFormValues as any)[field.name] = field.type === "number" ? 0 : "";
  });

  const [response, setResponse] = useState<any>(undefined);
  const [paymentPopup, setPaymentPopup] = useState(false);
  // @ts-ignore
  const onSubmit = async (values, { setSubmitting }: any) => {
    await axios
      .post("api/order", {
        udf1: `${values.ticket}`,
        udf2: `0`,
        udf3: values.selectedDate,
        amount: `${values.ticket * 1}`,
        customer_name: values.name,
        customer_mobile: values.number,
      })
      .then((res) => {
        console.log(res.data);
        setPaymentPopup(true);
        setResponse(res.data);
      })
      .catch((err) => alert(err));
  };

  // Helper function to render dynamic input fields
  const renderDynamicFields = () => {
    return data.map((field: any) => (
      <div className="form-group" key={field.id}>
        <label className="text-sm font-semibold" htmlFor={field.id}>
          {field.label}
        </label>
        <Field
          type={field.type}
          id={field.id}
          name={field.name}
          placeholder={field.placeholder}
          className="px-3 py-2 rounded-md w-full border placeholder:text-sm  "
        />
        <ErrorMessage
          name={field.name}
          component="div"
          className="text-red-500"
        />
      </div>
    ));
  };
  if (paymentPopup) {
    return <PaymentPopup {...response} />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="max-w-md bg-white rounded-xl">
        <div className="flex items-center justify-center mt-5">
          <SelfAdvertisement />
        </div>
        <h2 className="text-2xl mb-3 font-extrabold text-center">
          {content?.title}
        </h2>
        <p className="text-center text-sm mb-3 px-2 font-medium text-gray-500 italic">
          {content.description}
        </p>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, errors }: any) => {
            console.log(errors);
            const getTotalAmount = () => {
              let amount = 0;
              data.forEach((field: any) => {
                const categoryPrice = parseInt(field.price);
                const categoryValue = values[field.name];
                if (field.category !== "N/A") {
                  amount += categoryPrice * categoryValue;
                }
              });
              return amount;
            };
            const total = getTotalAmount();
            return (
              <Form className="w-full grid space-y-3 p-5 ">
                {/* Render dynamic input fields */}
                <div className="form-group">
                  <label className="text-sm font-semibold" htmlFor="name">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="px-3 py-2 rounded-md w-full border placeholder:text-sm  "
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                <div className="form-group">
                  <label className="text-sm font-semibold" htmlFor="number">
                    Mobile Number (WhatsApp Only)
                  </label>
                  <Field
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Mobile Number"
                    className="px-3 py-2 rounded-md w-full border placeholder:text-sm"
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                <div className="form-group">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="selectedDate"
                  >
                    Select Entry Date
                  </label>
                  <Field
                    as="select"
                    id="selectedDate"
                    name="selectedDate"
                    className="px-3 py-2.5 rounded-md w-full border"
                  >
                    <option value="">Select Date</option>
                    <option value="4-11-2023">4-11-2023</option>
                    <option value="5-11-2023">5-11-2023</option>
                    <option value="6-11-2023">6-11-2023</option>
                  </Field>
                  <ErrorMessage
                    name="selectedDate"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
                {renderDynamicFields()}
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold px-5 py-2 text-xl rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={total === 0 || isSubmitting}
                >
                  {isSubmitting ? "Loading..." : content.buttonText}
                  <span className="  ml-2">₹{total}</span>
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TestForm;

const PaymentPopup = (props: any) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-5 rounded-xl max-w-[450px] md:min-w-[450px] min-w-[300px] flex items-center flex-col">
        <SelfAdvertisement />
        <QRCode value={props.data.upi_intent.bhim_link} className=" mx-auto" />
        <p className="text-sm text-center font-bold my-3">
          Pay with Apps{" "}
          <span className="text-sm hidden md:inline">
            ( Only works in mobile )
          </span>
        </p>
        <div className="flex flex-col gap-2 w-full ">
          <Button
            img="/paytm.png"
            title={"Paytm"}
            href={props.data.upi_intent.paytm_link}
          />
          <Button
            img="/Phonepe.png"
            title={"PhonePe"}
            href={props.data.upi_intent.phonepe_link}
          />
          <Button
            img="/gpay.png"
            title={"Gpay"}
            href={props.data.upi_intent.gpay_link}
          />
          <Button
            img="/BHIM.png"
            title={"Bhim Pay"}
            href={props.data.upi_intent.bhim_link}
          />
          <p className=" text-gray-700 text-sm italic font-semibold p-5">
            <span className=" font-extrabold">Important Note -</span> After
            payment, it may take up to 5 minutes for tickets to appear on
            WhatsApp message.
          </p>
        </div>
      </div>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";
import QRCode from "react-qr-code";

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
