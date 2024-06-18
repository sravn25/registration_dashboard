import React, { useState, useEffect, useCallback } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { TicketData } from "../../../firebase/firestore";
import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { fsdb } from "../../../firebase/config";

const PAGE_SIZE = 5;

const Table: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const initFetch = useCallback(async () => {
    setLoading(true);
    const q = query(
      collection(fsdb, "registrations"),
      orderBy("ticket.ticketId"),
      limit(PAGE_SIZE),
    );
    const querySnapshot = await getDocs(q);
    const ticketsList: TicketData[] = querySnapshot.docs.map(
      (doc) => doc.data() as TicketData,
    );

    setTickets(ticketsList);
    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setHasMore(querySnapshot.docs.length === PAGE_SIZE);
    setLoading(false);
  }, []);

  const fetchSearchData = async (search: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(fsdb, "registrations"),
        where("ticket.ticketId", "==", search),
        orderBy("ticket.ticketId"),
        limit(PAGE_SIZE),
      );
      const querySnapshot = await getDocs(q);
      const ticketsList: TicketData[] = querySnapshot.docs.map(
        (doc) => doc.data() as TicketData,
      );

      const remainingTicketsQuery = query(
        collection(fsdb, "registrations"),
        orderBy("ticket.ticketId"),
        limit(PAGE_SIZE),
      );
      const remaningQuerySnapshot = await getDocs(remainingTicketsQuery);
      const remainingTickets: TicketData[] = remaningQuerySnapshot.docs
        .map((doc) => doc.data() as TicketData)
        .filter((ticket) => ticket.ticket.ticketId !== search);

      setTickets([...ticketsList, ...remainingTickets]);
      setLastVisible(
        remaningQuerySnapshot.docs[remaningQuerySnapshot.docs.length - 1],
      );
      setHasMore(remaningQuerySnapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(async () => {
    if (lastVisible && !isLoading && hasMore) {
      setLoading(true);
      const q = query(
        collection(fsdb, "registrations"),
        orderBy("ticket.ticketId"),
        startAfter(lastVisible),
        limit(PAGE_SIZE),
      );
      const querySnapshot = await getDocs(q);
      const ticketsList: TicketData[] = querySnapshot.docs.map(
        (doc) => doc.data() as TicketData,
      );
      setTickets((prevTickets) => [...prevTickets, ...ticketsList]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === PAGE_SIZE);
      setLoading(false);
    }
  }, [lastVisible, isLoading, hasMore]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      initFetch();
    } else {
      fetchSearchData(searchTerm);
    }
  };

  const formatDate = (timestamp: Timestamp | string): string => {
    const date =
      timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold">Ticket Registry</h1>

      <div className="overflow-x-auto p-16">
        <div className="flex gap-4 pb-8 justify-center">
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="search" className="sr-only">
              Ticket ID
            </label>

            <div className="flex gap-4">
              <input
                type="number"
                className=" rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Ticket ID"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white rounded bg-blue-500 disabled:bg-blue-400"
                disabled={isLoading}
              >
                Search
              </button>
            </div>
          </form>
          <button
            className="px-4 py-2 text-white rounded bg-indigo-500 disabled:bg-indigo-400"
            onClick={initFetch}
            disabled={isLoading}
          >
            Refresh
          </button>
        </div>

        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md text-center">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Ticket ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Student ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Registered
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {tickets.map((ticket, index) => {
              return (
                <tr key={index} className="group">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 group-hover:bg-indigo-100">
                    {ticket.ticket.ticketId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-900 group-hover:bg-indigo-100">
                    {ticket.ticket.studentId}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 group-hover:bg-indigo-100">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2  group-hover:bg-indigo-100">
                    {ticket.registered ? (
                      <span className="text-green-500 flex items-center justify-center">
                        <FaCheck />
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center justify-center">
                        <FaXmark />
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 group-hover:bg-indigo-100">
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
        {hasMore && (
          <button
            onClick={fetchMoreData}
            className="mt-4 px-4 py-2 bg-blue-500 text-sm text-white font-medium rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
