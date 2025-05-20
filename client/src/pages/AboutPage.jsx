import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Header from "../components/core/about/Header";
import Vision from "../components/core/about/Vision";
import Community from "../components/core/home/Community";
import Accordion from "../components/core/about/Accordion";
import LearnMsg from "../components/core/about/LearnMsg";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      {/* Header */}
      <Header />

      {/* Learn Grow Succeed */}
      <Vision />

      {/* Community */}
      <Community />

      {/* Accordion */}
      <Accordion />

      {/* Learn Msg */}
      <LearnMsg />

      <Footer />
    </>
  );
};

export default AboutPage;
