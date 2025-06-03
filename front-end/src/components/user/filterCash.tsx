"use client";
import { Copy } from "@/assets/copy";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../userProvider";

import { useEffect, useMemo, useState } from "react";

export const FilterCash = () => {
  const { user, getUser } = useAuth();
  const [timeRange, setTimeRange] = useState("all");
  useEffect(() => {
    getUser();
  }, []);
  const filteredDonations = useMemo(() => {
    if (!user?.receivedDonations) return [];

    const now = new Date();

    if (timeRange === "30") {
      return user.receivedDonations.filter((donation) => {
        const created = new Date(donation.createdAt);
        const daysAgo = new Date(now);
        daysAgo.setDate(now.getDate() - 30);
        return created >= daysAgo;
      });
    }

    if (timeRange === "90") {
      return user.receivedDonations.filter((donation) => {
        const created = new Date(donation.createdAt);
        const daysAgo = new Date(now);
        daysAgo.setDate(now.getDate() - 90);
        return created >= daysAgo;
      });
    }

    return user.receivedDonations;
  }, [user?.receivedDonations, timeRange]);
  console.log("homeUser", user);
  const amount = filteredDonations.reduce(
    (total, donation) => total + donation.amount,
    0
  );
  const copyLink = () => {
    const link = window.location.origin + "/supporter/" + user?.username;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="w-full h-[257px] border-1 border-[#E4E4E7] rounded-lg p-6 flex flex-col gap-3">
      <div className="w-full h-12  flex justify-between">
        <div className=" h-full flex gap-3">
          <div className="w-12 h-12 rounded-full ">
            <img
              src={user?.profile?.avatarImage}
              alt="Profile Preview"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{user?.profile?.name}</p>
            <p className="text-[14px]">{user?.profile?.socialMediaUrl}</p>
          </div>
        </div>
        <div
          onClick={copyLink}
          className="w-40 h-10 rounded-lg bg-black text-white flex items-center justify-center gap-2"
        >
          <Copy />
          <p className="">Share page link</p>
        </div>
      </div>
      <div className="w-full h-[33px] flex items-center">
        <div className="w-full h-0.5 border-1 border-[#E4E4E7]"></div>
      </div>
      <div className=" w-full h-26 flex flex-col justify-between">
        <div className="h-10 w-full flex gap-2 ">
          <p>Earnings</p>
          <Select onValueChange={(val) => setTimeRange(val)}>
            <SelectTrigger>
              <SelectValue placeholder="All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="font-bold text-[36px]">${amount}</p>
      </div>
    </div>
  );
};
