import React from "react";
import Head from "next/head";
import loadable from "@loadable/component";
const Navigation = loadable(() => import("../components/Navigation"));

const About = () => {
  return (
    <>
      <Head>
        <title>About | ShramIn</title>
        <meta http-equiv="X-UA-Compatible" content="IE=EDGE"></meta>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Jobs for Blue collar workers.Employment opportunities for blue collar workers.Jobs for machine repair,AC repair,phone repair.Machine operator jobs."
        />
        <meta property="og:site_name" content="ShramIn"></meta>
        <meta property="og:title" content="About | ShramIn" />
        <meta
          property="og:description"
          content="Jobs for Blue collar workers.Employment opportunities for blue collar workers.Jobs for machine repair,AC repair,phone repair.Machine operator jobs."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://shramin.vercel.app/about"
        ></meta>
      </Head>
      <Navigation />
      <h2
        style={{
          marginTop: "200px",
          textAlign: "center",
        }}
      >
        About
      </h2>
    </>
  );
};

export default About;
