import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  increment,
  deleteDoc,
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

export const updateRegistered = async (
  studentId: string,
  registered: boolean,
) => {
  try {
    const docRef = doc(db, "registration", studentId);
    await updateDoc(docRef, {
      registered: registered,
    });
    console.log("Document successfully updated");

    const counterRef = doc(db, "counter", "tickets");
    await setDoc(counterRef, {
      registeredCount: increment(registered ? 1 : -1),
    });
  } catch (error) {
    console.error("Error updating doc:", error);
  }
};

export const getRegisteredCount = async () => {
  const counterRef = doc(db, "counter", "tickets");
  const counterDoc = await getDoc(counterRef);
  return counterDoc.data()?.registeredCount || 0;
};

export const deleteTicket = async (studentId: string) => {
  try {
    const ticketRef = doc(db, "registration", studentId);
    const ticketDoc = await getDoc(ticketRef);

    if (ticketDoc.exists()) {
      const ticketData = ticketDoc.data();
      const registered = ticketData.registered;

      await deleteDoc(ticketRef);
      console.log("successfully deleted", studentId);

      if (registered) {
        const counterRef = doc(db, "counter", "tickets");
        await updateDoc(counterRef, {
          registeredCount: increment(-1),
        });
        console.log("counter updated");
      }
    } else {
      console.log("no exist");
      throw new Error("Ticket not found");
    }
  } catch (error) {
    console.error("Error deleting ticket");
  }
};
