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
  const hidebackground = () => {
    var nav = document.getElementById("navi-toggle");
    nav.checked = false;
    var list = document.getElementById("list");
  };
  return (
    <section className="navigation">
      <div className="navigation__logo">
        <div className="navigation__logo--text">
          Shram<span className="navigation__logo--green">In</span>
        </div>
      </div>

      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />

      <label for="navi-toggle" className="navigation__button1">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <div className="navigation__nav">
        <ul className="navigation__list1" id="list">
          <li className="navigation__item">
            <Link href="/">
              <a className="navigation__link1" onClick={() => hidebackground()}>
                Home
              </a>
            </Link>
          </li>
          <li className="navigation__item">
            <Link href="/about">
              <a className="navigation__link1" onClick={() => hidebackground()}>
                {" "}
                About
              </a>
            </Link>
          </li>
          <li className="navigation__item">
            <Link href="/features">
              <a className="navigation__link1" onClick={() => hidebackground()}>
                {" "}
                Features
              </a>
            </Link>
          </li>
        </ul>
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
