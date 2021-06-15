import React from "react";
import CandidateCard from "../components/CandidateCard";
import DrawerComponent from "../components/DrawerComponent";
import Navigation from "../components/Navigation";
import StatusBar from "../components/StatusBar";

const CandidateProfile = (props) => {
  const { list } = props;
  const { show } = props;
  return (
    <>
      <Navigation show={show} />
      {show ? (
        <div>
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

export default CandidateProfile;
