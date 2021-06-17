import React from "react";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import DrawerComponent from "../../components/DrawerComponent";
import StatusBar from "../../components/StatusBar";
import CandidateCard from "../../components/CandidateCard";
import NotFound from "../../components/NotFound";
import { isMobile } from "react-device-detect";
import { allApi } from "../../config";
import API from "../../API";

const JobApplications = (props) => {
  console.log(props);
  const { list } = props;
  const { show } = props;
  const { id } = props;
  console.log("Job", id);
  // const { query } = props;
  // console.log(query);
  // const { appdata } = props;
  // console.log(appdata);
  const router = useRouter();
  const trade = router.query.trade;
  // const jobId = router.query.jobId;
  let valid =
    trade === "Mason" ||
    trade === "Plumber" ||
    trade === "Electrician" ||
    trade === "Painter"
      ? true
      : false;
  console.log(router);

  // let tradevalue = trade.charAt(0).toUpperCase() + trade.slice(1);

  return (
    <>
      {valid ? (
        <div>
          <Navigation show={show} />
          {show ? (
            <div>
              <div className="candidateapplication">
                Job Applications for {trade}
              </div>
              {!isMobile ? <DrawerComponent list={list} /> : ""}

              <StatusBar />
              <div className="candidatebox" style={{ display: "flex" }}>
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
                <CandidateCard />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export async function getServerSideProps(ctx) {
  const list = ["Dashboard", "Candidates Profile", "Candidates Status", "Jobs"];

  const cookies = ctx.req.cookies;

  const token = cookies.token;

  const jobId = ctx.query.jobId;
  let show = false;

  let userId = cookies.userId;

  let applications = await API({
    url: allApi.jobApplications,
    params: {
      job: jobId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Accept: "application/json",
    },
  });

  let appdata = await applications.data;

  // let data = Object.entries(appdata).map((e) => ({ [e[0]]: e[1] }));

  if (cookies.userId) {
    show = true;
  }

  if (!cookies.userId) {
    show = false;
  }

  return {
    props: {
      list: list,
      show: show,
      // query: query,
      appdata: appdata,
      id: jobId,
      // data: data,
    },
  };
}

export default JobApplications;
