import { Cup } from "@/assets/cup";
import { CupLogo } from "@/assets/cupLogo";

export const LayOutCard = () => {
  return (
    <div className="bg-amber-400 flex items-center  flex-col gap-[235px] ">
      <div className="flex gap-2 items-center mt-8 mr-100 ">
        <CupLogo />
        <p className=" font-bold ">Buy Me Coffee</p>
      </div>
      <div className="w-[455px] h-[370px] flex items-center flex-col gap-10">
        <div className="w-60 h-60 rounded-full bg-amber-500 flex items-center justify-center ">
          <Cup />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-[24px]">Fund your creative work</p>
          <p className="text-center">
            Accept support. Start a membership. Setup a shop. It’s easier than
            you think.
          </p>
        </div>
      </div>
    </div>
  );
};
