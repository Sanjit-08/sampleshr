import React, { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { TextField, InputAdornment } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import loadable from "@loadable/component";
import MediaQuery from "react-responsive";
import { isMobile } from "react-device-detect";
const Navigation = loadable(() => import("../components/Navigation"));
import { AuthContext } from "../auth";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import API from "../API";
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

const Login = (props) => {
  // const location = useLocation();
  // console.log(location);
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const path = router.pathname;
  const { authuser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [emailerroropen, setEmailError] = useState(false);
  const [erroropen, setErrorOpen] = useState(false);
  const [passreset, SetPassreset] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [click, setClick] = useState(false);
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

  const handleCloseEmailError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setEmailError(false);
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
    if (email === "") {
      setEmailError(true);
    }
    if (email !== "") {
      handlepassResetClick();
    }
    var actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: false,
    };
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleForm = (e) => {
    e.preventDefault();
    console.log(error);
  };

  useEffect(() => {
    if (authuser) {
      setShow(false);
    }
  });

  var provider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;

        var token = credential.accessToken;
        setOpen(true);
        window.location.href = "/dashboard";
        var user = result.user;

        setEmailId(user.email);
      })
      .catch((error) => {
        var errorMessage = error.message;
      });
  };

  const googleSignInWithMobile = () => {
    document.getElementById("log").style.display = "none";
    document.getElementById("newuser").style.display = "none";
    setShow(true);
    setClick(true);
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {
        setClick(true);
      });
  };

  function initApp() {
    setShow(true);
    document.getElementById("log").style.display = "none";
    document.getElementById("newuser").style.display = "none";
    document.getElementById("log").style.opacity = 0;
    document.getElementById("newuser").style.opacity = 0;
    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          var token = result.credential.accessToken;
          console.log(token);
          setOpen(true);
          window.location.href = "/dashboard";
          setToken(token);
          setShow(false);
        } else {
          setShow(false);
          console.log("No Token");
        }
        var user = result.user;
        document.getElementById("log").style.display = "block";
        document.getElementById("newuser").style.display = "block";
        document.getElementById("log").style.opacity = 1;
        document.getElementById("newuser").style.opacity = 1;
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "You have already signed up with a different auth provider for that email."
          );
        } else {
          console.error(error);
        }
      });
  }

  if (typeof window !== "undefined" && isMobile) {
    window.onload = function () {
      initApp();
    };
  }

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
        <meta property="og:url" content="https://shramin.vercel.app/login" />
      </Head>
      <Navigation />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
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
          vertical: "top",
          horizontal: "center",
        }}
        open={emailerroropen}
        autoHideDuration={3000}
        onClose={handleCloseEmailError}
      >
        <Alert onClose={handleCloseEmailError} severity="error">
          <span style={{ fontSize: "15px" }}>Enter a valid email address</span>
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
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
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          <span style={{ fontSize: "15px" }}>{error}</span>
        </Alert>
      </Snackbar>
      {!authuser ? (
        <div className="login" id="log">
          <div className="login__gbox">
            <div
              className="login__googlebutton"
              onClick={(e) =>
                isMobile ? googleSignInWithMobile(e) : googleSignIn()
              }
            >
              <div className="login__giconwrapper">
                <img
                  className="login__gicon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <div className="login__btntext">Sign in with Google</div>
            </div>
          </div>

          <div className="u-margin-top-small u-center-text login__ortext">
            OR
          </div>
          <div className="login__heading u-center-text">Login to ShramIn</div>
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
                      let storedToken = token;
                      API({
                        method: "post",
                        url: "/signup",
                        headers: {
                          Authorization: `Bearer ${storedToken}`,
                          "Content-Type": "multipart/form-data",
                          "Cache-Control": "no-cache",
                          Connection: "keep-alive",
                          Accept: "application/json",
                        },
                      })
                        .then((result) => {
                          console.log(result);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                      // window.location.href = "/dashboard";
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
          <div className="login__newuser u-margin-top-small" id="newuser">
            <div className="login__newuser__text">
              New to ShramIn?
              <Link href="/signup">
                <a className="login__newuser__link"> Sign Up</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* {!authuser ? (
        <div className="login__newuser u-margin-top-small" id="newuser">
          <div className="login__newuser__text">
            New to ShramIn?
            <Link href="/signup">
              <a className="login__newuser__link"> Sign Up</a>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {show ? (
        <CircularProgress
          size="35px"
          style={{
            marginTop: 180,
            marginLeft: 170,
            color: "#4ad7d1",
            fontWeight: "bold",
            zIndex: -1,
          }}
        />
      ) : (
        ""
      )}

      {authuser ? (
        <div className="activeuser">
          <div className="activeuser__logo">
            Welcome to Shram<span className="activeuser__logo--green">In</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
