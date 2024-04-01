import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
<<<<<<< HEAD
} from "../util/firebase/firebase";
import { User } from "firebase/auth";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: (_newUser: User | null) => null,
});

export const UserProvider = ({ children }: any) => {
  // Consider using a type for User (if available)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const value: any = {
    currentUser,
    setCurrentUser: setCurrentUser as () => null,
  };
  console.log("Value", value);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      // Explicitly handle null case for setCurrentUser
      setCurrentUser((prevUser) => (user ? user : prevUser));
=======
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
>>>>>>> 0c132a48311b8ba37c35262ba66d97f84d53c8dd
    });

    return unsubscribe;
  }, []);
<<<<<<< HEAD
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
=======

  return (
    <UserContext.Provider value={value as any}>{children}</UserContext.Provider>
  );
>>>>>>> 0c132a48311b8ba37c35262ba66d97f84d53c8dd
};
