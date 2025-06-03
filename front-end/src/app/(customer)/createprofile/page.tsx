"use client";
import { CreateProfileStep1 } from "@/components/createProfile/CreateProfileStep1";
import { CreateProfileStep2 } from "@/components/createProfile/CreateProfileStep2";
import { useState } from "react";

export default function CreateProfileStep() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full h-[calc(100%-64px)] flex flex-col   items-center ">
      <div className="flex items-center justify-center  w-full h-full">
        {step === 1 && <CreateProfileStep1 step={step} setStep={setStep} />}
        {step === 2 && <CreateProfileStep2 />}
      </div>
    </div>
  );
}
