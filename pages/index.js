import React, { lazy } from "react";
import loadable from "@loadable/component";
import Head from "next/head";
import Image from "next/image";
const Navigation = loadable(() => import("../components/Navigation"));

export default function Home(props) {
  const { show } = props;
  return (
    <>
      <Head>
        <title>ShramIn</title>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Employment for Blue Collar workers" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Navigation />
      <section className="hero">
        <img className="hero__image"></img>
      </section>
    </>
  );
}

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
