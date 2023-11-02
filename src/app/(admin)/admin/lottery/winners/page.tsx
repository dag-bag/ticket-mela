import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "../../../../../../firebase.config";

export default async function page() {
  const data = await getWinners();
  return <div>{JSON.stringify(data)}</div>;
}

async function getWinners() {
  const winnersCollection = collection(db, "lottery_participants"); // Replace "winners" with your collection name
  const querySnapshot = await getDocs(winnersCollection);

  return querySnapshot.docs.map((doc) => doc.data());
}
