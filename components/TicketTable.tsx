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
import { MoreHorizontal, Trash } from "lucide-react";
import { useRegistrationData } from "@/context/RegistrationContext";
import { Badge } from "./ui/badge";

const TicketTable = () => {
  const { data, handleUpdate, handleDelete, registeredCount } =
    useRegistrationData();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          Ticket count:
          <Badge>{data.length}</Badge>
        </div>
        <div className="flex items-center gap-2">
          Registered count:
          <Badge>{registeredCount < 0 ? 0 : registeredCount}</Badge>
        </div>
      </div>
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
                      className="font-semibold bg-slate-50"
                    >
                      {ticket.registered ? (
                        <span className="text-red-500">Unregister</span>
                      ) : (
                        <span className="text-green-500">Register</span>
                      )}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(ticket.studentId)}
                      className="font-semibold text-red-600 bg-slate-50"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      <span>Delete</span>
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
