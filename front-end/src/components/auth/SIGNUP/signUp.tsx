"use client";

import { StepType } from "@/app/(auth)/signup/page";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { api } from "@/axios";

export const SignUp = ({ values, setValues, step, setStep }: StepType) => {
  const [error, setError] = useState("");
  const [userNameCheck, setUserNameCheck] = useState(false);
  useEffect(() => {
    checkUsername();
  }, [values.userName]);

  const checkUsername = async () => {
    try {
      const response = await api.post("/auth/checkusername", {
        username: values.userName,
      });
      setUserNameCheck(response.data.isExist);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheck = () => {
    if (values.userName === "") {
      setError("user name hooson baina");
      return;
    }
    if (userNameCheck === true) {
      setError("The username is already taken");
      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, userName: e.target.value });
  };

  return (
    <div className="w-[427px] h-[256px] mt-100 ">
      <div className=" w-full h-[106px] p-6">
        <p className="font-bold text-[24px]">Create Your Account</p>
        <p className="text-[14px] text-[#71717A]">
          Choose a username for your page
        </p>
      </div>
      <div className=" w-full h-[106px] pl-[24px] pr-[24px] flex flex-col gap-2 ">
        <p className="font-bold text-[14px]">Username</p>
        <input
          placeholder=" Enter username here"
          className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
          onChange={handleUserNameChange}
        ></input>

        {error && (
          <div className=" text-red-500 flex gap-2 ">
            <XCircle />
            {error}
          </div>
        )}
      </div>
      {/* {userNameCheck === true ? (
          <div className=" text-red-500 flex gap-2 ">
            <XCircle />
            <p>The username is already taken</p>
          </div>
        ) : (
          <div className=" text-green-500 flex gap-2 ">
            <XCircle />
            <p>Username available</p>
          </div>
        )} */}
      <div className=" w-full h-16 flex justify-center">
        <Button
          onClick={() => handleCheck()}
          className="w-96 h-10 bg-[#E4E4E7] rounded-md hover:bg-black hover:text-white"
          variant="default"
        >
          continue
        </Button>
      </div>
    </div>
  );
};
