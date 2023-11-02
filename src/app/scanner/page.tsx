"use client";
import { signOut, useSession } from "next-auth/react";
// import { signOut, useSession } from "next-auth/react";
import QRCodeScanner from "../components/Scanner";
export default function Home() {
  const { data: session } = useSession();
  return (
    <div className=" h-screen w-full max-w-md m-auto flex items-center justify-center">
      <QRCodeScanner />
    </div>
  );
}
