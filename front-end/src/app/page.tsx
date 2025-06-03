"use client";
import { api } from "@/axios";
import { Input } from "@/components/ui/input";
import { ExternalLink, HeartIcon, SearchIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usersType } from "./(user)/explore/page";

export default function Home() {
  const [users, setUsers] = useState<usersType[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/profile/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );

  return (
    <div className="w-screen h-screen bg-white relative">
      <div className="w-full h-[76px] bg-white flex justify-between items-center py-[14px] px-[24px]">
        <div className="flex">
          <button className="w-[64px] h-10 flex items-center justify-center font-semibold">
            FAQ
          </button>
          <button className="flex w-[103px] h-10 items-center justify-center font-semibold">
            Wall of <HeartIcon className="w-[16px] h-[15px]" />
          </button>
          <button className="w-[137px] h-10 flex justify-center items-center font-semibold">
            Resources
          </button>
        </div>

        <div className="h-[48px] flex gap-10 justify-end items-center relative">
          <div className="w-60 flex items-center rounded-full bg-slate-200 p-2">
            <SearchIcon />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Search creators"
              className="border-none bg-transparent focus:outline-none"
            />
          </div>
          <Link href="/login">
            <button className="w-[87px] h-[48px] cursor-pointer relative overflow-hidden group text-black rounded-[9999px]">
              <span className="absolute inset-0 bg-gray-400 scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out origin-center"></span>
              <span className="relative z-10">Log in</span>
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-[#ffdd00] w-[87px] h-[48px] rounded-[9999px] cursor-pointer hover:bg-[#ffdd00d4]">
              Sign up
            </button>
          </Link>
        </div>
      </div>

      <div className="w-80 absolute right-24 top-[90px] bg-white shadow-md rounded-md max-h-96 overflow-auto z-50 border border-gray-300">
        {filteredUsers.length === 0 ? (
          <p className="p-4 text-gray-500">No creators found.</p>
        ) : (
          filteredUsers.map((item, index) => (
            <div
              className="h-20 flex justify-between items-center border-b last:border-b-0 px-4"
              key={index}
            >
              <div className="flex gap-2 items-center overflow-hidden">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={item.profile.avatarImage}
                  alt={`${item.username} avatar`}
                />
                <div className="truncate">
                  <p className="font-semibold truncate">{item.username}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {item.profile.about}
                  </p>
                </div>
              </div>
              <Link href={`/supporter/${item.username}`}>
                <button className="flex items-center justify-center p-2.5 gap-2 rounded-md bg-[#F4F4F5]">
                  <p>View profile</p>
                  <ExternalLink />
                </button>
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="w-full h-fit flex flex-col gap-9 items-center mt-30">
        <div className="w-fit h-fit flex gap-3">
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <StarIcon color="#00ff00" />
          <p>Loved by 1,000,000+ creators</p>
        </div>
        <p className="font-extrabold text-[100px] text-center">
          Fund your <br />
          creative work
        </p>
        <p className="font-medium text-[24px] text-center">
          Accept support. Start a membership. Setup a shop. Its easier <br />
          than you think.
        </p>
        <Link href="/signup">
          <button className="bg-[#ffdd00] w-[255px] h-[74px] rounded-[9999px] cursor-pointer hover:bg-[#ffdd00d4] text-[24px] font-semibold">
            Start my page
          </button>
        </Link>
        <p>Its free and takes less than a minute!</p>
      </div>
    </div>
  );
}
