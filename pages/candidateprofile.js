import React from "react";
import DrawerComponent from "../components/DrawerComponent";
import Navigation from "../components/Navigation";

const CandidateProfile = (props) => {
  const { list } = props;

  return (
    <>
      <Navigation />
      <DrawerComponent list={list} />
    </>
  );
};

export async function getServerSideProps() {
  const list = ["Dashboard", "Candidates Profile", "Candidates Status", "Jobs"];

  return {
    props: {
      list: list,
    },
  };
}

export default CandidateProfile;
