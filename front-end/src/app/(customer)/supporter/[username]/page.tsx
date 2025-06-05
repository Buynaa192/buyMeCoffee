"use client";

import { GiveDonate } from "@/components/support/giveDonate";
import { UserProfile } from "@/components/support/userProfile";

import { api } from "@/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type username = {
  username: string;
};
type ProfileType = {
  id: number;
  email: string;
  profile: {
    about: string;
    avatarImage: string;
    backgroundImage: string;
    name: string;
    socialMediaUrl: string;
  };
  receivedDonations: {
    amount: number;
    specialMessage: string;
    sender: {
      email: string;
      profile: {
        about: string;
        avatarImage: string;
        backgroundImage: string;
        name: string;
        socialMediaUrl: string;
      };
    };
  }[];

  username: string;
};
export default function Supporter() {
  const { username } = useParams<username>();
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get(`/profile/${username}`);

        setProfile(response.data);
        console.log("profile", response.data);
      } catch (error) {
        console.error("Failed to profile:", error);
      }
    };
    getProfile();
  }, [username]);
  return (
    <div className="w-full h-[calc(100%-64px)] flex flex-col   items-center ">
      <div className="w-full h-[319px] bg-[#4FBDA1] flex items-center justify-center"></div>
      <div className="absolute flex  justify-center  gap-5  w-320 min-h-170 max-h-210 mt-60 z-10 overflow-hidden ">
        <UserProfile props={profile} />
        <GiveDonate props={profile} setProfile={setProfile} />
      </div>
    </div>
  );
}
