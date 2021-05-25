import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import firebase from "firebase/app";
import { AuthContext } from "../auth";

const Navigation = (props) => {
  const { user } = useContext(AuthContext);
  const [show, setshow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setshow(true);
    }, 500);
  }, [user]);
  const logout = async (e) => {
    e.preventDefault();
    await firebase.auth().signOut();
  };
  return (
    <section className="navigation">
      <div className="navigation__logo">
        <div className="navigation__logo--text">
          Shram<span className="navigation__logo--green">In</span>
        </div>
      </div>

      {!user && show ? (
        <div className="navigation__link">
          <Link href="/login">
            <a className="navigation__button">Employer Login</a>
          </Link>
        </div>
      ) : (
        ""
      )}
      {user && show ? (
        <div className="navigation__link">
          <a
            className="navigation__button"
            // onClick={async () => {
            //   await firebase.auth().signOut();
            // }}
            onClick={(e) => logout(e)}
          >
            Logout
          </a>
        </div>
      ) : (
        ""
      )}

      <ul className="navigation__list">
        <li>
          <Link href="/">
            <a className="navigation__listitem">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="navigation__listitem">About</a>
          </Link>
        </li>
        <li>
          <Link href="/features">
            <a className="navigation__listitem">Features</a>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Navigation;
