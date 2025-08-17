"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import { logout } from "../app/store/auth";
import { usePathname, useRouter } from "next/navigation";
import { setNavExpanded } from "@/app/store/ui";

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
  const navExpanded = useSelector((state: RootState) => state.ui.navExpanded);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (pathname !== "/dashboard" && navExpanded) {
      dispatch(setNavExpanded(false));
    }
  }, [pathname, navExpanded]);

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
            {user?.name || "User"}
          </span>
        )}
      </div>
      {navItems.map((item) =>
        item.name === "Log-out" ? (
          <div
            key={item.name}
            onClick={handleLogout}
            className={`flex items-center ${
              navExpanded
                ? "justify-start w-[180px] pl-6"
                : "justify-center w-12"
            } h-14 mb-4 rounded-2xl text-gray-900 text-lg transition-all duration-200 cursor-pointer hover:bg-blue-200`}>
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
          </div>
        ) : (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center ${
              navExpanded
                ? "justify-start w-[180px] pl-6"
                : "justify-center w-12"
            } h-14 mb-4 rounded-2xl text-gray-900 text-lg no-underline transition-all duration-200`}>
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
        )
      )}
    </aside>
  );
}
