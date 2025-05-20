import React from "react";
import HowItWorkComp from "./HowItWorkComp";
import { IoPerson } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const HowItWorks = () => {
  // Sign up
  const signUPCount = `01`;
  const signUPIcon = <IoPerson />;
  const signUPHeading = `Sign up`;
  const signUpPara = `Create an account in minutes by providing your details and accessing the student dashboard.`;

  // Select a course
  const selectCourseCount = `02`;
  const selectCourseIcon = <FaLocationArrow />;
  const selectCourseHeading = `Select a Course`;
  const selectCoursePara = `Browse our wide range of courses, choose your preferred subject, and enroll instantly.`;

  // Start learning
  const startLearningCount = `03`;
  const startLearningIcon = <FaCheck />;
  const startLearningHeading = `Start Learning`;
  const startLearningPara = `Access course materials, join interactive lessons, and complete assignments at your own pace.`;

  return (
    <div className=" bg-gray-100 py-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className=" text-secondary-dark">How it works</p>
        <h2 className="text-3xl font-bold">Experience Interactive Learning</h2>
        <p className="text-xl">
          Discover a wide range of expert-led courses tailored to your personal
          and professional growth.
        </p>

        {/* Flow */}
        <div className="mt-15 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-10 lg:gap-x-20">
          <HowItWorkComp
            count={signUPCount}
            icon={signUPIcon}
            heading={signUPHeading}
            para={signUpPara}
          />
          <HowItWorkComp
            count={selectCourseCount}
            icon={selectCourseIcon}
            heading={selectCourseHeading}
            para={selectCoursePara}
          />
          <HowItWorkComp
            count={startLearningCount}
            icon={startLearningIcon}
            heading={startLearningHeading}
            para={startLearningPara}
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
