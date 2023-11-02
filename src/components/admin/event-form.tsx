"use client";
import React, { useState } from "react";
import { updateEvent } from "@/services/events";

const EventForm = ({ event }: any) => {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    buttonText: event?.buttonText || "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateEvent("sScBCxKTOVcw3y15jHaM", formData);
    console.log(formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold h-[150px] flex items-center pl-5">
        Event Details
      </h1>

      <div className=" px-5 max-w-md ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Button Text
            </label>
            <input
              type="text"
              id="buttonText"
              name="buttonText"
              value={formData.buttonText}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded shadow appearance-none"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-medium text-white bg-[#111827] rounded-md hover:bg-[#111827] focus:outline-none focus:shadow-outline-green active:bg-[#111827] transition duration-150 ease-in-out mt-5 flex items-center gap-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
