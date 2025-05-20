import React, { useState } from "react";
import CountUp from "react-countup";

const Community = () => {
  const communityData = [
    {
      id: 1,
      start: 0,
      quantity: "100",
      suffix: "+",
      description:
        "Learners available in this platform and more are counting daily.",
    },
    {
      id: 2,
      start: 0,
      quantity: "87",
      suffix: "%",
      description:
        "Our students have the highest success rate in getting hired.",
    },
    {
      id: 3,
      start: 200,
      quantity: "364",
      suffix: "+",
      description: "High-quality teachers offering courses and videos.",
    },
  ];

  return (
    <div className="bg-primary text-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h1 className="text-center text-4xl md:text-5xl">
          Building a lifelong learning community
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-10 sm:mt-20">
          {communityData.map((data) => (
            <div
              key={data.id}
              className={`border-0 text-center md:px-10 md:text-start sm:px-5 sm:text-start lg:text-start lg:px-20 py-10 ${
                data.id === 1
                  ? "border-0"
                  : "border-t-1 sm:border-t-0 sm:border-l-1 border-white"
              }`}
            >
              <h1 className="text-3xl font-bold">
                <CountUp
                  start={data.start}
                  end={data.quantity}
                  duration={2.75}
                ></CountUp>

                {data.suffix}
              </h1>
              <p className=" text-white mt-2 text-base">{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
