"use client";

import { donationType } from "../userProvider";
type donation = {
  donation: donationType;
};
function getTimeAgo(dateStr: string | Date): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count > 0) {
      return `${count} ${i.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

export const CommentCard = ({ donation }: donation) => {
  return (
    <div className="w-full p-3">
      <div className=" w-full flex-col flex gap-4">
        <div className="flex items-center justify-between">
          <div className="  flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-1">
              <img
                className="w-full h-full rounded-full "
                src={donation.sender.profile.avatarImage}
              ></img>
            </div>
            <div className="flex flex-col gap-1">
              <p>{donation.sender.profile.name}</p>
              <p>{donation.sender.profile.socialMediaUrl}</p>
            </div>
          </div>
          <div className=" flex flex-col items-end">
            <p className="font-bold">+ ${donation.amount}</p>
            <p className="text-[#71717A]">{getTimeAgo(donation.createdAt)}</p>
          </div>
        </div>
        <p>{donation.specialMessage}</p>
      </div>
    </div>
  );
};
