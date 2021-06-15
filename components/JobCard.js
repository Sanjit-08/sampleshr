import React from "react";
import logo from "../src/logo.png";
import Link from "next/link";

const JobCard = (props) => {
  // const { info } = props;
  // const{jobdata}=props;

  const reverse = (str) => {
    var splitString = str.split("-");

    var reverseArray = splitString.reverse();

    var joinArray = reverseArray.join("-");

    return joinArray;
  };
  let { company, trade, location, salary, date } = props;
  date = reverse(date.split("T")[0]);
  if (salary === "0 to 10000") {
    salary = "0-10k";
  }
  if (salary === "10000 to 20000") {
    salary = "10k-20k";
  }
  const today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  var newdate = dd + "-" + mm + "-" + yyyy;
  console.log(newdate);
  if (newdate === date) {
    date = "Today";
  }

  return (
    <div className="jobcard">
      <div className="jobcard__information">
        <div className="jobcard__profile">{trade}</div>
        <div className="jobcard__company">{company}</div>
        <div className="jobcard__location">{location}</div>
        <div className="jobcard__salary">&#8377;{salary} / month</div>
        <div className="jobcard__date">&#128337;{date}</div>
      </div>
      <Link href={`jobapplications/${trade}`}>
        <a className="jobcard__application">40 Applications</a>
      </Link>
    </div>
  );
};

export default JobCard;
