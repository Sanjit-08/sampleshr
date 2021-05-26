import React, { lazy } from "react";
import loadable from "@loadable/component";
import Head from "next/head";
import Image from "next/image";
// import Navigation from "../components/Navigation";
const Navigation = loadable(() => import("../components/Navigation"));

export default function Home() {
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
