import { useState } from "react";

import FormInput from "../Form-Input/Form-Input.components";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../util/firebase/firebase";

import "./Sign-up.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Check if userCredential is not undefined before accessing user property
      if (userCredential) {
        const { user } = userCredential;

        if (user) {
          await createUserDocumentFromAuth(user, { displayName });
          resetFormFields();
        } else {
          // Handle case where user is null
          console.error("User is null");
        }
      } else {
        // Handle case where userCredential is undefined
        console.error("User credential is undefined");
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button className="submit-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
