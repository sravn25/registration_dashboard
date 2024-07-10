"use client";

import React from "react";
import { Button } from "./ui/button";
import { PartyPopper } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out: ", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-6">
        <PartyPopper className="h-12 w-auto text-indigo-600" />
        <h1 className="text-3xl text-center font-extrabold block bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          OP Registration Dashboard
        </h1>
        <Button onClick={handleSignOut}>
          <LogOut className="h-6 w-6 pr-2" />
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default Navbar;
