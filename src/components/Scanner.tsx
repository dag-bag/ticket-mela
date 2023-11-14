import Alert from "./Alert";
import React, { useState } from "react";
import { db } from "../../firebase.config";
import { type Message, Status } from "../types";
import SelfAdvertisement from "./SelfAdvertisement";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "next-auth/react";

const expireTickedApi = async (
  id: string,
  phone: string,
  docRef: any,
  setMessage: any
) => {
  return await updateDoc(docRef, { isExpired: true })
    .then(() => {
      setMessage("current_expired");
    })
    .then(async () => {
      const lottery_participants = doc(db, "lottery_participants", `${id}`);
      await setDoc(lottery_participants, { phone });
    });
};

const QRCodeScanner = () => {
  const [message, setMessage] = useState<Message>(null);
  const [status, setStatus] = useState<Status>("close");

  const handleOpen = () => {
    setStatus("open");
  };

  const handleError = (err: any) => {
    console.log(err);
  };

  const handleCloseAleart = () => {
    setMessage(null);
    setStatus("open");
  };

  const handleDecode = async (id: any) => {
    setStatus("loading");
    const docRef = doc(db, "tickets", `${id}`);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { entry_date, isExpired, phone } = docSnap.data();
        if (new Date().getDate() == new Date(entry_date).getDate()) {
          if (isExpired) {
            setMessage("alredy_expired");
          } else {
            await expireTickedApi(id, phone, docRef, setMessage);
          }
        } else {
          setMessage("entry_date_expired");
        }
      } else {
        setMessage("not_generated");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {message !== null && (
        <Alert message={message} handle={handleCloseAleart} />
      )}
      {status === "open" && message === null && (
        <QrScanner onDecode={handleDecode} onError={handleError} />
      )}
      {status == "close" && (
        <div>
          <SelfAdvertisement />
          <button
            onClick={handleOpen}
            className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg"
          >
            Start Scanning
          </button>
        </div>
      )}{" "}
    </>
  );
};

export default QRCodeScanner;
