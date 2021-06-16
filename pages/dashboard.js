import React, { useState, useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import DrawerComponent from "../components/DrawerComponent";
import { makeStyles } from "@material-ui/core/styles";
import SearchFilter from "../components/SearchFilter";
import CompanyProfile from "../components/CompanyProfile";
import JobCard from "../components/JobCard";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { allApi } from "../config";
import API from "../API";

const Dashboard = (props) => {
  const { list } = props;
  const { info } = props;
  const { cookies } = props;
  const { show } = props;
  const { trades } = props;
  console.log(trades);
  const { jobdata } = props;
  const { revdata } = props;
  console.log(revdata);

  console.log(jobdata);

  console.log(show);
  console.log(cookies.userId);
  console.log(props);
  return (
    <>
      <Navigation show={show} />
      {show ? (
        <div>
          <div style={{ overflowY: "auto", overflowX: "hidden" }}>
            <SearchFilter />
            <CompanyProfile />
          </div>
          <div className="jobheadline u-center-text u-margin-top-medium u-margin-bottom-small">
            MY JOBS
          </div>
          {jobdata &&
            jobdata.map((job) => (
              <JobCard
                company={job.companyName}
                trade={job.trade.masterName}
                location={job.location.masterName}
                salary={job.salary.masterName}
                date={job.createdAt}
              />
            ))}
          {/* <JobCard info={info} jobdata={jobdata} />
          <JobCard info={info} jobdata={jobdata} />
          <JobCard info={info} jobdata={jobdata} />
          <JobCard info={info} jobdata={jobdata} /> */}
          <DrawerComponent list={list} />
        </div>
      ) : (
        ""
      )}
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

  const cookies = ctx.req.cookies;

  let userId = cookies.userId;

  let token = cookies.token;

  let employerId = cookies.employerId;

  // let job = await API({
  //   url: allApi.job,
  //   params: {
  //     userId: userId,
  //   },
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //     "Cache-Control": "no-cache",
  //     Connection: "keep-alive",
  //   },
  // });

  // let jobdata = await job.data;

  let jobs = await API({
    url: allApi.job,
    params: {
      employer: employerId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  let jobdata = await jobs.data;

  jobdata = [...jobdata].reverse();

  let trades = jobdata.map((item) => item.trade.masterName);

  let show = false;

  if (cookies.userId) {
    show = true;
  }

  if (!cookies.userId) {
    show = false;
  }

  return {
    props: {
      list: list,
      info: info,
      cookies: cookies,
      show: show,
      trades: trades,
      jobdata: jobdata,
    },
  };
}

export default Dashboard;
