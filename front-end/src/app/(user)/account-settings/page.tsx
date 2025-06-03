"use client";
import { PasswordSettings } from "@/components/user/accSettings/passwordSettings";
import { PaymentDetails } from "@/components/user/accSettings/paymentDetails";
import { PersonalInfo } from "@/components/user/accSettings/personalInfo";
import { SuccessMessage } from "@/components/user/accSettings/successMessage";
import { useAuth } from "@/components/userProvider";

export default function AccountSettings() {
  const { user } = useAuth();
  if (!user) return;
  return (
    <div className="w-full  min-h-screen p-6 flex flex-col gap-6 ">
      <div className=" w-full h-full flex flex-col gap-8 ">
        <p className="font-bold text-[24px]">My account</p>
        <PersonalInfo />
        <PasswordSettings />
        <PaymentDetails />
        <SuccessMessage />
      </div>
    </div>
  );
}
