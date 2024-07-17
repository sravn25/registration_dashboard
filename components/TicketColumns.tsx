"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TicketData } from "@/lib/firestoreService";
import { Check, X } from "lucide-react";

export const TicketColumns: ColumnDef<TicketData>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Ticket Number",
  },
  {
    accessorKey: "studentId",
    header: "Student ID",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "registered",
    header: "Registered",
    cell: ({ getValue }) => {
      const value = getValue<boolean>();
      return value ? (
        <Check className="text-green-500" />
      ) : (
        <X className="text-red-500" />
      );
    },
  },
];
