import React, { useState } from "react";
import {
  getStudentIdByTicketId,
  getTicketIdByStudentId,
} from "../../../firebase/firestore";
import { Alert } from "../../error";

export default function Search() {
  const [inputId, setInputId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [searchStudent, setSearchStudent] = useState<boolean>(true);

  const handleSearchByTicketId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputId) {
      setError("Ticket ID is invalid");
      return;
    }
    setError("");
    getStudentIdByTicketId(inputId);
    console.log("searching");
    setInputId("");
  };
  return (
    <div>
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
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
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
        {error && <Alert message={error} />}
      </form>
    </div>
  );
}
