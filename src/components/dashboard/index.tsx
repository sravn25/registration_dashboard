import React, { useEffect } from "react";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "@tanstack/react-router";
import Registration from "./registration";
import Table from "./table";

export default function Dashboard() {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate({ from: "/dashboard" });

  useEffect(() => {
    if (!userLoggedIn) {
      console.log("dashboard no login");
      navigate({ to: "/" });
    }
    return () => {};
  }, [userLoggedIn, navigate]);

  return (
    <div className="">
      <div className="flex items-end justify-between p-2 m-2 overflow-hidden ">
        <Registration />
        <button
          className="inline-block rounded-md border bg-red-400 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-300 focus:relative"
          onClick={doSignOut}
        >
          Log Out
        </button>
      </div>
      <Table />
    </div>
  );
}
