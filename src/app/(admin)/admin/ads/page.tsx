import AdsManagement from "@/components/admin/ads-modal";
import React from "react";

export default async function page() {
  const ads = await getAds();
  return <AdsManagement data={ads} />;
}
async function getAds() {
  const res = await fetch("http://localhost:3000/api/ads", {
    next: { tags: ["ads"], revalidate: 500000 },
  });
  return res.json();
}
