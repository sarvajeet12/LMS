import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useGetInstructorByIdQuery } from "../features/apis/authApi";

const InstructorDetails = () => {
  const { instructorId } = useParams();

  const { data: instructorDataById, isLoading: instructorLoading } =
    useGetInstructorByIdQuery(instructorId);

  const { additionalDetails } = instructorDataById?.response[0] || {};

  return (
    <>
      <Navbar />
      <div className="mx-auto xl:w-5xl my-30 sm:my-40 px-4 sm:px-6 lg:px-8">
        <div className="flex gap-x-2 items-center">
          <Link
            to={`/explore-instructors`}
            className="size-8 sm:size-10 border-2 border-slate-200 flex justify-center items-center rounded-full"
          >
            <IoMdArrowBack className="text-base sm:text-xl" />{" "}
          </Link>
          <h3 className="text-xl sm:text-3xl font-bold">Instructor Details</h3>
        </div>

        {/* -------------------------------- Instructor Details ------------------------------ */}
        <div className="border-1 border-dashed mt-15 py-10 px-5 sm:px-10">
          <div className="flex flex-col  md:flex-row gap-x-20 gap-y-10">
            <div className="bg-blue-400 w-55 h-60">
              <img
                src={instructorDataById?.response[0]?.photoUrl}
                className="w-full h-full"
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <p className="text-md md:text-base font-medium">
                Name: {additionalDetails?.firstName}{" "}
                {additionalDetails?.lastName}
              </p>
              <p className="text-md md:text-base font-medium">
                Profession: {additionalDetails?.profession}
              </p>
              <p className="text-md md:text-base font-medium">
                Experience: {additionalDetails?.experience}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold">About the Instructor</h3>
            <p className="text-md md:text-base mt-5">
              {additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstructorDetails;
