"use client";

import React, { useState } from "react";
import { Hearth } from "@/assets/hearth";
import { useAuth } from "../userProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Camera } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/axios";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().min(2, { message: "About must be at least 2 characters." }),
  socialMediaUrl: z.string().url({ message: "Must be a valid URL." }),
  avatarImage: z.string().url({ message: "Must be a valid image URL." }),
});
const UPLOAD_PRESET = "foodWeb";
const CLOUD_NAME = "dhamxqczz";
export const ProfileEdit = () => {
  const { user, setUser, getUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.profile?.avatarImage || null
  );

  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (
    file: File,
    setUploading: (b: boolean) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      return res.data.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadToCloudinary(file, setUploading);

    if (imageUrl) {
      setImagePreview(imageUrl);
      form.setValue("avatarImage", imageUrl, { shouldValidate: true });
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.profile?.name || "",
      about: user?.profile?.about || "",
      socialMediaUrl: user?.profile?.socialMediaUrl || "",
      avatarImage: user?.profile?.avatarImage || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setUploading(true);
    try {
      console.log("Submitting data:", data); // -> энд `photo` URL зөв ирж байгаа эсэхийг шалга

      const response = await api.put("/profile/put", data);

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          profile: response.data.profile,
        };
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      getUser();
      setUploading(false);
      setOpen(false);
    }
  };

  return (
    <div className="w-[632px] h-[625px] flex flex-col gap-5 bg-white p-6 rounded-md border border-gray-300">
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-4">
          <img
            src={user?.profile?.avatarImage}
            alt="Profile Preview"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-full"
          />
          <p className="font-bold text-xl truncate max-w-xs">
            {user?.profile?.name}
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="justify-center items-center flex rounded-md text-sm h-10 w-24 bg-gray-300 hover:bg-gray-400 transition-colors">
              Edit page
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white max-w-xl">
            <DialogHeader>
              <DialogTitle>
                <p className="text-xl font-semibold">Edit profile</p>
                <p className="text-sm text-gray-500 font-light mt-1">
                  Make changes to your profile here. Click save when you're
                  done.
                </p>
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="avatarImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add photo</FormLabel>
                      <div className="relative w-40 h-40 border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Profile Preview"
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="160px"
                            className="rounded-full"
                          />
                        ) : (
                          <Camera className="text-gray-400" size={48} />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="A short bio about you"
                          className="w-full h-32 p-2 border border-gray-300 rounded resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socialMediaUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social media URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="border-2 w-60 h-10"
                    disabled={uploading}
                  >
                    {uploading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* About section */}
      <div className="border border-gray-300 rounded p-4">
        <p className="font-bold mb-2">About {user?.profile?.name || ""}</p>
        <p className="text-sm">
          {user?.profile?.about || "No information provided."}
        </p>
      </div>

      {/* Social Media section */}
      <div className="border border-gray-300 rounded p-4">
        <p className="font-bold mb-2">Social media URL</p>
        <p className="text-sm break-all">
          {user?.profile?.socialMediaUrl || "No social media URL."}
        </p>
      </div>

      {/* Recent Supporters */}
      <div className="h-full border border-gray-300 rounded p-4 flex flex-col justify-center gap-2">
        <p className="font-bold mb-2">Recent Supporters</p>
        <div className="flex flex-col items-center justify-center border-1 border-[#E4E4E7] rounded-lg w-full h-full">
          <Hearth />
          <p className="font-bold">
            Be the first one to support {user?.profile?.name || "user"}
          </p>
        </div>
      </div>
    </div>
  );
};
