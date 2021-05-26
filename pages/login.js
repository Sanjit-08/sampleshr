import React, { useState } from "react";
import Head from "next/head";
import firebaseClient from "../firebaseClient";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { TextField, InputAdornment } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
  const [passreset, SetPassreset] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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

  const handleCloseReset = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    SetPassreset(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleErrorClick = () => {
    setErrorOpen(true);
  };

  const handlepassResetClick = () => {
    SetPassreset(true);
  };

  const passwordReset = (e) => {
    e.preventDefault();
    handlepassResetClick();
    var actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    };
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(error);
  };

  return (
    <>
      <Head>
        <title>ShramIn Login | ShramIn</title>
        <meta http-equiv="X-UA-Compatible" content="IE=EDGE"></meta>
        <meta charSet="UTF-8"></meta>
        <meta name="robots" content="noarchive"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Login to ShramIn to create job opportunities for blue collar workers and keep a track of all the candidates."
        />
        <meta property="og:site_name" content="ShramIn"></meta>
        <meta property="og:title" content="ShramIn Login | ShramIn" />
        <meta
          property="og:description"
          content="Login to ShramIn to create job opportunities for blue collar workers and keep a track of all the candidates."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://shramin.vercel.app/login"
        ></meta>
      </Head>
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={passreset}
        autoHideDuration={6000}
        onClose={handleCloseReset}
      >
        <Alert onClose={handleCloseReset} severity="success">
          <span style={{ fontSize: "15px" }}>
            We have sent a password reset link to your email
          </span>
        </Alert>
      </Snackbar>
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
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          <span style={{ fontSize: "15px" }}>{error}</span>
        </Alert>
      </Snackbar>
      <div className="login">
        <div className="login__heading">Login to ShramIn</div>
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
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
              fullWidth
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.inputlabel }}
            />

            <a
              href="/"
              className="u-margin-top-small login__resetpassword"
              onClick={(e) => passwordReset(e)}
            >
              Forgot password ?{" "}
            </a>
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
                    setOpen(true);
                    // let change = setTimeout(() => {
                    window.location.href = "/";
                    //   window.clearTimeout(change);
                    // }, 2000);
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
          New to ShramIn?
          <Link href="/signup">
            <a className="login__newuser__link"> Sign Up</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
