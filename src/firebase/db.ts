import { db } from "./config";
import { ref, set } from "firebase/database";

export interface Student {
  studentId: string;
  ticketId: string;
}

export const writeData = (student: Student) => {
  set(ref(db, "registry/" + student.studentId), student)
    .then(() => {
      console.log(`${student.studentId} saved successfully`);
    })
    .catch((error) => {
      console.error(`Error writing ${student.studentId}: ${error}`);
    });
};
