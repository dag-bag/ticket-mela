import Cred from "@/components/admin/change-password-modal";
import React, { useState } from "react";

export default async function Page() {
  const data = await getAllUsers();
  // Define your fake JSON data

  return <Cred data={data} />;
}

// Function to fetch all users from Firestore
async function getAllUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    next: { tags: ["users"], revalidate: 600000 },
  });
  return res.json();
}
