import { LayOutCard } from "@/components/layout/layoutYellowCard";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-screen h-screen flex justify-center bg-[#343434]">
      <div className="grid grid-cols-2 gap-5 h-screen w-[1440px] bg-white">
        <LayOutCard />
        {children}
      </div>
    </div>
  );
}
