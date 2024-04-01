import SignUpForm from "../../components/Sign-up/Sign-up.component";
import SignInForm from "../../components/Sign-In/Sign-in.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
