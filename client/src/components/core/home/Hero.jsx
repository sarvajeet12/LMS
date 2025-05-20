import React from "react";
import { Link } from "react-router-dom";
import { heroAssets } from "../../../data/image-data";
import { iconAssets } from "../../../data/image-data";
import { FaStarHalfAlt } from "react-icons/fa";

const Hero = () => {
  const heroHeading = `Education that prepare you for what's next.`;

  const heroPara = `Start, switch, or advance courses, Professional Certificates, and degrees from world-class universities and companies. Learn on your own schedule with 100% online courses and on-demand video lectures.`;

  return (
    <div className="container relative mx-auto gap-5 md:gap-0 flex flex-col-reverse  md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
      {/* left side */}
      <div className="w-full md:w-1/2">
        <h1 className="max-w-2xl">{heroHeading}</h1>
        <p className="max-w-xl mt-6 mb-15 text-secondary-dark">{heroPara}</p>
        <Link to={"/courses-list"}>
          <button className="btn">Explore Course &rarr;</button>
        </Link>
      </div>

      {/* right side */}
      <div className="w-full md:w-1/2">
        {/* image */}
        <img
          src={heroAssets.hero}
          className="md:h-96 md:w-full w-full h-auto py-5 sm:p-0"
        />
      </div>

      {/* success rate image and data */}
      <div className="h-15 sm:h-20 border bg-white border-gray-100 shadow-sm absolute bottom-100 md:bottom-15 right-[40%] md:right-[20%]  gap-4 flex justify-between items-center p-2">
        <img src={iconAssets.heroIcon} className="size-10 sm:size-15" alt="" />
        <span>
          <p className="text-base sm:text-3xl font-medium">93%</p>
          <p className="font-medium text-xs sm:text-base">Success Rate</p>
        </span>
      </div>

      {/* start image */}
      <div className="bg-primary absolute right-10 sm:right-20 top-[10%] sm:top-[40%] w-13 sm:w-18 h-10 sm:h-15 flex justify-center items-center">
        <FaStarHalfAlt className="text-xl sm:text-2xl text-white" />
      </div>
    </div>
  );
};

export default Hero;
