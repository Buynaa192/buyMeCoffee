"use client";
import { WhiteCamera } from "@/assets/whiteCamera";
import { BuyCoffee } from "@/components/me/buycoffee";
import { ProfileEdit } from "@/components/me/profileEdit";
import { useAuth } from "@/components/userProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/axios";

const UPLOAD_PRESET = "foodWeb";
const CLOUD_NAME = "dhamxqczz";

export default function Me() {
  const { user, setUser, getUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user?.profile?.backgroundImage) {
      setOriginalImageUrl(user.profile.backgroundImage);
    }
  }, [user?.profile?.backgroundImage]);

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = res.data.secure_url;
      setTempImageUrl(imageUrl); // Save as temp
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!tempImageUrl) return;

    try {
      await api.put("/profile/put", {
        backgroundImage: tempImageUrl,
      });

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          profile: {
            ...prevUser.profile!,
            backgroundImage: tempImageUrl,
          },
        };
      });

      setOriginalImageUrl(tempImageUrl);
      setTempImageUrl(null);
      getUser();
    } catch (err) {
      console.error("Failed to save background image:", err);
    }
  };

  const handleCancel = () => {
    setTempImageUrl(null);
  };

  const displayImage = tempImageUrl || originalImageUrl || "";

  if (!user) return;
  return (
    <div className="w-full h-[calc(100%-64px)] flex flex-col items-center">
      <div
        className={
          displayImage
            ? "w-full h-[319px] bg-secondary flex justify-end bg-[#F4F4F5]"
            : "w-full h-[319px] bg-secondary flex items-center justify-center bg-[#F4F4F5]"
        }
        style={{
          backgroundImage: `url(${displayImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {tempImageUrl ? (
          <div className="w-70 h-10 flex gap-2 mt-4 mr-10">
            <button
              className="bg-black text-white rounded-md w-full"
              onClick={handleSave}
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save changes"}
            </button>
            <button
              className="bg-white rounded-md w-[126px]"
              onClick={handleCancel}
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
        ) : (
          <label className="w-[181px] h-10 bg-black text-white mt-4 mr-4 flex gap-2 items-center justify-center rounded-md cursor-pointer">
            <WhiteCamera />
            <p>{uploading ? "Uploading..." : "Add a cover image"}</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageChange}
            />
          </label>
        )}
      </div>

      <div className="absolute flex justify-center gap-5 w-320 h-170 mt-60 z-10">
        <ProfileEdit />
        <BuyCoffee />
      </div>
    </div>
  );
}
