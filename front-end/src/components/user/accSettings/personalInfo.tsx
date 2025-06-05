"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/userProvider";
import { api } from "@/axios";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  about: z.string().min(2, "About must be at least 2 characters."),
  socialMediaUrl: z.string().url("Must be a valid URL."),
  avatarImage: z.string().url("Must be a valid image URL."),
});

type FormValues = z.infer<typeof formSchema>;

export const PersonalInfo = () => {
  const { user, setUser } = useAuth();

  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.profile?.name ?? "",
      about: user?.profile?.about ?? "",
      socialMediaUrl: user?.profile?.socialMediaUrl ?? "",
      avatarImage: user?.profile?.avatarImage ?? "",
    },
  });

  async function uploadToCloudinary(file: File) {
    const UPLOAD_PRESET = "foodWeb";
    const CLOUD_NAME = "dhamxqczz";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (user?.profile?.avatarImage) {
      setPreview(user.profile.avatarImage);
    }
  }, [user?.profile?.avatarImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      setPreview(imageUrl);
      form.setValue("avatarImage", imageUrl, { shouldValidate: true });
    } catch (err) {
      alert("Failed to upload image");
      console.error(err);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await api.put("/profile/put", data);
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          profile: response.data.profile,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      toast.success("personal saved");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-[#E4E4E7] rounded-lg w-full p-6 flex-col flex gap-6"
      >
        <p className="font-bold text-lg">Personal Info</p>

        <FormField
          control={form.control}
          name="avatarImage"
          render={() => (
            <FormItem>
              <FormLabel>Add photo</FormLabel>
              <div className="relative w-40 h-40 rounded-full  bg-gray-100 overflow-hidden">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Avatar Preview"
                    fill
                    className="object-cover rounded-full"
                    sizes="160px"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-sm text-gray-400">
                    No image
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
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
                <Input placeholder="Enter your name" {...field} />
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
                <Textarea
                  placeholder="Enter your about"
                  className="resize-none h-[131px]"
                  {...field}
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

        <Button
          type="submit"
          className="w-full hover:bg-black hover:text-white border-1"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};
