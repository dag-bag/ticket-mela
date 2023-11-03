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
          .required(`"${field.category}" is required`);
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
        <label htmlFor={field.id}>{field.label}</label>
        <Field
          type={field.type}
          id={field.id}
          name={field.name}
          placeholder={field.placeholder}
          className="px-2 py-2 rounded-md w-full border placeholder:text-sm font-mono"
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
    <div className="w-screen h-screen md:flex md:items-center md:justify-center">
      <div className="max-w-md">
        <div className="flex items-center justify-center mt-5">
          <SelfAdvertisement />
        </div>
        <h2 className="text-xl mb-3 font-bold text-center">{content?.title}</h2>
        <p className="text-center text-sm mb-3 px-2 font-medium text-gray-500">
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
              <Form className="w-full grid space-y-2 p-5">
                {/* Render dynamic input fields */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="px-2 py-2 rounded-md w-full border placeholder:text-sm font-mono"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Mobile Number (WhatsApp Only)</label>
                  <Field
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Mobile Number"
                    className="px-2 py-2 rounded-md w-full border placeholder:text-sm font-mono"
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="selectedDate">Select a Date</label>
                  <Field
                    as="select"
                    id="selectedDate"
                    name="selectedDate"
                    className="px-2 py-2 rounded-md w-full border !font-mono"
                  >
                    <option value="">Select a Date</option>
                    <option value="4-10-2023">4-10-2023</option>
                    <option value="5-10-2023">5-10-2023</option>
                    <option value="6-10-2023">6-10-2023</option>
                  </Field>
                  <ErrorMessage
                    name="selectedDate"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {renderDynamicFields()}
                <button
                  type="submit"
                  className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={total === 0 || isSubmitting}
                >
                  {isSubmitting ? "Loading..." : content.buttonText}
                  <span className="font-mono ml-2">{total}</span>
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

const extractCategoryValues = (
  formValues: Record<string, string>,
  data: any[]
): Record<string, string> => {
  const categories: string[] = data
    .filter((field) => field.category !== "N/A")
    .map((field) => field.category);

  const udf3: Record<string, string> = {};

  categories.forEach((category) => {
    udf3[category] = formValues[category];
  });

  return udf3;
};
