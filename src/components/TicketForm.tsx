"use client";
import * as Yup from "yup";
import axios from "axios";
import PaymentPopup from "./Payment";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import SelfAdvertisement from "@/components/SelfAdvertisement";

const TicketForm = ({ data, content }: any): JSX.Element => {
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
    number: "",
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
        <label htmlFor={field.id} className="text-sm font-bold text-gray-600">
          {field.label}
        </label>
        <Field
          id={field.id}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          className="px-3 py-2.5 rounded-md mt-1 w-full border placeholder:text-sm"
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
      <div className="max-w-[430px] rounded-xl bg-white">
        <div className="flex items-center justify-center mt-5">
          <SelfAdvertisement />
        </div>
        <h2 className="text-2xl mb-3 font-[800] text-center">
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
              <Form className="w-full grid space-y-2 p-5 ">
                {/* Render dynamic input fields */}
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="text-sm text-gray-600 font-semibold"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="mt-1 px-3 py-2.5 rounded-md w-full border placeholder:text-sm "
                  />

                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="form-group">
                  <label
                    className="text-sm text-gray-600 font-semibold"
                    htmlFor="number"
                  >
                    Mobile Number (WhatsApp Only)
                  </label>
                  <Field
                    type="text"
                    id="number"
                    name="number"
                    placeholder="Mobile Number"
                    className="mt-1 px-3 py-2.5 rounded-md w-full border placeholder:text-sm "
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="form-group ">
                  <label
                    className="text-sm text-gray-600 font-semibold"
                    htmlFor="selectedDate"
                  >
                    Select Entry Date
                  </label>
                  <Field
                    as="select"
                    id="selectedDate"
                    name="selectedDate"
                    className="mt-1 px-3 py-3 rounded-md w-full border"
                  >
                    <option value="">Select a Date</option>
                    <option value="4-11-2023">4-10-2023</option>
                    <option value="5-11-2023">5-10-2023</option>
                    <option value="6-11-2023">6-10-2023</option>
                  </Field>
                  <ErrorMessage
                    name="selectedDate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {renderDynamicFields()}
                <div className="my-5" />
                <button
                  type="submit"
                  className=" bg-[#0264B0] text-white font-bold px-5 py-2 text-xl rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={total === 0 || isSubmitting}
                >
                  {isSubmitting ? "Loading..." : content.buttonText}
                  <span className="font-mono ml-2">₹{total}</span>
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TicketForm;
