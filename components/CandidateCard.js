import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CallIcon from "@material-ui/icons/Call";

const useStyles = makeStyles((theme) => ({
  large: {
    width: "10rem",
    height: "10rem",
  },
}));

const CandidateCard = (props) => {
  const classes = useStyles();
  const [shortlist, setShortList] = useState(true);
  const [hired, setHired] = useState(false);
  const [contacted, setContacted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [selectedvalue, setSelectedValue] = useState("shortlisted");
  const changeStatus = (e) => {
    let val = e.target.value;
    // setSelectedValue(val);
    switch (val) {
      case "shortlist":
        setShortList(true);
        setHired(false);
        setContacted(false);
        setRejected(false);
        break;
      case "hired":
        setShortList(false);
        setHired(true);
        setContacted(false);
        setRejected(false);
        break;
      case "contacted":
        setShortList(false);
        setHired(false);
        setContacted(true);
        setRejected(false);
        break;
      case "rejected":
        setShortList(false);
        setHired(false);
        setContacted(false);
        setRejected(true);
        break;
      default:
        break;
    }
  };

  return (
    <div class="cancard">
      <div class="cancard__left">
        <ul class="cancard__info">
          <li class="cancard__name">Rahul Kumar</li>
          <li class="cancard__infohead">
            Trade : <span class="cancard__infohead--text">Electrician</span>
          </li>
          <li class="cancard__infohead">
            Experience : <span class="cancard__infohead--text">0-2 years</span>
          </li>
          <li class="cancard__infohead">
            Applied : <span class="cancard__infohead--text">11/06/2021</span>
          </li>
          <li class="cancard__infohead">
            Start Date :{" "}
            <span class="cancard__infohead--text">Immediately</span>
          </li>
          <li class="cancard__infohead">
            Status : <span class="cancard__infohead--text">Available</span>
          </li>
        </ul>
        <div class="cancard__buttons">
          <button
            className={
              "cancard__button " + (shortlist ? "cancard__shortlist" : "")
            }
          >
            Shortlisted
          </button>
          <button
            className={"cancard__button " + (hired ? "cancard__hired" : "")}
          >
            Hired
          </button>
          <button
            className={
              "cancard__button " + (contacted ? "cancard__contacted" : "")
            }
          >
            Contacted
          </button>
          <button
            className={
              "cancard__button " + (rejected ? "cancard__rejected" : "")
            }
          >
            Rejected
          </button>
        </div>
      </div>

      <div class="cancard__right">
        <div class="cancard__candetails cancard__profilepic">
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
            className={classes.large}
          />
        </div>
        <button class="cancard__candetails cancard__candbutton cancard__candbutton--videoresume ">
          View Video Resume
        </button>
        <button class="cancard__candetails cancard__candbutton cancard__candbutton--resume">
          View Details
        </button>
        <button class="cancard__candetails cancard__candbutton cancard__candbutton--contact">
          <CallIcon
            fontSize="default"
            style={{ marginRight: "10px", transform: "translateY(12%)" }}
          ></CallIcon>
          Contact
        </button>
        <select
          class="cancard__candetails cancard__updatestatus"
          value={selectedvalue}
          onChange={(e) => changeStatus(e)}
        >
          <option key="" value="">
            Update Status
          </option>
          <option key="1" value="shortlist">
            Shortlisted
          </option>
          <option key="2" value="hired">
            Hired
          </option>
          <option key="3" value="contacted">
            Contacted
          </option>
          <option key="4" value="rejected">
            Rejected
          </option>
        </select>
      </div>
    </div>
  );
};

export default CandidateCard;
