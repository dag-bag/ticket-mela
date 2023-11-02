"use client";
import { useSearchParams } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
const Page = () => {
  const p = useSearchParams();
  return (
    <div>
      <CheckoutForm n={p.get("n")} />
    </div>
  );
};

export default Page;
