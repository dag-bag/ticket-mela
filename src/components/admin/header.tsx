"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { HiMenuAlt3 } from "react-icons/hi";
import SelfAdvertisement from "@/components/SelfAdvertisement";
const Header = () => {
  return (
    <div className="flex items-center justify-between pr-5">
      <SelfAdvertisement /> <MobileNavBar items={I} />
    </div>
  );
};

export default Header;

interface NavItem {
  text: string;
  url: string;
  isActive: boolean;
}

interface MobileNavBarProps {
  items: NavItem[];
}

import { useState } from "react";

const MobileNavBar: React.FC<MobileNavBarProps> = ({ items }) => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLinkClick = (url: string) => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <button
        className="block lg:hidden bg-gray-200 text-gray-800 px-4 py-2 rounded"
        onClick={togglePopup}
      >
        <HiMenuAlt3 size={25} />
      </button>
      {isPopupOpen && (
        <div className="absolute z-10 top-0 right-0 left-0 bg-white border border-gray-300 shadow-lg">
          <ul className="py-2">
            {items.map((item: NavItem, index: number) => (
              <li key={index}>
                <Link
                  href={`/admin${item.url}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={() => handleLinkClick(item.url)}
                >
                  {item.text}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
          <button
            className="block lg:hidden bg-gray-200 text-gray-800 w-full text-center py-2"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const I = [
  {
    text: "Sales",
    url: "/tickets",
    isActive: false,
  },
  {
    text: "Credentials",
    url: "/credentials",
    isActive: false,
  },
  {
    text: "Lottery",
    url: "/lottery",
    isActive: false,
  },
  {
    text: "Form ",
    url: "/config",
    isActive: false,
  },
  {
    text: "Event Details",
    url: "/events",
    isActive: false,
  },
  {
    text: "Ads",
    url: "/ads",
    isActive: false,
  },
];
