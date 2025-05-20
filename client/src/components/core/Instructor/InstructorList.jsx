import React from "react";
import { instructorData } from "../../../data/instructors-data";
import { Link } from "react-router-dom";
import { InstructorSkeleton } from "../../common/Loading/Skeleton";
import { useGetAllInstructorsQuery } from "../../../features/apis/authApi";

const InstructorList = ({ searchTerm }) => {
  const loading = false; // Simulating loading state

  const { data: instructorData, isLoading: instructorLoading } =
    useGetAllInstructorsQuery();

  // Filtering instructors based on user input
  const filteredInstructors = instructorData?.response?.filter((instructor) =>
    instructor?.additionalDetails?.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  // console.log("instructorData", filteredInstructors);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {filteredInstructors?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 xl:gap-40">
            {instructorLoading ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <InstructorSkeleton />
                ))}
              </>
            ) : (
              <>
                {filteredInstructors.map((instructor, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center    bg-instructor-bg text-white p-5 rounded-md border-1 border-white"
                  >
                    <img
                      src={instructor?.photoUrl}
                      alt={instructor?.photoUrl}
                      className="w-50 md:w-full h-75 aspect-auto mb-4"
                    />
                    <h3 className="text-xl font-bold">
                      {instructor?.additionalDetails?.firstName}{" "}
                      {instructor?.additionalDetails?.lastName}
                    </h3>
                    <p className="text-base text-white font-medium my-1">
                      Profession : {instructor?.additionalDetails.profession}
                    </p>
                    <p className="text-base text-white font-medium my-1">
                      Experience {instructor?.additionalDetails.experience}
                    </p>
                    <Link
                      to={`/instructor-details/${instructor._id}`}
                      className="mt-2"
                    >
                      <button
                        type="button"
                        className="border-1  border-slate-300 px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                      >
                        Explore
                      </button>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      ) : (
        <h2 className="text-center">No Instructor Found!</h2>
      )}
    </div>
  );
};

export default InstructorList;
