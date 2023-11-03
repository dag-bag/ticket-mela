"use client";
import Cred from "@/components/admin/change-password-modal";
import { collection, getDocs, query } from "firebase/firestore";
import React from "react";
import { db } from "../../../../../firebase.config";
import useSWR from "swr";
import Loading from "@/components/admin/loading";
export default async function Page() {
  const { data, error, isLoading, mutate } = useSWR(
    "/credentials",
    getAllUsers
  );
  if (isLoading) return <Loading />;
  // Define your fake JSON data
  return <Cred data={data} mutate={mutate} />;
}

async function getAllUsers(): Promise<User[]> {
  try {
    const usersCollection = collection(db, "users"); // Replace "users" with your Firestore collection name

    const usersSnapshot = await getDocs(query(usersCollection));
    const usersData: User[] = [];

    usersSnapshot.forEach((doc) => {
      usersData.push({
        id: doc.id,
        ...doc.data(),
      } as User);
    });

    return usersData;
  } catch (error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}

interface User {
  id: string;
  // Add more fields as needed
}
