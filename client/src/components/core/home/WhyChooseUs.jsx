import React from "react";
import { whyChooseUsAssets } from "../../../data/image-data";

import { GrUserExpert } from "react-icons/gr";
import { IoPricetagOutline } from "react-icons/io5";
import { SiFuturelearn } from "react-icons/si";
import { PiGraduationCapLight } from "react-icons/pi";
import WhyChooseComp from "./WhyChooseComp";

const WhyChooseUs = () => {
  const whyChooseUsPara = `EduVista offers expert-led courses, flexible learning, personalized guidance, and proven strategies for global test preparation, ensuring academic success`;

  // Expert Instructor
  const nameExpertInstructor = `Expert Instructor`;
  const expertInstructor = `Learn from seasoned professionals dedicated to your academic success.`;
  const expertInstructorIcon = <GrUserExpert />;

  //   Affordable Price
  const namePrice = `Affordable Price`;
  const price = `Quality education at budget-friendly rates—knowledge should be accessible to all.`;
  const priceIcon = <IoPricetagOutline />;

  //   Flexible Learning
  const nameFlexibleLearning = `Flexible Learning`;
  const flexibleLearning = `Study anytime, anywhere, at your own pace—learning tailored for you.`;
  const flexibleLearningIcon = <SiFuturelearn />;

  //   Success
  const nameSuccess = `Success Proven`;
  const success = `Thousands have achieved their goals—your success story starts here!`;
  const successIcon = <PiGraduationCapLight />;

  return (
    <div className="pt-30">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 px-4 sm:px-6 lg:px-8 ">
        {/* right box */}
        <div>
          {/* heading and subheading*/}
          <p className=" text-secondary-dark">Why Choose Us</p>
          <h1 className="text-3xl font-bold">
            Discover Why EduVista Is the Right Choice
          </h1>
          <p className="text-base w-full lg:max-w-[80%] my-10 text-secondary-dark">
            {whyChooseUsPara}
          </p>
          <div className="flex flex-col gap-y-5">
            <WhyChooseComp
              icon={expertInstructorIcon}
              message={expertInstructor}
              name={nameExpertInstructor}
            />
            <WhyChooseComp icon={priceIcon} message={price} name={namePrice} />
            <WhyChooseComp
              icon={flexibleLearningIcon}
              message={flexibleLearning}
              name={nameFlexibleLearning}
            />
            <WhyChooseComp
              icon={successIcon}
              message={success}
              name={nameSuccess}
            />
          </div>
        </div>

        {/* left box */}
        {/* images */}
        <div>
          <img
            src={whyChooseUsAssets.whyChooseUs}
            className="md:h-96 md:w-full w-full h-auto"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
