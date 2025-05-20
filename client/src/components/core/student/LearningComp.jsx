import React from "react";
import { Link } from "react-router-dom";

const LearningComp = (
  courseId,
  title,
  image,
  firstName,
  lastName,
  category,
  level
) => {
  // console.log("course data",title);

  return (
    <div className="border-1 border-gray-300 rounded-lg p-4 flex flex-col hover:shadow-lg transition duration-300 ease-in-out text-sm">
      <img src={image} alt="" className="border-1 h-50" />
      <p className="text-lg font-bold mt-4">{title}</p>
      <p className="">
        Instructor: {firstName} {lastName}
      </p>
      <span className="flex justify-between items-center mt-2">
        <p className="bg-primary py-1 px-3 text-xs text-white rounded-2xl">
          {category}
        </p>
        <p className="bg-primary py-1 px-3 text-xs text-white rounded-2xl">
          {level}
        </p>
      </span>
      <hr className="my-4" />
      <Link to={`/review/${courseId}`}>
        <p className="bg-secondary py-1 px-3 font-medium text-white w-20 flex justify-center items-center h-10">
          Give Review
        </p>
      </Link>
    </div>
  );
};

export default LearningComp;
