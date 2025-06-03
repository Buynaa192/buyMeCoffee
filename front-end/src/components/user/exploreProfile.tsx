import { usersType } from "@/app/(user)/explore/page";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
type itemType = {
  item: usersType;
};
export const ExploreProfile = ({ item }: itemType) => {
  return (
    <div className="w-full h-[224px]  p-6 border-1 border-[#E4E4E7] rounded-lg">
      <div className=" w-full h-full flex flex-col gap-3">
        <div className="w-full h-10 flex justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full ">
              <img
                className="w-full h-full rounded-full"
                src={item.profile.avatarImage}
              ></img>
            </div>
            <p className="font-bold text-[20px]">{item.username}</p>
          </div>
          <Link href={`/supporter/${item.username}`}>
            <button className="flex items-center justify-center  p-2.5 gap-2 rounded-md bg-[#F4F4F5]">
              <p>View profile</p>
              <ExternalLink />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 h-[calc(100%-40px)] gap-5 overflow-hidden">
          <div className=" flex flex-col gap-2 overflow-scroll">
            <p className="font-bold">About {item.username}</p>
            <p className="text-[14px]">{item.profile.about}</p>
          </div>
          <div className=" flex flex-col gap-2">
            <p className="font-bold">Social media URL</p>
            <p className="text-[14px]">{item.profile.socialMediaUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
