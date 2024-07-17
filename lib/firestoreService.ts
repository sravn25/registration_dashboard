import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

export interface TicketData {
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

export const getAllRegistrations = async (): Promise<TicketData[]> => {
  try {
    const registrationCollection = collection(db, "registration");
    const registrationQuery = query(registrationCollection);
    const registrationSnapshot = await getDocs(registrationQuery);
    const registrationList = registrationSnapshot.docs.map(
      (doc) => doc.data() as TicketData,
    );
    return registrationList;
  } catch (error) {
    console.error("error fetching registration", error);
    throw error;
  }
};
