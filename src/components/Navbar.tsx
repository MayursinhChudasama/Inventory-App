"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { toggleNav } from "@/app/store/ui";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

const navItems = [
  {
    name: "Add New Challan",
    path: "/add",
    icon: "/add.svg",
  },
  {
    name: "Search",
    path: "/search",
    icon: "/search.svg",
  },
  {
    name: "Challan Register",
    path: "/register",
    icon: "/register.svg",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "/settings.svg",
  },
  {
    name: "Log-out",
    path: "/login",
    icon: "/logout.svg",
  },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navExpanded = useSelector((state: RootState) => state.ui.navExpanded);
  const pathname = usePathname();

  useEffect(() => {
    if (navExpanded) {
      dispatch(toggleNav());
    }
  }, [pathname]);

  return (
    <aside
      className={`fixed top-0 mt-8 left-0 h-screen bg-blue-200 flex flex-col transition-all duration-200 shadow-md z-[100] ${
        navExpanded ? "w-70 items-start" : "w-16 items-center"
      }`}
      style={{ paddingTop: 56 }}>
      <div
        className={`flex items-center ${
          navExpanded ? "justify-start w-[180px] pl-6" : "justify-center w-12"
        } h-14 mb-4 rounded-2xl text-gray-900 text-lg transition-all duration-300 select-none`}>
        <img
          src='/user.svg'
          alt='user'
          className='w-12 h-12 object-contain'
        />
        {navExpanded && (
          <span className='ml-4 text-lg font-semibold whitespace-nowrap'>
            User
          </span>
        )}
      </div>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className={`flex items-center ${
            navExpanded ? "justify-start w-[180px] pl-6" : "justify-center w-12"
          } h-14 mb-4 rounded-2xl text-gray-900 text-lg no-underline transition-all duration-300`}>
          <img
            src={item.icon}
            alt={item.name}
            className='w-12 h-12 object-contain'
          />
          {navExpanded && (
            <span className='ml-4 text-lg font-semibold whitespace-nowrap'>
              {item.name}
            </span>
          )}
        </Link>
      ))}
    </aside>
  );
}
