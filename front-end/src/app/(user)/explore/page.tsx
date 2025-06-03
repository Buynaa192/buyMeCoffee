"use client";
import { SearchIcon } from "@/assets/searchIcon";
import { api } from "@/axios";
import { ExploreProfile } from "@/components/user/exploreProfile";
import { useEffect, useState } from "react";
export type usersType = {
  email: string;
  username: string;
  profile: {
    about: string;
    avatarImage: string;
    backgroundImage: string;
    socialMediaUrl: string;
  };
};
export default function Explore() {
  const [users, setUsers] = useState<usersType[]>([]);
  const [username, SetUsername] = useState("");
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
    <div className="w-full  h-screen p-6 flex flex-col gap-6 ">
      <div className=" w-full h-full flex flex-col gap-6 overflow-hidden ">
        <div className="w-full h-22  flex flex-col justify-between  p-6 ">
          <p className="font-bold text-[24px]">Explore creators</p>
          <div className="w-[243px] h-9  flex items-center gap-2 justify-center">
            <SearchIcon />
            <input
              onChange={(e) => SetUsername(e.target.value)}
              placeholder="Seach name"
            ></input>
          </div>
        </div>
        <div className=" min-h-[224] overflow-scroll flex flex-col gap-6">
          {filteredUsers.map((item, index) => {
            return <ExploreProfile key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
