"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import { logout } from "../app/store/auth";
import { usePathname, useRouter } from "next/navigation";
import { setNavExpanded, setCurrentTab } from "@/app/store/ui";
import Image from "next/image";

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
    name: "Challan Book",
    path: "/challanbook",
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

const divClasses =
  "flex items-center justify-start w-68 h-14 mb-4  rounded-2xl text-gray-900 text-lg transition-all duration-300 select-none pl-3";

export default function Navbar() {
  const navExpanded = useSelector((state: RootState) => state.ui.navExpanded);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = navItems
    .filter((tab) => tab.path == pathname)
    .map((tab) => tab.name)[0];

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const setCurrentTabHandler = (tabName: string) => {
    dispatch(setCurrentTab(tabName));
  };

  // Update tab when pathname changes
  useEffect(() => {
    const tab = navItems.find((tab) => tab.path === pathname);
    if (tab) {
      dispatch(setCurrentTab(tab.name));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (pathname !== "/dashboard" && navExpanded) {
      dispatch(setNavExpanded(false));
    }
  }, [pathname, navExpanded]);

  return (
    <>
      {navExpanded && (
        <aside
          className='fixed top-0 mt-8 left-0 h-screen bg-blue-100 flex flex-col transition-all duration-200 shadow-md z-[100] w-68 items-start'
          style={{ paddingTop: 56 }}>
          <div className={divClasses}>
            <Image
              src='/user.svg'
              alt='user'
              width={48}
              height={48}
              className='w-12 h-12 rounded-2xl object-contain bg-[#008CFF]'
            />
            <span className='ml-2 text-lg font-semibold whitespace-nowrap'>
              {user?.name || "User"}
            </span>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.name !== "Log-out" ? item.path : "/"}
              onClick={
                item.name === "Log-out"
                  ? handleLogout
                  : () => setCurrentTabHandler(item.name)
              }
              className={divClasses}>
              <Image
                src={item.icon}
                alt={item.name}
                width={48}
                height={48}
                className={`w-12 h-12 rounded-2xl object-contain ${
                  item.name === currentTab ? "bg-[#1447E6]" : "bg-[#008CFF]"
                }`}
              />
              <span className='ml-2 text-lg font-semibold whitespace-nowrap '>
                {item.name}
              </span>
            </Link>
          ))}
        </aside>
      )}
    </>
  );
}
