import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import React from "react";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Navigation />
      <section className="hero">
        <div className="hero__image">&nbsp;</div>
      </section>
    </>
  );
}
