"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  TicketData,
  getAllRegistrations,
  updateRegistered,
} from "@/lib/firestoreService";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type RegistrationContextType = {
  data: TicketData[];
  fetchData: () => Promise<void>;
  handleUpdate: (
    studentId: string,
    registered: boolean,
    ticketNumber: string,
  ) => Promise<void>;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined,
);

export const useRegistrationData = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationData must be used within a RegistrationProvider",
    );
  }
  return context;
};

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [data, setData] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getAllRegistrations();
    setData(data);
    setLoading(false);
  };

  const handleUpdate = async (
    studentId: string,
    registered: boolean,
    ticketNumber: string,
  ) => {
    await updateRegistered(studentId, registered);
    toast.success(
      `Successfully ${registered ? "registered" : "unregistered"} ticket number: ${ticketNumber}`,
    );
    fetchData();
  };

  useEffect(() => {
    if (!user) {
      console.log("User is not authenticated");
      setLoading(false);
      return;
    }
    try {
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <RegistrationContext.Provider value={{ data, fetchData, handleUpdate }}>
      {loading ? <Loader2 className="mr-2 h-16 w-16 animate-spin" /> : children}
      <Toaster />
    </RegistrationContext.Provider>
  );
};
