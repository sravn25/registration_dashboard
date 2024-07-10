"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Upload } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  ticketNumber: z.string().min(5, {
    message: "Ticket number must be at least 5 characters",
  }),
  studentId: z.string().length(7, {
    message: "Student ID must be 7 digits",
  }),
});

export default function RegisterSheet() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketNumber: "",
      studentId: "",
    },
  });

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="m-6 bg-indigo-500 hover:bg-indigo-700"
        >
          <Ticket className="h-6 w-auto pr-2" />
          Click Here to Register Ticket
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="pb-6">
          <SheetTitle>Ticket Registration</SheetTitle>
          <SheetDescription>
            Register new tickets here. Click register when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="ticketNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Number</FormLabel>
                  <FormControl>
                    <Input placeholder="00001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder="0347000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                <Upload className="h-4 w-auto pr-2" />
                Register
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
