import { CupLogo } from "@/assets/cupLogo";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "../userProvider";
import { api } from "@/axios";
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
  username: string;
  receivedDonations: {
    amount: number;
    specialMessage: string;
    sender: any;
  }[];
};
type propsType = {
  props: ProfileType | undefined;
  setProfile: Dispatch<SetStateAction<ProfileType | undefined>>;
};
const dollar = [1, 2, 5, 10];

export const GiveDonate = ({ props, setProfile }: propsType) => {
  const [sellect, setSellect] = useState(1);
  const [specialMessage, setSpecialMessage] = useState("");
  const { user } = useAuth();
  const postDonate = async () => {
    try {
      const response = await api.post(`/donation/post`, {
        amount: sellect,
        recipientId: props?.id,
        specialMessage,
        senderId: user ? user?.id : 57,
      });
      console.log(response.data);

      setProfile((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          receivedDonations: [
            ...(prev.receivedDonations ?? []),
            {
              amount: sellect,
              specialMessage,
              sender: user?.id,
            },
          ],
        };
      });
    } catch (error) {
      console.error("Failed to send donation:", error);
    }
  };

  return (
    <div className="w-[628px] h-[509px] border border-[#E4E4E7] rounded-lg p-6 flex flex-col gap-8 bg-white">
      <div className="w-full h-[122px] rounded-lg flex flex-col justify-between">
        <p className="font-bold text-[24px]">
          Buy "{props?.profile?.name}" a Coffee
        </p>
        <div className="h-16 w-full">
          <p>Select amount:</p>
          <div className="w-[337px] h-10 grid grid-cols-4 gap-3">
            {dollar.map((item, index) => (
              <Button
                key={index}
                onClick={() => setSellect(item)}
                className={`flex items-center justify-center gap-2 
                  ${
                    sellect === item
                      ? "border-black border"
                      : "hover:border-black hover:border"
                  }`}
              >
                <p>{item}</p>
                <CupLogo />
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[235px] flex flex-col gap-5">
        <div className="w-full h-[62px] flex flex-col gap-2">
          <p>Enter BuyMeCoffee or social account URL:</p>
          <Input
            // onChange={}
            defaultValue="http://localhost:3000/supporter/"
            placeholder="buymeacoffee.com/"
            className="border border-[#E4E4E7] h-10 rounded-md pl-3"
          />
        </div>
        <div className="w-full h-[153px] flex flex-col gap-2">
          <p>Special message:</p>
          <Textarea
            onChange={(e) => {
              setSpecialMessage(e.target.value);
            }}
            placeholder="Please write your message here"
            className="border border-[#E4E4E7] h-[131px] rounded-md pt-2 pl-3"
          />
        </div>
      </div>

      <div
        onClick={postDonate}
        className="w-full h-10 border border-[#E4E4E7] rounded-lg bg-secondary flex items-center justify-center hover:bg-black hover:text-white cursor-pointer"
      >
        support
      </div>
    </div>
  );
};
