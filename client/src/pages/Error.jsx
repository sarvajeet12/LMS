import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Error = () => {
  return (
    <>
      <Navbar />
      <div className="my-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto xl:w-5xl flex flex-col items-center justify-center text-center gap-y-5">
          <h1 className="text-5xl  md:text-7xl lg:text-9xl  text-primary">
            Oops!
          </h1>
          <h2 className="text-3xl mt-10">404 - Page Not Found</h2>
          <p className="text-secondary-dark text-sm w-9/10 sm:max-w-2/4">
            The page you are looking for might have been removed had its name
            changed or is temporally unavailable.
          </p>
          <Link to="/">
            <button className="btn">GO TO HOMEPAGE</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Error;
