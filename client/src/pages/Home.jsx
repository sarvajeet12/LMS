import React from "react";

import Hero from "../components/core/home/Hero";
import Helper from "../components/core/home/Helper";
import Popular from "../components/core/home/Popular";
import About from "../components/core/home/About";
import Community from "../components/core/home/Community";
import Instructors from "../components/core/home/Instructors";
import Reviews from "../components/core/home/Reviews";
import BecomeInstructor from "../components/core/home/BecomeInstructor";
import Blogs from "../components/core/home/Blogs";
import RightCourse from "../components/core/home/RightCourse";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import WhyChooseUs from "../components/core/home/WhyChooseUs";
import HowItWorks from "../components/core/home/HowItWorks";
import ParallaxEffect from "../components/core/home/ParallaxEffect";


const Home = () => {
  return (
    <>
      

      {/* navbar */}
      <Navbar />

      {/* hers section */}
      <main className="mt-32">
        <Hero />
        <Helper />
      </main>

      <section>
        {/* popular section */}
        <Popular />

        {/* about */}
        <About />

        {/* Instructors */}
        <Instructors />

        {/* Community */}
        <Community />

        {/* How it work */}
        <HowItWorks />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Reviews */}
        <Reviews />

        {/* Become an instructor */}
        <BecomeInstructor />

        {/* Parallax Effect */}
        <ParallaxEffect />

        {/* Blogs */}
        <Blogs />

        {/* Right course */}
        <RightCourse />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
