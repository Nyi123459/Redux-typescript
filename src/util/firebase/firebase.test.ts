import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, signInWithGooglePopup } from "./firebase";

jest.mock("firebase/auth", () => ({
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

describe("signInWithGooglePopup", () => {
  let mockSignInWithPopup: jest.Mock;
  let googleProvider: GoogleAuthProvider;

  beforeEach(() => {
    mockSignInWithPopup = signInWithPopup as jest.Mock;
    googleProvider = new GoogleAuthProvider();
  });

  it("should successfully sign in with Google", async () => {
    const mockUser = { uid: "12345" };
    mockSignInWithPopup.mockResolvedValue(mockUser);

    const user = await signInWithGooglePopup();

    expect(mockSignInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
    expect(user).toEqual(mockUser);
  });

  it("should handle errors during sign-in", async () => {
    const error = new Error("Firebase Error");
    mockSignInWithPopup.mockRejectedValue(error);

    try {
      await signInWithGooglePopup();
      throw new Error("Expected an error to be thrown"); // Throw error if no error occurs
    } catch (err) {
      expect(err).toEqual(error);
    }
  });
});
