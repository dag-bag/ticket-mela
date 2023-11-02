import React from "react";
import Cred from "@/components/admin/config-modal";
export default async function Page() {
  const data = await getAllUsers();
  // Define your fake JSON data

  return <Cred data={data} />;
}
async function getAllUsers() {
  const res = await fetch("http://localhost:3000/api/forms", {
    next: { tags: ["forms"], revalidate: 600000 },
  });
  return res.json();
}
