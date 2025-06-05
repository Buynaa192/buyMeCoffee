"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Camera } from "@/assets/camera";
import Image from "next/image";

import { api } from "@/axios";
import { useAuth } from "../userProvider";
export type stepType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  about: z.string().min(2, { message: "About must be at least 2 characters." }),
  social: z.string().url({ message: "Must be a valid URL." }),
  photo: z.string().url({ message: "Must be a valid image URL." }),
});

const UPLOAD_PRESET = "foodWeb";
const CLOUD_NAME = "dhamxqczz";

export const CreateProfileStep1 = ({ step, setStep }: stepType) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user, getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      social: "",
      photo: "",
    },
  });
  const addProfile = async (values: z.infer<typeof formSchema>) => {
    try {
      await api.post("/profile/createprofile", {
        name: values.name,
        about: values.about,
        avatarImage: values.photo,
        socialMediaUrl: values.social,
        backgroundImage: "",
        successMessage: "",
        userId: user?.id,
      });

      setStep(step + 1);
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
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

    const url = await uploadImage(file);
    if (url) {
      form.setValue("photo", url);
      setImagePreview(url);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addProfile(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-[510px]"
      >
        <p className="font-bold text-[24px]">Complete your profile page</p>

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add photo</FormLabel>

              <input type="hidden" {...field} />

              <div className="relative w-40 h-40 border-dashed border-2 rounded-full flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile Preview"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Camera />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
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
                <Input
                  className="h-[131px] flex items-start justify-start"
                  placeholder="A short bio about you"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="social"
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
            className="border-2 w-[246px] h-10"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
