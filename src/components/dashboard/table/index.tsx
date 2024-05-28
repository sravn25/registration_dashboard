import React, { useState } from "react";
import { getTicket, getStudentIdByTicketId } from "../../../firebase/firestore";
import { StudentIdAlert } from "../error";

export default function Table() {
  const handleSearchByTicketId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketId) {
      setError("Ticket ID is invalid");
      return;
    }
    setError("");
    getStudentIdByTicketId(ticketId);
    console.log("searching");
    setTicketId("");
  };

  const [ticketId, setTicketId] = useState<string>("");
  const [error, setError] = useState<string>("");

  return (
    <div>
      <button onClick={getTicket}>getTicket</button>
      <form
        onSubmit={handleSearchByTicketId}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="ticketid" className="sr-only">
            Ticket ID
          </label>

          <div className="relative">
            <input
              type="number"
              id="ticketid"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              placeholder="Search Ticket ID"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600"
        >
          Search
        </button>
        {error && <StudentIdAlert message={error} />}
      </form>
    </div>
  );
}
