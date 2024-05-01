import React, { useEffect } from "react";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "@tanstack/react-router";

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
    <div>
      <div className="flex items-end justify-end p-2 m-2 overflow-hidden ">
        <button
          className="inline-block rounded-md border bg-white shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
          onClick={doSignOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
