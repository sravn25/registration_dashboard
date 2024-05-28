import React, { useState } from "react";
import { StudentIdAlert } from "../error";
import { Ticket, addRegistration } from "../../../firebase/firestore";

export default function Registration() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [studentId, setStudentId] = useState<string>("");
  const [ticketId, setTicketId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.length !== 7) {
      setError("Student ID must be 7 digits");
      return;
    }
    setError("");

    const newTicket: Ticket = { studentId, ticketId };
    addRegistration(newTicket);
    setStudentId("");
    setTicketId("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setStudentId("");
    setTicketId("");
  };

  return (
    <div>
      <button
        type="button"
        className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
        onClick={() => setIsOpen(true)}
      >
        Register Here
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <dialog
          open
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
        >
          {/* Modal Content */}
          <div className="bg-white p-8 rounded shadow-lg w-80">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Modal content */}
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Ticket Registration</h2>

              {/* Registration Form */}
              <form
                onSubmit={handleSubmit}
                className="mx-auto mb-0 mt-8 max-w-md space-y-4"
              >
                <div>
                  <label htmlFor="studentid" className="sr-only">
                    Student ID
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      id="studentId"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                      placeholder="Enter Student ID"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ticketid" className="sr-only">
                    Ticket ID
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                      placeholder="Enter Ticket ID"
                      id="ticketId"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600"
                  >
                    Register
                  </button>
                </div>
                {error && <StudentIdAlert message={error} />}
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
