import React from "react";
import { Link } from "react-router-dom";
import { useGetAllInstructorsQuery } from "../../../features/apis/purchaseApi";
import { LectureListSkeleton } from "../../common/Loading/Skeleton";

const InstructorList = () => {
  // Get All Instructor  [Length]
  const {
    data: allRegisterInstructor,
    isLoading: allRegisterInstructorLoading,
  } = useGetAllInstructorsQuery();
  // console.log("all instructor ", allRegisterInstructor);

  return (
    <div className="my-20">
      <h2 className="text-primary text-2xl md:text-4xl">INSTRUCTOR</h2>

      {allRegisterInstructorLoading ? (
        <div className="my-32  px-4 sm:px-6 lg:px-8">
          {Array.from({ length: 1 }).map((_, index) => (
            <LectureListSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <table className="table-auto border-collapse border border-gray-400 w-full mt-5">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">S.No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allRegisterInstructor?.response?.map((inst, index) => (
                <tr key={inst.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {inst?.additionalDetails?.firstName}{" "}
                    {inst?.additionalDetails?.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <Link
                      to={`/admin/dashboard/instructor/${inst?._id}`}
                      className="text-blue-500 underline-0 font-bold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InstructorList;
