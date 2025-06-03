import { Login } from "@/components/auth/login";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full  flex flex-col items-center ">
      <div className=" w-[calc(100%-80px)] h-20 flex items-end justify-end">
        <Link href={"/signup"}>
          <button className="h-10 w-[73px] bg-[#F4F4F5] rounded-md">
            Sign Up
          </button>
        </Link>
      </div>
      <Login />
    </div>
  );
}
