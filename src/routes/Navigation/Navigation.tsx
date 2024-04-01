import { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../context/userContext";
import { signOutUser } from "../../util/firebase/firebase";

import "./Navigation.styles.scss";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <Fragment>
      <div className="navigation">
        <div className="nav-links-container">
          {currentUser ? (
            <button
              className="nav-link"
              onClick={handleSignOut}
              disabled={signingOut}>
              {signingOut ? "Signing Out..." : "SIGN OUT"}
            </button>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
