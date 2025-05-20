import React from "react";
import CourseTable from "../components/core/Instructor/CourseTable";
import { Link, useParams } from "react-router-dom";
import InstructorMobileNav from "../components/common/InstructorMobileNav";

const Courses = () => {
  const { instructorId } = useParams();
  return (
    <div className="w-full border-1 border-red-700 px-3 sm:px-10 py-5">
      <div className="block md:hidden">
        <InstructorMobileNav />{" "}
      </div>

      <hr className="block md:hidden bg-slate-300 h-[.1px] border-0 my-2" />

      {/* Button : create course */}
      <div className="mt-5">
        <Link to={`/instructor/${instructorId}/course/create`}>
          <button className="btn">Create Course</button>
        </Link>
      </div>

      {/* Table  */}
      <CourseTable />
    </div>
  );
};

export default Courses;
