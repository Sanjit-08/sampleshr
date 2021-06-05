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

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: "16px",
  },
  formControl: {
    minWidth: 120,
  },
}));

const CreateJob = () => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("yes");
  const [trade, setTrade] = useState("");
  const [education, setEducation] = useState("");
  const [work, setWork] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const handleChangeRadio = (e) => {
    setSelectedValue(e.target.value);
  };
  //   console.log(selectedValue);
  //   console.log(trade);
  const submitjob = (e) => {
    e.preventDefault();
    console.log(selectedValue);
    console.log(trade);
    console.log(education);
    console.log(work);
    console.log(salary);
    console.log(description);
  };
  return (
    <>
      <Navigation />
      <div className="createjob">
        <div className="createjob__heading u-center-text u-margin-bottom-medium">
          Create New Job
        </div>
        <form onSubmit={(e) => submitjob(e)}>
          <div className="createjob__details">
            <div className="createjob__field">
              <div className="createjob__label">Enter Your Company Name</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="createjob__company"
                InputProps={{ style: { fontSize: 20, fontWeight: 300 } }}
              />
            </div>

            <div className="createjob__field">
              <div className="createjob__label">Job Location</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="createjob__company"
                InputProps={{ style: { fontSize: 20, fontWeight: 300 } }}
              />
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
                className="createjob__select"
              >
                <option value="">Pick an option</option>
                <option value="Electrician">Electrician</option> <br />
                <option value="Plumber">Plumber</option>
                <option value="Mason">Mason</option>
                <option value="Painter">Painter</option>
              </select>
            </div>

            <div class="createjob__field">
              <div class="createjob__label">Education Required For Job</div>

              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="createjob__select"
              >
                <option value="">Pick an option</option>
                <option value="Below 10th pass">Below 10th pass</option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="ITI">ITI</option>
                <option value="Diploma Degree">Diploma Degree</option>
              </select>
            </div>

            <div class="createjob__field">
              <div class="createjob__label">Type of Work</div>

              <select
                value={work}
                onChange={(e) => setWork(e.target.value)}
                className="createjob__select"
              >
                <option value="">Pick an option</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Contract">Contract</option>
                <option value="Part time">Part time</option>
                <option value="Full Time">Full Time</option>
              </select>
            </div>

            <div class="createjob__field">
              <div class="createjob__label">Salary Provided for Job</div>

              <select
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="createjob__select"
              >
                <option value="">Pick an option</option>
                <option value="5k to 10k">5k to 10k</option>
                <option value="10k to 20k">10k to 20k</option>
                <option value="20k to 50k">20k to 50k</option>
                <option value="50k above">50k above</option>
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
    </>
  );
};

export default CreateJob;
