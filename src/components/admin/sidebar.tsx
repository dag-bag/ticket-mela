"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Sidebar() {
  const { logoUrl, menuItems, user } = data;
  const { data: session } = useSession();
  return (
    <aside className="flex flex-col w-full h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <Link href={"https://www.sasahyog.com"}>
        <div className="flex items-center rounded-xl mb-2 text-white">
          <Image width={70} height={20} src={"/logo.png"} alt="company_name" />
          <p className="font-medium text-sm md:text-md">
            <span className="text-[12px]">Powered by</span> <br />
            <b>Sasahyog Technologies</b>
          </p>
        </div>
      </Link>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <SideLink {...item} key={item.url} />
          ))}
        </nav>
        <button
          onClick={() => signOut()}
          className="flex items-center px-4 -mx-2"
        >
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
            {session?.user?.email}
          </span>
        </button>
      </div>
    </aside>
  );
}
import { IconType } from "react-icons";

interface SideLinkProps {
  url: string;
  icon: IconType;
  text: string;
  isActive: boolean;
}
const SideLink: React.FC<SideLinkProps> = ({
  url,
  icon: Icon,
  text,
  isActive,
}) => {
  const linkClassName = `flex items-center px-4 py-2 mt-2 ${
    isActive
      ? "text-blue-400 bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
      : "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
  } rounded-md`;

  return (
    <Link href={`/admin/${url}`}>
      <p className={linkClassName}>
        <Icon className="w-5 h-5" />
        <span className="mx-4 font-medium">{text}</span>
      </p>
    </Link>
  );
};
import { IoTicketSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuCandyCane } from "react-icons/lu";
import { BsCalendar4Event } from "react-icons/bs";
import { LiaAdSolid } from "react-icons/lia";
export const data = {
  logoUrl: "https://merakiui.com/images/logo.svg",
  menuItems: [
    {
      text: "Sales",
      url: "/tickets",
      isActive: false,
      icon: IoTicketSharp,
    },
    {
      text: "Credentials",
      url: "/credentials",
      isActive: false,
      icon: RiLockPasswordLine,
    },
    {
      text: "Lottery",
      url: "/lottery",
      isActive: false,
      icon: LuCandyCane,
    },
    {
      text: "Form ",
      url: "/config",
      isActive: false,
      icon: IoTicketSharp,
    },
    {
      text: "Event Details",
      url: "/events",
      isActive: false,
      icon: BsCalendar4Event,
    },
    {
      text: "Ads",
      url: "/ads",
      isActive: false,
      icon: LiaAdSolid,
    },
  ],
  user: {
    name: "John Doe",
    avatarUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
};
