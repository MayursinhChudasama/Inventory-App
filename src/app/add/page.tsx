"use client";
import { useState } from "react";
import { ChallanTypeButtons } from "@/components/register/ChallanTypeButtons";
import { ChallanType } from "@/models/register";
import InputForm from "@/components/InputForm/InputForm";

export default function Add() {
  const [activeChallanTab, setActiveChallanTab] =
    useState<ChallanType>("inward");

  return (
    <div
      className='flex flex-col items-center justify-start w-full min-h-screen  p-4 sm:p-6 md:p-8 max-w-md mx-auto'
      style={{ minHeight: "915px", maxWidth: "412px" }}>
      <ChallanTypeButtons
        names={["inward", "outward"]}
        activeChallanTab={activeChallanTab}
        setActiveChallanTab={setActiveChallanTab}
      />
      <InputForm
        key={activeChallanTab}
        activeChallanTab={activeChallanTab}
      />
    </div>
  );
}
