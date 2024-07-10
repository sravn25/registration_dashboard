import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface TicketData {
  ticketNumber: string;
  studentId: string;
  createdAt: string;
  registered: boolean;
}

export const registerTicket = async (ticketData: TicketData): Promise<void> => {
  const { ticketNumber, studentId, createdAt, registered } = ticketData;
  const docRef = doc(db, "registration", studentId);

  try {
    await setDoc(docRef, { ticketNumber, studentId, createdAt, registered });
    console.log("Document successfully written with ID: ", docRef.id);
  } catch (error) {
    console.log("Error registering ticket:", error);
  }
};

export const checkDuplicate = async (studentId: string): Promise<boolean> => {
  const docRef = doc(db, "registration", studentId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};
