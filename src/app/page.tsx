import React from "react";
import TicketForm from "@/components/TicketForm";
import { getEventById } from "@/services/events";

export default async function page() {
  const data = await getFormData();
  const content = await getEventById("sScBCxKTOVcw3y15jHaM");
  return <TicketForm data={data} content={content} />;
}
async function getFormData() {
  const url = "https://main--shimmering-daifuku-1fac39.netlify.app/api/forms";
  const res = await fetch(url, {
    next: { tags: ["forms"], revalidate: 60 },
  });
  return res.json();
}
