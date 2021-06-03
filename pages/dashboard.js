import React, { useState, useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import DrawerComponent from "../components/DrawerComponent";
import { makeStyles } from "@material-ui/core/styles";
import SearchFilter from "../components/SearchFilter";
import CompanyProfile from "../components/CompanyProfile";
import JobCard from "../components/JobCard";

const Dashboard = (props) => {
  const { list } = props;
  const { info } = props;
  console.log(props);
  return (
    <>
      <Navigation />
      <div style={{ overflowY: "auto", overflowX: "hidden" }}>
        <SearchFilter />
        <CompanyProfile />
      </div>
      <div className="jobheadline u-center-text u-margin-top-medium u-margin-bottom-small">
        Jobs Created
      </div>
      <JobCard info={info} />
      <JobCard info={info} />
      <JobCard info={info} />
      <JobCard info={info} />
      <DrawerComponent list={list} />
    </>
  );
};

export async function getServerSideProps() {
  const list = ["Dashboard", "Candidates Profile", "Candidates Status", "Jobs"];
  const info = [
    {
      profile: "Electrician Technician",
      company: "Blueberry E-services PVT. LTD",
      location: "Noida",
      salary: "30k",
      date: "Today",
    },
  ];

  return {
    props: {
      list: list,
      info: info,
    },
  };
}

export default Dashboard;
