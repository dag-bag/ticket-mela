"use client";
import AdsManagement from "@/components/admin/ads-modal";
import Loading from "@/components/admin/loading";
import { collection, getDocs, query } from "firebase/firestore";
import React from "react";
import useSWR from "swr";
import { db } from "../../../../../firebase.config";

export default function Page() {
  const { data, isLoading } = useSWR("/ads", getAds);
  if (isLoading) return <Loading />;
  return <AdsManagement data={data} />;
}
async function getAds(): Promise<any> {
  try {
    const usersCollection = collection(db, "ads"); // Replace "users" with your Firestore collection name

    const usersSnapshot = await getDocs(query(usersCollection));
    const usersData: any = [];

    usersSnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return usersData;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}
