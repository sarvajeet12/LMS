import React from "react";
import { instructorAssets } from "../../../data/image-data";

import { Link } from "react-router-dom";
import { iconAssets } from "../../../data/image-data";

const BecomeInstructor = () => {
  const instructorPara = `If you're passionate about teaching and want to share your expertise with others, join us as an instructor! We're looking for enthusiastic.`;

  const expandYourReachPara = `Many of these business ideas are home-based. While they may not make you a billionaire.`;

  const earnMoneyPara = `We provide instructors with tools and resources to create high quality courses that meet the needs of our learners.`;

  return (
    <div className="py-30">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 px-4 sm:px-6 lg:px-8 ">
        {/* right box */}
        <div>
          {/* heading and subheading*/}
          <p className=" text-secondary-dark">Become an instructor</p>
          <h1 className="text-3xl font-bold">Join as an instructor</h1>
          <p className="text-base w-full lg:max-w-[80%] my-10 text-secondary-dark">
            {instructorPara}
          </p>
          <div className="flex flex-col gap-4 mt-2 mb-15">
            <h3 className="font-bold text-base">Expand your reach</h3>
            <p className="text-secondary-dark text-sm font-medium">
              {expandYourReachPara}
            </p>
            <h3 className="font-bold text-base">
              Earn money from your courses
            </h3>
            <p className="text-secondary-dark text-sm font-medium">
              {earnMoneyPara}
            </p>
          </div>
          <Link to={"/login"} className="">
            <button className="btn">Start Teaching now &rarr;</button>
          </Link>
        </div>

        {/* left box */}
        {/* images */}
        <div className="relative">
          <img
            src={instructorAssets.instructorImage2}
            className="md:h-96 md:w-full w-full h-auto"
            alt=""
          />
          <div className="h-15 sm:h-20 border bg-white border-gray-100 shadow-sm absolute bottom-5 sm:bottom-40 right-[40%] sm:right-[20%]  gap-4 flex justify-between items-center p-2">
            <img
              src={iconAssets.growIcon}
              className="size-10 sm:size-15"
              alt=""
            />
            <span>
              <p className="text-base sm:text-3xl font-medium">Grow</p>
              <p className="text-xs sm:text-base font-medium">Community</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;
