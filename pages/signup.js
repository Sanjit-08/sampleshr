import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebaseClient from "../firebaseClient";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import { TextField, InputAdornment } from "@material-ui/core";
import Link from "next/link";
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [erroropen, setErrorOpen] = useState(false);
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
      <div className="signup">
        <div className="signup__heading">Join ShramIn</div>
        <form onSubmit={(e) => handleForm(e)}>
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
              type={showPassword ? "text" : "password"}
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
              style={{ marginTop: "10px" }}
            />
          </div>
        </form>

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
                  setError(message);
                  handleErrorClick();
                });
            }}
          >
            SIGNUP
          </Button>
        </div>

        <div className="signup__user u-margin-top-medium u-center-text">
          <div className="signup__user__text">
            Already on ShramIn ?
            <Link href="/login">
              <a className="signup__user__link"> Login</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
