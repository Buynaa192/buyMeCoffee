"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommentCard } from "./commentCard";
import { useState, useMemo } from "react";
import { useAuth } from "../userProvider";

export const Comments = () => {
  const { user } = useAuth();
  const [filterAmount, setFilterAmount] = useState<string | null>(null);

  const filteredDonations = useMemo(() => {
    if (!user?.receivedDonations) return [];

    if (filterAmount) {
      return user.receivedDonations.filter(
        (donation) => donation.amount === Number(filterAmount)
      );
    }

    return user.receivedDonations;
  }, [user?.receivedDonations, filterAmount]);

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-hidden">
      <div className="w-full h-9 flex justify-between items-center">
        <p>Recent transactions</p>
        <Select onValueChange={(value) => setFilterAmount(value)}>
          <SelectTrigger className="border-1 border-[#E4E4E7] border-dashed">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="1">$1</SelectItem>
            <SelectItem value="2">$2</SelectItem>
            <SelectItem value="5">$5</SelectItem>
            <SelectItem value="10">$10</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full min-h-46 border-1 border-[#E4E4E7] rounded-lg flex flex-col gap-4 p-6 overflow-scroll">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation, index) => (
            <CommentCard key={index} donation={donation} />
          ))
        ) : (
          <p className="text-sm text-gray-400">No donations found.</p>
        )}
      </div>
    </div>
  );
};
