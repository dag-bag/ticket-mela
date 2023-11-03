import React from "react";

import Link from "next/link";
import Ticket from "../../components/Ticket";
import SelfAdvertisement from "../../components/SelfAdvertisement";

export default async function Page({ searchParams }: any) {
  const ids = searchParams.ids.split(",");
  return (
    <div>
      <div className="fixed top-0 left-0 bg-white w-full flex items-center justify-between md:px-10">
        <SelfAdvertisement />
        <Link
          href={"https://create.wa.link/"}
          className="md:text-md font-bold underline text-sm"
        >
          Automate your business?
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-full min-h-screen p-6 bg-gray-100 mb-10 md:mb-0 ">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20">
          {ids.map((id: string) => (
            <Ticket key={id} id={id} searchParams={searchParams} />
          ))}
        </div>
      </div>
    </div>
  );
}
