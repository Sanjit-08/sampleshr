import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import firebase from "firebase/app";
import { AuthContext } from "../auth";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="navbar">
      <div className="navbar__links">
        {!user ? (
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "40px", color: "white" }}
          >
            <Link href="/login">
              <a className="navbar__linktext">LOG IN</a>
            </Link>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "40px", color: "white" }}
            onClick={async () => {
              await firebase.auth().signOut();
            }}
          >
            <Link href="/">
              <a className="navbar__linktext">LOG OUT</a>
            </Link>
          </Button>
        )}

        {!user ? (
          <Button variant="contained" color="secondary">
            <Link href="/signup">
              <a className="navbar__linktext">SIGNUP</a>
            </Link>
          </Button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Navbar;
