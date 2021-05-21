import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: 15,
    width: "90%",
  },
  inputlabel: {
    fontSize: 15,
    backgroundColor: "white",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <div className="signup">
        <div className="signup__heading">Join Shramin</div>
        <label className="signup__label">Email</label>
        <div className="signup__textbox">
          <TextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.inputlabel }}
            style={{ marginBottom: "40px", marginTop: "10px" }}
          />

          <label className="signup__label">
            Password(6 or more characters)
          </label>
          <TextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.inputlabel }}
            style={{ marginTop: "10px" }}
          />
        </div>

        <div className="signup__button u-center-text margin-top-medium">
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "3px 15px", fontSize: "15px" }}
            onClick={async () => {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  alert(message);
                });
            }}
          >
            SIGNUP
          </Button>
        </div>

        <div className="signup__user u-margin-top-medium u-center-text">
          <div className="signup__user__text">
            Already on Shramin?
            <Link href="/login">
              <a className="signup__user__link"> Log In</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
