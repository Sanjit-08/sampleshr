import React from "react";
import Head from "next/head";
import loadable from "@loadable/component";
const Navigation = loadable(() => import("../components/Navigation"));

const Features = (props) => {
  const { show } = props;
  return (
    <>
      <Head>
        <title>Features | ShramIn</title>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Hiring blue collar workers.Search jobs for blue collar workers.Hiring of frontline workers.Hiring for construction sites,Blue collar hiring in small towns."
        />
        <meta property="og:site_name" content="ShramIn"></meta>
        <meta property="og:title" content="Features | ShramIn" />
        <meta
          property="og:description"
          content="Hiring blue collar workers.Search jobs for blue collar workers.Hiring of frontline workers.Hiring for construction sites,Blue collar hiring in small towns."
        ></meta>
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:url"
          content="https://shramin.vercel.app/features"
        ></meta>
      </Head>
      <Navigation show={show} />
      <h2
        style={{
          marginTop: "200px",
          textAlign: "center",
        }}
      >
        Features
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

export default Features;
