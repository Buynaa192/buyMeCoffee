"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/userProvider";
import { api } from "@/axios";
import { toast } from "sonner";

const successSchema = z.object({
  successMessage: z.string().min(10, {
    message: "Message must be at least 10 characters",
  }),
});

type SuccessForm = z.infer<typeof successSchema>;

export const SuccessMessage = () => {
  const { user, setUser } = useAuth();

  const form = useForm<SuccessForm>({
    resolver: zodResolver(successSchema),
    defaultValues: {
      successMessage: user?.profile?.successMessage ?? "",
    },
  });

  const onSubmit = async (data: SuccessForm) => {
    console.log("Success message submitted:", data);

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
      console.error("Failed to update message:", error);
    } finally {
      toast.success("Saved Confirmation message");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-[#E4E4E7] rounded-lg w-full p-6 flex flex-col gap-6"
      >
        <p className="font-bold text-lg">Success page</p>

        <FormField
          control={form.control}
          name="successMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation message</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-[131px]"
                  placeholder="Thank you for supporting me!..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full border-1 hover:text-white hover:bg-black"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};
