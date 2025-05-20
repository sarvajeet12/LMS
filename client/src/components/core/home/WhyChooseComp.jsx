import React from "react";

const WhyChooseComp = ({ icon, message, name }) => {
  return (
    <div className="flex gap-x-2">
      <span className="flex justify-center items-center text-xl text-white border-1 h-10 w-10 rounded-full bg-primary">
        {icon}
      </span>{" "}
      <div className="flex flex-col">
        <span className="font-medium text-xl">{name}</span>
        <span className="text-sm text-secondary-dark">{message}</span>
      </div>
    </div>
  );
};

export default WhyChooseComp;
