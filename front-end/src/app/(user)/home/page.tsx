"use client";
import { Comments } from "@/components/user/comment";
import { FilterCash } from "@/components/user/filterCash";
import { useAuth } from "@/components/userProvider";

export default function Home() {
  const { user } = useAuth();
  if (!user) return;
  console.log(user);

  return (
    <div className="w-full  h-screen pl-6 pr-6 flex flex-col gap-6">
      <FilterCash />
      <Comments />
    </div>
  );
}
