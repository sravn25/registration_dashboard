"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TicketData } from "@/lib/firestoreService";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";

export const TicketColumns: ColumnDef<TicketData>[] = [
  {
    accessorKey: "ticketNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket Number <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
