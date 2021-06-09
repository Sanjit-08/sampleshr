import React from "react";
import Head from "next/head";
import loadable from "@loadable/component";
const Navigation = loadable(() => import("../components/Navigation"));

const About = (props) => {
  const { show } = props;
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
        <meta name="twitter:card" content="app" />
        <meta name="twitter:site" content="@https://shramin.vercel.app/" />
        <meta
          name="twitter:description"
          content="Jobs for Blue collar workers.Employment opportunities for blue collar workers.Jobs for machine repair,AC repair,phone repair.Machine operator jobs."
        />
        <meta name="twitter:app:name:googleplay" content="ShramIn" />
        <meta
          name="twitter:app:url:googleplay"
          content="https://shramin.vercel.app/"
        />
        <meta name="twitter:app:id:googleplay" content="" />
        <meta name="twitter:app:name:ipad" content="ShramIn" />
        <meta
          name="twitter:app:url:ipad"
          content="https://shramin.vercel.app/"
        />
        <meta name="twitter:app:id:ipad" content="" />
        <meta name="twitter:app:name:iphone" content="ShramIn" />
        <meta
          name="twitter:app:url:iphone"
          content="https://shramin.vercel.app/"
        />
        <meta name="twitter:app:id:iphone" content=""></meta>
      </Head>
      <Navigation show={show} />
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

export async function getServerSideProps(ctx) {
  const cookies = ctx.req.cookies;

  const userId = cookies.userId;
  let show = true;

  if (userId) {
    show = true;
  }

  if (!userId) {
    show = false;
  }

  return {
    props: {
      show: show,
    },
  };
}

export default About;
