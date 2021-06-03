import React from "react";
import logo from "../src/logo.png";

const JobCard = (props) => {
  const { info } = props;
  console.log(props);
  const { profile, company, location, salary, date } = info[0];
  return (
    <div className="jobcard">
      <div className="jobcard__shape">
        <div className="jobcard__image"></div>
      </div>
      <div className="jobcard__information">
        <div className="jobcard__profile">{profile}</div>
        <div className="jobcard__company">{company}</div>
        <div className="jobcard__location">{location}</div>
        <div className="jobcard__salary">&#8377;{salary} / month</div>
        <div className="jobcard__date">&#128337;{date}</div>
      </div>
      <div className="jobcard__application"> 40 Applications</div>
    </div>
  );
};

export default JobCard;
