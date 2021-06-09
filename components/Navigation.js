import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import firebase from "firebase/app";
import { AuthContext } from "../auth";
import { useRouter } from "next/router";
import nookies, { parseCookies } from "nookies";
import { destroyCookie } from "nookies";

const Navigation = (props) => {
  const { user } = useContext(AuthContext);
  const { authuser } = useContext(AuthContext);
  const router = useRouter();
  const [change, setChange] = useState(true);
  const { show } = props;
  const pathname = router.pathname;
  const path =
    pathname === "/dashboard" ||
    pathname === "/candidateprofile" ||
    pathname === "/candidatestatus" ||
    pathname === "/jobs" ||
    pathname === "/createjob"
      ? false
      : true;
  // const [show, setshow] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setshow(true);
  //   }, 500);
  // }, [user]);
  const logout = async (e) => {
    e.preventDefault();
    await firebase.auth().signOut();
    localStorage.removeItem("userId");
    setChange(!change);
    destroyCookie(null, "token");
    destroyCookie(null, "userId");

    if (!path) {
      window.location.href = "/login";
    }
  };
  const hidebackground = () => {
    var nav = document.getElementById("navi-toggle");
    nav.checked = false;
    var list = document.getElementById("list");
  };

  return (
    <section className="navigation">
      <div className="navigation__logo">
        {/* <div className="navigation__logo--text">
          Shram<span className="navigation__logo--green">In</span>
        </div> */}
        <div className="navigation__image">&nbsp;</div>
      </div>

      <input
        type="checkbox"
        className="navigation__checkbox"
        id="navi-toggle"
      />

      <label htmlFor="navi-toggle" className="navigation__button1">
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

          {show || authuser ? (
            <li className="navigation__item">
              <Link href="/dashboard">
                <a
                  className="navigation__link1"
                  onClick={() => hidebackground()}
                >
                  {" "}
                  Dashboard
                </a>
              </Link>
            </li>
          ) : (
            ""
          )}

          {show || authuser ? (
            <li className="navigation__item">
              <Link href="/createjob">
                <a
                  className="navigation__link1"
                  onClick={() => hidebackground()}
                >
                  {" "}
                  Create Job
                </a>
              </Link>
            </li>
          ) : (
            ""
          )}

          {show || authuser ? (
            <li className="navigation__item">
              <Link href="/profile">
                <a
                  className="navigation__link1"
                  onClick={() => hidebackground()}
                >
                  {" "}
                  Candidates Profile
                </a>
              </Link>
            </li>
          ) : (
            ""
          )}

          {show || authuser ? (
            <li className="navigation__item">
              <Link href="/status">
                <a
                  className="navigation__link1"
                  onClick={() => hidebackground()}
                >
                  {" "}
                  Candidates Status
                </a>
              </Link>
            </li>
          ) : (
            ""
          )}

          {show || authuser ? (
            <li className="navigation__item">
              <Link href="/jobs">
                <a
                  className="navigation__link1"
                  onClick={() => hidebackground()}
                >
                  {" "}
                  My Jobs
                </a>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>

      {!show && !authuser ? (
        <div className="navigation__link">
          <Link href="/login">
            <a className="navigation__button">Employer Login</a>
          </Link>
        </div>
      ) : (
        ""
      )}
      {show || authuser ? (
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
        {show || authuser ? (
          <li>
            <Link href="/createjob">
              <a className="navigation__listitem">Create New Job</a>
            </Link>
          </li>
        ) : (
          ""
        )}

        {show || authuser ? (
          <li>
            <Link href="/dashboard">
              <a className="navigation__listitem">Dashboard</a>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </section>
  );
};

export default Navigation;
