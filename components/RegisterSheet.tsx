"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket, Upload, Loader2 } from "lucide-react";
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
import { checkDuplicate, getCurrentDateTime, registerTicket } from "@/lib/firestoreService";
import toast, { Toaster } from "react-hot-toast";
import { useRegistrationData } from "@/context/RegistrationContext";

const formSchema = z.object({
  ticketNumber: z.string().min(5, {
    message: "Ticket number must be at least 5 characters",
  }),
  studentId: z.string().length(7, {
    message: "Student ID must be 7 digits",
  }),
});

export default function RegisterSheet() {
  const { fetchData } = useRegistrationData();
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
    const createdAt = getCurrentDateTime();
    const registered = false;
    const ticket = { ...values, createdAt, registered };
    try {
      const studentIdDuplicate = await checkDuplicate(ticket.studentId);
      if (studentIdDuplicate) {
        toast.error("Student ID already exists!");
        setLoading(false);
        return;
      }
      await registerTicket(ticket);
      toast.success(`Ticket ${ticket.ticketNumber} registered successfully`);
      form.reset();
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to register ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Register
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
        <Toaster />
      </Sheet>
    </>
  );
}
