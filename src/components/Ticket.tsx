"use client";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

const Ticket = ({ id, searchParams }: any) => {
  const [type, setType] = useState(null);
  const [isExpired, setExpired] = useState(null);
  const [expiry_date, setExpiryDate] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "tickets", id), (doc) => {
      const readable_data = doc.data();
      setExpired(readable_data?.isExpired);
      setType(readable_data?.type);
      setExpiryDate(readable_data?.entry_date);
    });
    return () => {
      unsub();
    };
  });
  return (
    <div className="bg-white rounded-lg shadow-md p-5 text-center">
      <QRCode value={`${id}`} className="w-full" />
      <p className="text-[12px] mt-1 font-medium">{id}</p>
      <div className="grid grid-cols-2">
        <div>
          <h3 className="font-bold capitalize mt-2 text-left">
            {searchParams?.n}
          </h3>

          <h2 className="font-medium font-mono text-left">
            {searchParams?.mobile}
          </h2>
          <h2 className="text-sm font-mono text-gray-500 text-left">
            {expiry_date && formatDate(expiry_date)}
          </h2>
          <p
            className={`capitalize font-semibold text-left     text-sm rounded-xl  ${
              type == "adult"
                ? "text-blue-800 border-blue-800"
                : "text-pink-500 border-pink-500"
            } `}
          >
            {type || "loading"}
          </p>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <p
            className={`capitalize font-semibold mt-5 border  inline-block px-3  text-sm rounded-xl  ${
              isExpired == true
                ? "text-red-500 border-red-500"
                : "text-green-500 border-green-500"
            } `}
          >
            {isExpired == true ? "expired" : "active"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1.
  const year = date.getFullYear();

  // Ensure that the day and month have two digits (e.g., 01, 02, 03).
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
}
