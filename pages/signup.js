import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
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
import loadable from "@loadable/component";
const Navigation = loadable(() => import("../components/Navigation"));
import { AuthContext } from "../auth";
import API from "../API";
import { allApi } from "../config";
import nookies from "nookies";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: 15,
    fontWeight: 300,
    width: "90%",
    height: "50px",
    outline: "0",
    border: "0",
    boxShadow: "0 0 0 1000px white inset",
    backgroundColor: "white",
    "&:focused": {
      backgroundColor: "white",
    },
  },
  inputlabel: {
    fontSize: 15,
    backgroundColor: "white",
    boxShadow: "0 0 0 1000px white inset",
  },
}));

const Signup = (props) => {
  const { show } = props;
  const { authuser } = useContext(AuthContext);
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
  };

  const registerEmployer = (token, empdata) => {
    API({
      url: allApi.employerSignUp,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        Accept: "application/json",
      },
      data: empdata,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log(response);
          console.log(response.data.employerId);
          let employerId = response.data.employerId;
          nookies.set(undefined, "employerId", employerId, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
          });
        } else {
          console.log("Something happened wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  const SignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(function () {
        setOpen(true);
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then((token) => {
            nookies.set(undefined, "token", token, {
              path: "/",
              maxAge: 30 * 24 * 60 * 60,
            });
            console.log("Bearer", token);
            API({
              method: "post",
              url: allApi.employerSignUp,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                Accept: "application/json",
              },
              data: {
                name: "Testing",
              },
            })
              .then((result) => {
                console.log(result);
                // let userId = result.data.userId;
                // console.log(userId);
                // localStorage.setItem("userId", userId);
                // nookies.set(undefined, "userId", userId, {
                //   path: "/",
                //   maxAge: 30 * 24 * 60 * 60,
                // });
                // let empdata = {
                //   id: userId,
                //   name: "Test123",
                // };
                // registerEmployer(token, empdata);
                // window.location.href = "/dashboard";
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch(function (error) {
        const message = error.message;
        setError(message);
        handleErrorClick();
      });
  };

  return (
    <>
      <Head>
        <title>SignUp | ShramIn</title>
        <meta http-equiv="X-UA-Compatible" content="IE=EDGE"></meta>
        <meta charSet="UTF-8"></meta>
        <meta name="robots" content="noarchive"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="A startup to generate employment opportunities for blue collar workers.Signup to build and engage with your professional network and start hiring blue collar workers."
        />
        <meta property="og:site_name" content="ShramIn"></meta>
        <meta property="og:title" content="Signup | ShramIn" />
        <meta
          property="og:description"
          content="A startup to generate employment opportunities for blue collar workers.Signup to build and engage with your professional network and start hiring blue collar workers."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://shramin.vercel.app/signup"
        ></meta>
      </Head>
      <Navigation show={show} />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
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
          vertical: "top",
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
      {!authuser && !show ? (
        <div className="signup">
          <div className="signup__heading">Join ShramIN</div>
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
                    <InputAdornment
                      position="end"
                      style={{ marginRight: "-13px" }}
                    >
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
              type="submit"
              style={{ padding: "3px 15px", fontSize: "15px" }}
              onClick={() => SignUp()}
            >
              SIGNUP
            </Button>
          </div>

          <div className="signup__user u-margin-top-medium u-center-text">
            <div className="signup__user__text">
              Already on ShramIN ?
              <Link href="/login">
                <a className="signup__user__link"> Login</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {authuser || show ? (
        <div className="activeuser">
          <div className="activeuser__logo">
            Welcome to Shram<span className="activeuser__logo--green">IN</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.cookies;

  let show = false;

  if (cookies.userId) {
    show = true;
  }

  if (!cookies.userId) {
    show = false;
  }

  return {
    props: {
      cookies: cookies,
      show: show,
    },
  };
}

export default Signup;
