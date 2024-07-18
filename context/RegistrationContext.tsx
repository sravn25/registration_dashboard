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
  getRegisteredCount,
  deleteTicket,
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
  handleDelete: (studentId: string) => Promise<void>;
  registeredCount: number;
  handleRefresh: () => Promise<void>;
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
  const [registeredCount, setRegisteredCount] = useState<number>(0);
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
      `Successfully ${registered ? "registered" : "unregistered"} ticket number: ${ticketNumber} for student ID: ${studentId}`,
    );
    handleRefresh();
  };

  const handleDelete = async (studentId: string) => {
    try {
      await deleteTicket(studentId);
      toast.success(`Ticket of student ID ${studentId} deleted successfully!`);
      handleRefresh();
    } catch (error) {
      toast.error("Failed to delete ticket");
      console.error("Error deleting ticket: ", error);
    }
  };

  const getRegisterCount = async () => {
    const count = await getRegisteredCount();
    setRegisteredCount(count);
  };

  const handleRefresh = () => {
    fetchData();
    getRegisterCount();
  };

  useEffect(() => {
    if (!user) {
      console.log("User is not authenticated");
      setLoading(false);
      return;
    }
    try {
      fetchData();
      getRegisterCount();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <RegistrationContext.Provider
      value={{
        data,
        fetchData,
        handleUpdate,
        handleDelete,
        handleRefresh,
        registeredCount,
      }}
    >
      {loading ? <Loader2 className="mr-2 h-16 w-16 animate-spin" /> : children}
      <Toaster />
    </RegistrationContext.Provider>
  );
};
