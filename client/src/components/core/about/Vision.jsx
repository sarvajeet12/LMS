import React from "react";
import { iconAssets, instructorAssets } from "../../../data/image-data";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Vision = () => {
  const aboutPara = `Our platform was established with the vision to make quality education accessible to everyone, anywhere. Since our inception, we’ve grown into a hub of knowledge, offering courses across diverse fields to foster lifelong learning.`;

  return (
    <div
      className=" bg-gray-100 py-20
        "
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-4 sm:px-6 lg:px-8 ">
        {/* left box */}
        <div className="relative">
          <img
            src={instructorAssets.meetingImage}
            className="md:h-96 md:w-full w-full h-auto"
            alt=""
          />
          <div className="border-0 bg-white shadow-sm absolute top-5 right-5  px-5 py-2 rounded-xl">
            <p className="text-xs sm:text-base font-medium">
              Design, Coding, Business
            </p>
          </div>
        </div>

        {/* right box */}
        <div>
          {/* heading and subheading*/}
          <span className=" text-white bg-secondary px-4 py-1 rounded-3xl text-sm font-medium">
            Learn. Grow. Succeed
          </span>
          <h2 className="text-3xl font-bold mt-2">
            Empowering Minds, Shaping Futures
          </h2>
          <p className="text-base w-full lg:max-w-[80%] my-10 text-secondary-dark">
            {aboutPara}
          </p>
          <div className="flex flex-wrap gap-4 mt-2 mb-15">
            <div className="space-y-4">
              <p className="flex items-center gap-4">
                <span>
                  <IoMdCheckmarkCircleOutline className="text-primary text-2xl" />
                </span>{" "}
                <span className="text-secondary-dark font-medium">
                  Personalized learning experience
                </span>
              </p>
              <p className="flex items-center gap-4">
                <span>
                  <IoMdCheckmarkCircleOutline className="text-primary text-2xl" />
                </span>{" "}
                <span className="text-secondary-dark font-medium">
                  Access to a wide range of resources
                </span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="flex items-center gap-4">
                <span>
                  <IoMdCheckmarkCircleOutline className="text-primary text-2xl" />
                </span>{" "}
                <span className="text-secondary-dark font-medium">
                  Flexibility and convenience
                </span>
              </p>
              <p className="flex items-center gap-4">
                <span>
                  <IoMdCheckmarkCircleOutline className="text-primary text-2xl" />
                </span>{" "}
                <span className="text-secondary-dark font-medium">
                  Made by Professionals
                </span>
              </p>
            </div>
          </div>
          <Link to={"/courses-list"} className="">
            <button className="btn">Explore Course &rarr;</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vision;
