"use client";
import { TicketData } from "@/lib/firestoreService";
import { TicketColumns } from "./TicketColumns";
import { DataTable } from "./Data-Table";
import React, { useEffect, useState } from "react";
import { getAllRegistrations } from "@/lib/firestoreService";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const TicketTable = () => {
  const { user } = useAuth();
  const [data, setData] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }
      try {
        const data = await getAllRegistrations();
        setData(data);
      } catch (error) {
        console.error("error fetching registration: ", error);
        setError("error fetching registration, check auth");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      ) : (
        <DataTable columns={TicketColumns} data={data} />
      )}
    </div>
  );
};

export default TicketTable;
