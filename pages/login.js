import React, { useState } from "react";
import firebaseClient from "../firebaseClient";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: 15,
    // width: "100%",
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [erroropen, setErrorOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleErrorClick = () => {
    setErrorOpen(true);
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(error);
    if (error === "") {
      setOpen(true);
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          <span style={{ fontSize: "15px" }}>Successfully Logged In</span>
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={erroropen}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          <span style={{ fontSize: "15px" }}>{error}</span>
        </Alert>
      </Snackbar>
      <div className="login">
        <div className="login__heading">Login to Shramin</div>
        <form onSubmit={(e) => handleForm(e)}>
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
              style={{ marginBottom: "40px", width: "100%" }}
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
              type="submit"
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
                    setError(message);
                    handleErrorClick();
                  });
              }}
            >
              LOGIN
            </Button>
          </div>
        </form>
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
