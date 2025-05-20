import React from "react";
import { Link } from "react-router-dom";

const HelperComp = ({ heading, para }) => {
  return (
    <div
      className="border-1 border-r-secondary-dark border-b-secondary-dark border-l-secondary-dark py-6 px-4 border-t-secondary border-t-4
        hover:bg-blue-50 hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <p className="font-medium text-xl">{heading}</p>
      <p className="text-sm text-secondary-dark font-medium my-4">{para}</p>
      <Link to={"/about"} className="text-primary text-xs font-medium">
        More about this
      </Link>
    </div>
  );
};

export default HelperComp;
