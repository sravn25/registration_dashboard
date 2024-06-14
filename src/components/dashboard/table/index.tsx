import { useState, useEffect } from "react";
import { TicketData, getTicket } from "../../../firebase/firestore";
import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { fsdb } from "../../../firebase/config";

const PAGE_SIZE = 10;

export default function Table() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const initFetch = async () => {
    setLoading(true);
    const q = query(
      collection(fsdb, "registrations"),
      orderBy("ticket.studentId"),
      limit(PAGE_SIZE),
    );
    const querySnapshot = await getDocs(q);
    const ticketsList: TicketData[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      ticketsList.push(doc.data());
    });
    setTickets(ticketsList);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    if (!lastVisible) return;
    setLoading(true);
    const q = query(
      collection(fsdb, "Registrations"),
      orderBy("ticket.studentId"),
      startAfter(lastVisible),
      limit(PAGE_SIZE),
    );
    const querySnapshot = await getDocs(q);
    const newTickets: TicketData[] = [];
    querySnapshot.forEach((doc) => {
      newTickets.push(doc.data().ticket);
    });
    setTickets([...tickets, ...newTickets]);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  useEffect(() => {
    initFetch();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold">
        Ticket Registration
      </h1>

      <div className="overflow-x-auto p-16">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Student ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Ticket ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Registered
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created Time
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket, index) => {
              if (ticket.createdAt instanceof Timestamp) {
                ticket.createdAt = ticket.createdAt.toDate().toISOString();
              }
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {ticket.ticket.studentId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {ticket.ticket.ticketId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {ticket.registered ? <span>Yes</span> : <span>No</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {ticket.createdAt}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <a
                      href="#"
                      className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          onClick={fetchMoreData}
          className="mt-4 px-4 py-2 bg-blue-500 text-sm text-white font-medium rounded hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
