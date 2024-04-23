import * as firebaseAuth from "firebase/auth";

import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../firebase/firebase";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    GoogleAuthProvider: jest.fn().mockImplementation(() => {
      return {
        setCustomParameters: jest.fn(),
      };
    }),
    signInWithPopup: jest.fn(),
    signInWithRedirect: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  };
});

describe("firebase utils", () => {
  test("signInWithGooglePopup to call firestoreAuth's signInWithPopup", () => {
    signInWithGooglePopup();
    expect(firebaseAuth.signInWithPopup).toHaveBeenCalled();
  });

  test("signInWithGoogleRedirect to call firestoreAuth's signInWithRedirect", () => {
    signInWithGoogleRedirect();
    expect(firebaseAuth.signInWithRedirect).toHaveBeenCalled();
  });

  test("signInAuthUserWithEmailAndPassword to call firestoreAuth's signInWithEmailAndPassword", () => {
    const testEmail = "testEmail",
      testPassword = "testPassword";
    signInAuthUserWithEmailAndPassword(testEmail, testPassword);

    expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testEmail,
      testPassword
    );
  });

  test("createAuthUserWithEmailAndPassword to call firestoreAuth's createUserWithEmailAndPassword", () => {
    const testEmail = "testEmail",
      testPassword = "testPassword";
    createAuthUserWithEmailAndPassword(testEmail, testPassword);

    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      undefined,
      testEmail,
      testPassword
    );
  });

  test("signOutUser to call firestoreAuth's signOut", () => {
    signOutUser();
    expect(firebaseAuth.signOut).toHaveBeenCalled();
  });
});

