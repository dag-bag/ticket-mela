"use client";
import axios from "axios";
import React from "react";
export default function LotteryPage() {
  const [data, setData] = React.useState<any>(undefined);
  const [status, setStatus] = React.useState("idle");
  const [number, setNumber] = React.useState<number>(0);
  const getWinners = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    const data = await axios.post("/api/test", { winnersCount: number });
    setStatus("idle");
    setData(data.data);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-center">
          <img src="/logo.png" width={150} className="mx-auto" />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Lottery Winners
            </h3>
          </div>
        </div>
        <form onSubmit={getWinners}>
          <div>
            <label className="font-medium">Number Of Winners</label>
            <input
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
              type="number"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            {status === "idle" ? "Generate Winners" : "Generating..."}
          </button>
        </form>
      </div>
      {/* {JSON.stringify(data.data)} */}
      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        {data &&
          data.data.map((participants: any, i: number) => {
            return (
              <div
                className="font-bold text-lg rounded-md font-mono border p-3"
                key={i}
              >
                {participants.phone}
              </div>
            );
          })}
      </div>
    </main>
  );
}
