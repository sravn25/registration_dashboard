import { TicketColumns } from "./TicketColumns";
import { DataTable } from "./Data-Table";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRegistrationData } from "@/context/RegistrationContext";

const TicketTable = () => {
  const { data, handleUpdate } = useRegistrationData();

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={[
          ...TicketColumns,
          {
            id: "actions",
            cell: ({ row }) => {
              const ticket = row.original;
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() =>
                        handleUpdate(
                          ticket.studentId,
                          !ticket.registered,
                          ticket.ticketNumber,
                        )
                      }
                    >
                      {ticket.registered ? "Unregister" : "Register"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(ticket.ticketNumber)
                      }
                    >
                      Copy Ticket Number
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard.writeText(ticket.studentId)
                      }
                    >
                      Copy Student ID
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            },
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default TicketTable;
