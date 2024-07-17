"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TicketData } from "@/lib/firestoreService";
import { Check, X, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
