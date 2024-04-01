import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
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
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
