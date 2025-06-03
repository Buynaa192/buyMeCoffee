"use client";
import { api } from "@/axios";
import { SignUp } from "@/components/auth/SIGNUP/signUp";
import { Step2 } from "@/components/auth/SIGNUP/step2";
import Link from "next/link";
import { useState } from "react";
export type StepType = {
  step: number;
  setStep: (value: number) => void;
  values: DataType;
  setValues: React.Dispatch<React.SetStateAction<DataType>>;
};
export type DataType = {
  email: string;
  password: string;
  userName: string;
};
export default function Home() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<DataType>({
    userName: "",
    email: "",
    password: "",
  });

  const handelStep = (value: number) => {
    const LimitedValue = Math.max(1, Math.min(2, value));
    setStep(LimitedValue);
  };

  return (
    <div className="w-full h-full  flex flex-col items-center ">
      <div className=" w-[calc(100%-80px)] h-20 flex items-end justify-end">
        <Link href={"/login"}>
          <button className="h-10 w-[73px] bg-[#F4F4F5] rounded-md">
            Log in
          </button>
        </Link>
      </div>
      {step === 1 && (
        <SignUp
          step={step}
          setStep={handelStep}
          values={values}
          setValues={setValues}
        />
      )}
      {step === 2 && (
        <Step2
          step={step}
          setStep={handelStep}
          values={values}
          setValues={setValues}
        />
      )}
    </div>
  );
}
