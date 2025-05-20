import React from "react";
import InstructorMobileNav from "../components/common/InstructorMobileNav";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import EditLectureForm from "../components/core/Instructor/EditLectureForm";

const EditLecture = () => {
  const { courseId, instructorId } = useParams();

  return (
    <div className="w-full px-3 sm:px-10 py-5">
      <div className="block md:hidden">
        <InstructorMobileNav />
      </div>
      <hr className="block md:hidden bg-slate-300 h-[.1px] border-0 my-2" />

      {/* --------------------------------------------  Edit lecture -------------------------------  */}
      {/* Heading and Links */}
      <div className="flex gap-x-2 items-center">
        <Link
          to={`/instructor/${instructorId}/course/${courseId}/lecture`}
          className="size-8 sm:size-10 border-2 border-slate-200 flex justify-center items-center rounded-full "
        >
          <IoMdArrowBack className="text-base sm:text-xl" />{" "}
        </Link>
        <h3 className="font-bold text-base sm:text-xl md:text-2xl">
          Update Your Lecture
        </h3>
      </div>

      {/* Edit Lecture Form */}
      <EditLectureForm />
    </div>
  );
};

export default EditLecture;
