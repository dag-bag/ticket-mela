"use client";
import React from "react";
import Cred from "@/components/admin/config-modal";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../../../firebase.config";
import useSWR from "swr";
import Loading from "@/components/admin/loading";
export default function Page() {
  const { data, error, isLoading, mutate } = useSWR("/forms", getAllUsers);
  if (isLoading) return <Loading />;
  // Define your fake JSON data

  return <Cred data={data} />;
}
async function getAllUsers(): Promise<any> {
  try {
    const usersCollection = collection(db, "forms"); // Replace "users" with your Firestore collection name

    const usersSnapshot = await getDocs(query(usersCollection));
    const usersData: any = [];

    usersSnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        ...doc.data(),
      } as any);
    });

    return usersData;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}
