"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@/components/userProvider";
import { api } from "@/axios";
import { toast } from "sonner";

const paymentSchema = z.object({
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  cardNumber: z
    .string()
    .min(19, "Card number must be at least 16 digits")
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Invalid card number format"),
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
  CVC: z
    .string()
    .min(3, "CVC must be at least 3 digits")
    .max(4, "CVC must be no more than 4 digits"),
});

type PaymentForm = z.infer<typeof paymentSchema>;

export const PaymentDetails = () => {
  const { user, setUser } = useAuth();

  const form = useForm<PaymentForm>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      country: user?.bankCard?.country ?? "",
      firstName: user?.bankCard?.firstName ?? "",
      lastName: user?.bankCard?.lastName ?? "",
      cardNumber: user?.bankCard?.cardNumber ?? "",
      CVC: user?.bankCard?.CVC ?? "",
    },
  });

  const onSubmit = async (data: PaymentForm) => {
    const expiryDate = `${data.month}/${data.year}`;

    const updatedData = {
      country: data.country,
      firstName: data.firstName,
      lastName: data.lastName,
      cardNumber: data.cardNumber,
      CVC: data.CVC,
      expiryDate,
    };

    console.log("Payment form submitted:", data);
    try {
      const response = await api.put("/bank-card/updateBankCard", updatedData);
      console.log("bank-card", response.data);
      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          bankCard: response.data.bankCard,
        };
      });
      form.reset();
    } catch (err) {
      console.error("Failed to update password:", err);
    } finally {
      toast.success("Saved payment");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-[#E4E4E7] rounded-lg w-full p-6 flex-col flex gap-6"
      >
        <p className="font-bold text-lg">Payment details</p>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select country</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="mongolia">Mongolia</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">UK</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card number</FormLabel>
              <FormControl>
                <Input placeholder="XXXX-XXXX-XXXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {Array.from({ length: 12 }, (_, i) => {
                      const value = String(i + 1).padStart(2, "0");
                      return (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="CVC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input placeholder="CVC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full border-1 hover:bg-black hover:text-white"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};
