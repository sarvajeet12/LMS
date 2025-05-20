import React from "react";
import { Link } from "react-router-dom";

const LearnMsg = () => {
  return (
    <div className="bg-gray-100 py-20 mt-15 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-y-5">
        <h1 className="text-4xl md:text-5xl mt-10">Ready to start learning?</h1>
        <p>
          Discover a wide range of expert-led courses tailored to your personal
          and professional growth.
        </p>
        <Link to={"/login"}>
          {" "}
          <span className="text-base bg-secondary px-5 sm:px-5 py-2 rounded-4xl w-50 hover:bg-amber-400">
            Learn Now
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LearnMsg;
