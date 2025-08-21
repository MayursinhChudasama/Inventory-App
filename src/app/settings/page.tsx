"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Category from "@/components/settings/Category";
import Users from "@/components/settings/Users";
import { useGetProductsQuery } from "../store/productsApi";
import Loading from "@/components/Loading";

type ContentType = "category" | "users" | null;

export default function Settings() {
  const [activeContent, setActiveContent] = useState<ContentType>("category");
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  // const settingsData = JSON.parse(JSON.stringify(products));
  // delete settingsData._id;
  // console.log("settingsData", settingsData);
  useEffect(() => {
    if (activeContent === "users" && !isAdmin) {
      setActiveContent("category");
    }
  }, [isAdmin, activeContent]);

  const renderContent = () => {
    switch (activeContent) {
      case "category":
        return <Category />;
      case "users":
        return isAdmin ? <Users /> : null;
      default:
        return null;
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-center space-x-4 mb-6'>
        <button
          onClick={() => setActiveContent("category")}
          className={`px-6 py-2 transition-colors ${
            activeContent === "category"
              ? "bg-blue-500 text-white rounded-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}>
          Category
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveContent("users")}
            className={`px-6 py-2 transition-colors ${
              activeContent === "users"
                ? "bg-blue-500 text-white rounded-md"
                : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Users
          </button>
        )}
      </div>

      {renderContent()}
    </div>
  );
}
