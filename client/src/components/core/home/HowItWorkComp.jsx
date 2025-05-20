import React from "react";

const HowItWorkComp = ({ count, icon, heading, para }) => {
  return (
    <div className="border-1 border-dashed border-slate-500 rounded-3xl p-8 text-left shadow-lg bg-white">
      <div className="flex justify-between items-center">
        <h1>{count}</h1>
        <span className="size-15 rounded-xl flex justify-center items-center bg-primary text-white text-2xl">
          {icon}
        </span>
      </div>
      <h2 className="my-5">{heading}</h2>
      <p className="text-base text-secondary-dark">{para}</p>
    </div>
  );
};

export default HowItWorkComp;
