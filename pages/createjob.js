import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../components/Navigation";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";
import { allApi } from "../config";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import API from "../API";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "16px",
  },
  formControl: {
    minWidth: 120,
  },
}));

const CreateJob = (props) => {
  const { token } = props;
  const { show } = props;
  const { tradedata } = props;
  const { educationdata } = props;
  const { workdata } = props;
  const { salarydata } = props;
  const { expdata } = props;
  const { locationdata } = props;
  console.log(props);

  const classes = useStyles();
  const [companyName, setCompanyName] = useState("");
  const [selectedValue, setSelectedValue] = useState("yes");
  const [trade, setTrade] = useState(tradedata[0].id);
  const [education, setEducation] = useState(educationdata[0].id);
  const [work, setWork] = useState(workdata[0].id);
  const [experience, setExperience] = useState(expdata[0].id);
  const [salary, setSalary] = useState(salarydata[0].id);
  const [location, setLocation] = useState(locationdata[0].id);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [erroropen, setErrorOpen] = useState(false);
  const handleChangeRadio = (e) => {
    setSelectedValue(e.target.value);
  };

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

  const submitjob = (e) => {
    e.preventDefault();
    if (companyName === "") {
      setError("Please Enter the name of your company");
      handleErrorClick();
    } else if (description === "") {
      setError("Please Enter Job description");
      handleErrorClick();
    } else {
      const jobdata = {
        companyName: companyName,
        educationId: education,
        typeOfWorkId: work,
        bikeAndDl: selectedValue,
        salaryProvide: salary,
        jobDescription: description,
        tradeId: trade,
        salaryId: salary,
        locationId: location,
        educationId: education,
      };
      API({
        url: allApi.job,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
        data: jobdata,
      })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            handleClick();
            return response;
          } else {
            console.log("Somthing happened wrong");
          }
        })
        .catch((err) => err);
    }
  };

  const handleKey = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      console.log("Enter");
      e.preventDefault();
      console.log(document.activeElement.id);
      var list = document.getElementsByClassName("createjob__select");
      for (var i = 0; i < list.length; i++) {
        if (document.activeElement.id == list[i].id && i + 1 < list.length) {
          list[i + 1].focus();
          break;
        }
      }
    }
  };
  return (
    <>
      <Navigation show={show} />
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
          <span style={{ fontSize: "15px" }}>Job Created successfully!!</span>
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
      {show ? (
        <div className="createjob">
          <div className="createjob__heading u-center-text u-margin-bottom-medium">
            Create New Job
          </div>
          <form onSubmit={(e) => submitjob(e)}>
            <div className="createjob__details">
              <div className="createjob__field">
                <div className="createjob__label">Enter Your Company Name</div>
                <TextField
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  id="outlined-basic"
                  variant="outlined"
                  className="createjob__company"
                  InputProps={{ style: { fontSize: 20, fontWeight: 300 } }}
                />
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Job Location</div>

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="createjob__select"
                  id="1"
                >
                  {locationdata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.masterName}
                    </option>
                  ))}
                </select>
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Bike and DL Required</div>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    value={selectedValue}
                    onChange={handleChangeRadio}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio color="primary" />}
                      label="Yes"
                      classes={{ label: classes.label }}
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio color="primary" />}
                      label="No"
                      classes={{ label: classes.label }}
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Choose Job Trade</div>

                <select
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  onKeyPress={(e) => handleKey(e)}
                  className="createjob__select"
                  id="2"
                >
                  {tradedata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.masterName}
                    </option>
                  ))}
                </select>
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Education Required For Job</div>

                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  onKeyPress={(e) => handleKey(e)}
                  className="createjob__select"
                  id="3"
                >
                  {educationdata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.masterName}
                    </option>
                  ))}
                </select>
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Type of Work</div>

                <select
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  onKeyPress={(e) => handleKey(e)}
                  className="createjob__select"
                  id="4"
                >
                  {workdata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.masterName}
                    </option>
                  ))}
                </select>
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Experience</div>

                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  onKeyPress={(e) => handleKey(e)}
                  className="createjob__select"
                  id="5"
                >
                  {expdata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.masterName}
                    </option>
                  ))}
                </select>
              </div>

              <div class="createjob__field">
                <div class="createjob__label">Salary Provided for Job</div>

                <select
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  onKeyPress={(e) => handleKey(e)}
                  className="createjob__select"
                  id="6"
                >
                  {salarydata.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.masterName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="createjob__field">
                <div class="createjob__label">Job Description</div>
                <textarea
                  className="createjob__textbox"
                  placeholder="Type here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="createjob__field">
                <button
                  type="submit"
                  className="createjob__submit u-center-text"
                  onClick={(e) => submitjob(e)}
                >
                  Save Job
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  let show = true;
  const cookies = ctx.req.cookies;

  const token = cookies.token;

  let tradedata = [{}];
  let educationdata = [{}];
  let workdata = [{}];
  let salarydata = [{}];
  let expdata = [{}];
  let locationdata = [{}];

  // let trade = await API({
  //   url: allApi.master,
  //   params: {
  //     masterTypeId: 1,
  //   },
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "multipart/form-data",
  //     "Cache-Control": "no-cache",
  //     Connection: "keep-alive",
  //     Accept: "application/json",
  //   },
  // });

  // let trade = await fetch(allApi.HOME_URL + allApi.master + "?masterTypeId=1", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //     "Cache-Control": "no-cache",
  //     Connection: "keep-alive",
  //     Accept: "application/json",
  //   },
  // });

  // let result = await trade.json();

  if (cookies.userId) {
    show = true;
  }

  if (!cookies.userId) {
    show = false;
  }

  if (show) {
    let trade = await API({
      url: allApi.master,
      params: {
        masterTypeId: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    tradedata = await trade.data;

    let education = await API({
      url: allApi.master,
      params: {
        masterTypeId: 2,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    educationdata = await education.data;

    let work = await API({
      url: allApi.master,
      params: {
        masterTypeId: 4,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    workdata = await work.data;

    let salary = await API({
      url: allApi.master,
      params: {
        masterTypeId: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    salarydata = await salary.data;

    let experience = await API({
      url: allApi.master,
      params: {
        masterTypeId: 3,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    expdata = await experience.data;

    let location = await API({
      url: allApi.master,
      params: {
        masterTypeId: 7,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

    locationdata = await location.data;
  }

  return {
    props: {
      show: show,
      token: show ? token : "",
      tradedata: show ? tradedata : "",
      educationdata: show ? educationdata : "",
      workdata: show ? workdata : "",
      salarydata: show ? salarydata : "",
      expdata: show ? expdata : "",
      locationdata: show ? locationdata : "",
    },
  };
}

export default CreateJob;
