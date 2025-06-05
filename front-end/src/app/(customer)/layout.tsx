import { Header } from "@/components/header";

import { PropsWithChildren } from "react";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <div className="border-2 max-w-screen min-h-screen flex justify-center bg-[#343434] ">
      <div className="w-360 min-h-screen  bg-white">
        <Header />
        {children}
      </div>
    </div>
  );
}
