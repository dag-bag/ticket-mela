"use client";
import { signOut, useSession } from "next-auth/react";
// import { signOut, useSession } from "next-auth/react";
import QRCodeScanner from "../components/Scanner";
export default function Home() {
  const { data: session } = useSession();
  return (
    <div className=" h-screen w-full max-w-md m-auto flex items-center justify-center">
      {JSON.stringify(session)}
      {/* <button className="text-black" onClick={() => signOut()}>
        Sign
      </button> */}
      <button
        onClick={() => signOut()}
        className="bg-indigo-500 text-white font-bold px-20 py-3 text-xl rounded-lg"
      >
        LogOut
      </button>
      <QRCodeScanner />
    </div>
  );
}
