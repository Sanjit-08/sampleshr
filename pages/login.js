import React, { useState } from "react";
import firebaseClient from "../firebaseClient";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";

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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <div className="login">
        <div className="login__heading">Login to Shramin</div>
        <div className="login__textbox">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.inputlabel }}
            style={{ marginBottom: "40px" }}
          />

          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            InputProps={{ className: classes.input }}
            InputLabelProps={{ className: classes.inputlabel }}
          />
        </div>

        <div className="login__button u-center-text margin-top-medium">
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "3px 15px", fontSize: "15px" }}
            onClick={async () => {
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function () {
                  window.location.href = "/";
                })
                .catch(function (error) {
                  const message = error.message;
                  alert(message);
                });
            }}
          >
            LOGIN
          </Button>
        </div>
      </div>
      <div className="login__newuser u-margin-top-small">
        <div className="login__newuser__text">
          New to Shramin?
          <Link href="/signup">
            <a className="login__newuser__link"> Sign Up</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
