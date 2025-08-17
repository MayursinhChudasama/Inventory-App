"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleNav } from "../app/store/ui";
import { RootState } from "../app/store/store";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const dispatch = useDispatch();
  const navExpanded = useSelector((state: RootState) => state.ui.navExpanded);
  const pathname = usePathname();

  return (
    <div className='w-full fixed top-0 left-0 z-[200]'>
      <div className='flex items-center bg-blue-200 h-14 relative w-full'>
        {pathname == "/dashboard" && (
          <button
            aria-label='Toggle navigation'
            onClick={() => dispatch(toggleNav())}
            className='bg-none border-none outline-none cursor-pointer ml-3 mr-4 flex items-center h-10 w-10 justify-center'>
            <img
              src={navExpanded ? "/hamburger down.svg" : "/hamburger.svg"}
              alt='menu'
              className={`w-7 h-7 transition-transform duration-200 `}
            />
          </button>
        )}
        {pathname !== "/dashboard" && (
          <Link
            href='/dashboard'
            aria-label='Back to home'
            className='flex items-center justify-center h-10 w-10 ml-2 mr-2'>
            <img
              src='/hamburger down.svg'
              alt='back'
              className='w-7 h-7 transform rotate-90 transition-transform duration-200'
            />
          </Link>
        )}
        <div className='flex-1 text-center font-semibold text-xl tracking-wide text-black'>
          HEADING
        </div>
      </div>
    </div>
  );
}
