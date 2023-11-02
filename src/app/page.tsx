import TestForm from "@/components/Test";
import { getEventById } from "@/services/events";
import React from "react";

export default async function page() {
  const data = await getFormData();
  const content = await getEventById("sScBCxKTOVcw3y15jHaM");
  return <TestForm data={data} content={content} />;
}

async function getFormData() {
  const res = await fetch(
    "https://main--shimmering-daifuku-1fac39.netlify.app/api/forms",
    {
      next: { tags: ["forms"], revalidate: 60 },
    }
  );
  return res.json();
}
