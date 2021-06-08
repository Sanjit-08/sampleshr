import React, { useState, useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import DrawerComponent from "../components/DrawerComponent";
import { makeStyles } from "@material-ui/core/styles";
import SearchFilter from "../components/SearchFilter";
import CompanyProfile from "../components/CompanyProfile";
import JobCard from "../components/JobCard";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import API from "../API";

const Dashboard = (props) => {
  const { list } = props;
  const { info } = props;
  const { cookies } = props;
  const { show } = props;
  console.log(show);
  console.log(cookies.userId);
  console.log(props);
  return (
    <>
      <Navigation show={show} />
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

export async function getServerSideProps(ctx) {
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

  let show = true;
  const cookies = ctx.req.cookies;

  if (cookies.userId) {
    show = true;
  }

  if (!cookies.userId) {
    show = false;
  }

  // const res=API.get("/",{
  //   params:{
  //     userId:
  //   }
  // })

  return {
    props: {
      list: list,
      info: info,
      cookies: cookies,
      show: show,
    },
  };
}

export default Dashboard;
