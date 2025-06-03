import { Header } from "@/components/header";
import { LayOutUser } from "@/components/layout/layoutUserHome";
import { LayOutCard } from "@/components/layout/layoutYellowCard";
import { PropsWithChildren } from "react";

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <div className=" max-w-screen min-h-screen flex justify-center bg-[#343434]">
      <div className="w-360 min-h-screen bg-white">
        <Header />
        <div className="flex p-20  gap-[74px]">
          <LayOutUser />

          {children}
        </div>
      </div>
    </div>
  );
}
