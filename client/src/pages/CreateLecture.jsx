import React from "react";
import InstructorMobileNav from "../components/common/InstructorMobileNav";
import CreateLectureForm from "../components/core/Instructor/CreateLectureForm";
import LecturesList from "../components/core/Instructor/LecturesList";

const CreateLecture = () => {
  return (
    <div className="w-full px-3 sm:px-10 py-5">
      <div className="block md:hidden">
        <InstructorMobileNav />
      </div>
      <hr className="block md:hidden bg-slate-300 h-[.1px] border-0 my-2" />

      {/* --------------------------------------------  Create lecture -------------------------------  */}
      {/* Heading and Links */}
      <div className="flex flex-col gap-y-1">
        <h3 className="font-bold text-2xl">
          Let's add lectures, add some basic details fo your new lecture
        </h3>
        <p>
          An insightful lecture exploring ideas, knowledge, and engaging
          discussions.
        </p>
      </div>

      {/* Create Lecture Form */}
      <CreateLectureForm />

      {/* Lectures List */}
      <LecturesList />
    </div>
  );
};

export default CreateLecture;
