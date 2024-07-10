"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters",
    })
    .max(50),
  password: z.string().min(1, {
    message: "Password cannot be empty",
  }),
});

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login } = useAuth();
  const router = useRouter();
  // form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values);
    try {
      await login(values.email, values.password);
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
      console.log("failed to login");
      toast.error("Incorrect username or password", {
        duration: 2000,
      });
    }
  };

  const { user } = useAuth();
  if (user) router.push("/");
  console.log(loading);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center font-medium">Sign in to your account</div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="......@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex gap-2 relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      {...field}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!loading ? (
            <Button type="submit" className="w-full">
              Login
            </Button>
          ) : (
            <Button disabled className="w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          )}
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default LoginForm;
