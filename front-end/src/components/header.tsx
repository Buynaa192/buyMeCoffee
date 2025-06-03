"use client";
import { CupLogo } from "@/assets/cupLogo";
import { useAuth } from "./userProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export const Header = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="w-full h-14  flex justify-center items-center">
      <div className="w-320 h-10  flex justify-between ">
        <Link href={"/"}>
          <div className="flex gap-2 items-center justify-center">
            <CupLogo />
            <p className="font-bold">Buy Me Coffee</p>
          </div>
        </Link>
        {user?.profile ? (
          <Select onValueChange={(value) => value === "logout" && signOut()}>
            <div className="flex gap-2 w-55 items-center justify-between ">
              <img
                src={user?.profile?.avatarImage}
                alt="Profile Preview"
                width={160}
                height={160}
                className="w-12 h-12 rounded-full "
              />
              <SelectTrigger className="flex gap-2 h-12 w-[calc(100%-70px)] ">
                <SelectValue
                  className="text-red-500"
                  placeholder={user?.profile.name}
                ></SelectValue>
              </SelectTrigger>
            </div>

            <SelectContent className="bg-white">
              <SelectItem value="logout">log out</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <button
            className="border-2 p-4 rounded-md flex items-center justify-center"
            onClick={signOut}
          >
            log Out
          </button>
        )}
      </div>
    </div>
  );
};
