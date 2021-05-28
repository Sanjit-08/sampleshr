import React, { useState, useEffect, useContext, createContext } from "react";
import firebaseClient from "./firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);
  const [authuser, setAuthUser] = useState(() => {
    const authuser = firebase.auth().currentUser;
    return authuser;
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      setAuthUser(firebaseUser);
    });
  }, []);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        localStorage.setItem("token", undefined);
        localStorage.setItem("authtoken", false);
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("authtoken", true);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, authuser: authuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
