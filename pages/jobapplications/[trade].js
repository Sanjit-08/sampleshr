import React from "react";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import DrawerComponent from "../../components/DrawerComponent";
import StatusBar from "../../components/StatusBar";
import CandidateCard from "../../components/CandidateCard";
import NotFound from "../../components/NotFound";

const JobApplications = (props) => {
  const { list } = props;
  const { show } = props;
  const router = useRouter();
  const trade = router.query.trade;
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
              <DrawerComponent list={list} />

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

  let show = false;

  let userId = cookies.userId;

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
    },
  };
}

export default JobApplications;
