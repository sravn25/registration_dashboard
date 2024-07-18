"use client";

import React from "react";
import RegisterSheet from "./RegisterSheet";
import TicketTable from "./TicketTable";
import { RegistrationProvider } from "@/context/RegistrationContext";

const RegistrationManager = () => {
  return (
    <RegistrationProvider>
      <div className="container mx-auto">
        <RegisterSheet />
        <TicketTable />
      </div>
    </RegistrationProvider>
  );
};

export default RegistrationManager;
