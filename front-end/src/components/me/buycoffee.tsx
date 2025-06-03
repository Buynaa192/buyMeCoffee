"use client";
import { CupLogo } from "@/assets/cupLogo";
import { useAuth } from "../userProvider";

export const BuyCoffee = () => {
  const { user } = useAuth();
  return (
    <div className="w-[628px] h-[509px] border-1 border-[#E4E4E7] rounded-lg p-6 flex flex-col gap-8 bg-white">
      <div className="w-full h-[122px]  rounded-lg flex flex-col justify-between">
        <p className="font-bold text-[24px]">
          Buy {user?.profile?.name} a Coffee
        </p>
        <div className="h-16 w-full ">
          <p>Select amount:</p>
          <div className="w-[337px] h-10 grid grid-cols-4 gap-3">
            <button className=" flex items-center justify-center gap-2 bg-secondary rounded-md">
              <CupLogo />
              $1
            </button>
            <button className="flex items-center justify-center gap-2 bg-secondary rounded-md">
              <CupLogo />
              $2
            </button>
            <button className=" flex items-center justify-center gap-2 bg-secondary rounded-md">
              <CupLogo />
              $5
            </button>
            <button className="flex items-center justify-center gap-2 bg-secondary rounded-md">
              <CupLogo />
              $10
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[235px]  flex flex-col gap-5">
        <div className="w-full h-[62px] flex flex-col gap-2">
          <p>Enter BuyMeCoffee or social acount URL:</p>
          <input
            placeholder="buymeacoffee.com/"
            className="border-1 border-[#E4E4E7] h-10 rounded-md pl-3"
          ></input>
        </div>
        <div className="w-full h-[153px] flex flex-col gap-2">
          <p>Special message:</p>
          <textarea
            placeholder="Please write your message here"
            className="border-1 border-[#E4E4E7] h-[131px] rounded-md pt-2 pl-3"
          ></textarea>
        </div>
      </div>
      <div className="w-full h-10 border-1 border-[#E4E4E7] rounded-lg bg-secondary flex items-center justify-center">
        support
      </div>
    </div>
  );
};
