import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { fsdb } from "./config";

export interface Ticket {
  studentId: string;
  ticketId: string;
}

export const addRegistration = async (ticket: Ticket) => {
  try {
    const docRef = await addDoc(collection(fsdb, "registrations"), {
      ticket,
    });
    console.log("Document successfully written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTicketIdByStudentId = async (studentId: string) => {
  const q = query(
    collection(fsdb, "registrations"),
    where("ticket.studentId", "==", studentId),
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`Ticket ID: ${doc.data().ticket.ticketId}`);
    console.log(data.ticket.ticketId);
  });
};

export const getStudentIdByTicketId = async (ticketId: string) => {
  const q = query(
    collection(fsdb, "registrations"),
    where("ticket.ticketId", "==", ticketId),
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`Student ID: ${data.studentId}`);
    console.log(`Student ID: ${JSON.stringify(data, null, 2)}`);
    console.log(data.ticket.studentId);
  });
};

export const getTicket = async () => {
  const querySnapshot = await getDocs(collection(fsdb, "registrations"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(`${JSON.stringify(doc.data(), null, 2)}`);
  });
};
