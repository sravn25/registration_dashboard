import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "./config";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

// export const doPasswordReset = (email: string) => {
//   return sendPasswordResetEmail(auth, email);
// };
//
// export const doPasswordChange = (password: string) => {
//   const currentUser: User | null = auth.currentUser;
//   if (currentUser) {
//     return updatePassword(auth.currentUser, password);
//   } else {
//     return Promise.reject(new Error("User is not authenticated"));
//   }
// };
