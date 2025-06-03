"use client";
import { Hearth } from "@/assets/hearth";

type ProfileType = {
  email: string;
  profile: {
    about: string;
    avatarImage: string;
    backgroundImage: string;
    name: string;
    socialMediaUrl: string;
  };
  username: string;
  receivedDonations: {
    amount: number;
    specialMessage: string;
    sender: {
      email: string;
      profile: {
        about: string;
        avatarImage: string;
        name: string;
      };
    };
  }[];
};
type propsType = {
  props: ProfileType | undefined;
};
export const UserProfile = ({ props }: propsType) => {
  return (
    <div className="w-[632px] min-h-[625px] flex flex-col gap-5 bg-white rounded-md  ">
      <div className="w-full h-[233px] border-1 border-[#E4E4E7] rounded-md  p-6 flex flex-col gap-2">
        <div className="w-full h-12 flex justify-between ">
          <div className=" h-full flex gap-3 items-center">
            <img
              className="w-12 h-12 rounded-full "
              src={props?.profile?.avatarImage}
              // alt={`${props?.profile?.name} avatar`}
            />
            <p className="font-bold text-[20px]">{props?.profile?.name}</p>
          </div>
        </div>
        <div className="w-full h-[33px]  flex items-center">
          <div className="w-full h-0.5  border-1 border-[#E4E4E7] "></div>
        </div>
        <div className="grid grid-rows-2 gap-3">
          <p className="font-bold">About {props?.profile?.name}</p>
          <p className="text-[14px]">
            {props?.profile?.about || "No about info available."}
          </p>
        </div>
      </div>
      <div className="w-full h-29  p-6 border-1 border-[#E4E4E7] rounded-md ">
        <div className="w-full h-full flex flex-col gap-3">
          <p className="font-bold">Social media URL</p>
          <p className="text-[14px]">{props?.profile?.socialMediaUrl}</p>
        </div>
      </div>
      <div className="w-full min-h-59  p-6 border-1 border-[#E4E4E7] rounded-md ">
        <div className="w-full h-full  flex flex-col gap-3 overflow-scroll">
          <p className="font-bold">Recent Supporters</p>
          {props?.receivedDonations && props.receivedDonations.length > 0 ? (
            props?.receivedDonations.map((item, index) => {
              return (
                <div key={index} className="flex  gap-3 ">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={item.sender?.profile?.avatarImage}
                  ></img>

                  <div className="flex flex-col gap-3 w-[calc(100%-12px)]">
                    <p className="font-bold ">
                      {item.sender?.profile?.name} bougth ${item.amount} coffee
                    </p>
                    <p className=" ">{item.specialMessage}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full border-1 border-[#E4E4E7] rounded-md flex items-center justify-center flex-col gap-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <Hearth />
              </div>
              <p className="font-bold">
                Be the first one to support {props?.profile?.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
