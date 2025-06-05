"use client";
import { StepType } from "@/app/(auth)/signup/page";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/userProvider";
import { AxiosError } from "axios";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export const Step2 = ({ values, setValues }: StepType) => {
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [box, setBox] = useState(false);
  const Router = useRouter();
  const { setUser } = useAuth();
  const isValidEmail = (email: string) => {
    const emailRegex =
      /[a-zA-Z]+[(a-zA-Z0-9-\\_\\.!\\D)]*[(a-zA-Z0-9)]+@[(a-zA-Z)]+\.[(a-zA-Z)]{2,3}/;
    return emailRegex.test(email);
  };
  const addUser = async () => {
    try {
      const { data } = await api.post("/auth/signup", {
        email: values.email,
        password: values.password,
        username: values.userName,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);
      console.log("dataa", data);

      Router.push("/createprofile");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Signup failed";
      setEmailError(message);
    }
  };

  const handleCheck = () => {
    if (values.email === "") {
      setEmailError("hooson baina");
      return;
    }
    if (!isValidEmail(values.email)) {
      setEmailError("please enter a valid email address");
      return;
    }
    if (values.password.length < 8) {
      setPassError("password bogino baina 8s deesh heregtei");
      return;
    }
    const hasLetter = /[A-Za-z]/.test(values.password);
    const hasNumber = /[0-9]/.test(values.password);
    if (values.password === "") {
      setPassError(" pass hooson baina");
      return;
    }
    if (!hasLetter || !hasNumber) {
      setPassError("useg too holioroi");
      return;
    }
    addUser();

    setEmailError("");
    setPassError("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: e.target.value });
  };

  return (
    <div className="w-[407px] h-[344px]  mt-100  flex flex-col gap-3">
      <div className=" w-full h-[106px] p-6">
        <p className="font-bold text-[24px]">Welcome {values.userName}</p>
        <p className="text-[14px] text-[#71717A]">
          Connect email and set a password
        </p>
      </div>
      <div className=" w-full h-[86px] pl-[24px] pr-[24px] ">
        <p className="font-bold text-[14px]">Email</p>
        <input
          onChange={handleEmailChange}
          type="email"
          placeholder=" Enter email here"
          className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
        ></input>
        {emailError && (
          <div className="text-[12px] text-red-500 flex gap-2 items-center mt-2">
            <XCircle size={16} />
            {emailError}
          </div>
        )}
      </div>
      <div className=" w-full h-[96px] pl-[24px] pr-[24px]   ">
        <p className="font-bold text-[14px]">password</p>
        <input
          onChange={handlePasswordChange}
          type={box === true ? "text" : "password"}
          placeholder=" Enter password here"
          className="w-full h-10 border-1 border-[#E4E4E7] rounded-md"
        ></input>
        <input onChange={() => setBox((prev) => !prev)} type="checkbox"></input>
        {passError && (
          <div className="text-[12px] text-red-500">{passError}</div>
        )}
      </div>

      <div className=" w-full h-16 flex justify-center ">
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
