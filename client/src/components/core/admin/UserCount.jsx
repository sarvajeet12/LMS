import React from "react";
import {
  useGetAllInstructorsQuery,
  useGetAllPurchasedCoursesQuery,
} from "../../../features/apis/purchaseApi";
import { AdminDashboardCountSkeleton } from "../../common/Loading/Skeleton";

const UserCount = () => {
  // Get All Instructor  [Length]
  const {
    data: allRegisterInstructor,
    isLoading: allRegisterInstructorLoading,
  } = useGetAllInstructorsQuery();
  // console.log("all instructor ", allRegisterInstructor);

  // Get All Student [Length]
  const { data: allRegisterStudent, isLoading: allRegisterStudentLoading } =
    useGetAllPurchasedCoursesQuery();
  // console.log("all student ", allRegisterStudent);

  // Total Revenue
  const totalRevenue = allRegisterStudent?.response?.reduce(
    (acc, element) => acc + (element.courseId.coursePrice || 0),
    0
  );

  return (
    <>
      {allRegisterStudentLoading ? (
        <>
          <div className="">
            {Array.from({ length: 1 }).map((_, index) => (
              <AdminDashboardCountSkeleton />
            ))}
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="py-5 mt-15 flex flex-col gap-y-5 gap-x-10 sm:flex-row justify-between">
            {/* Register Instructor */}
            <div className="p-5 border-1 border-slate-600 border-l-5">
              <h3 className="font-medium text-xl">Total Register Instructor</h3>
              <h2 className="text-primary">
                {allRegisterInstructor?.response?.length}
              </h2>
            </div>

            {/* Register Student  */}
            <div className="p-5 border-1 border-slate-600 border-l-5">
              <h3 className="font-medium text-xl">Total Register Student</h3>
              <h2 className="text-primary">
                {allRegisterStudent?.response?.length}
              </h2>
            </div>

            {/* Total Revenue */}
            <div className="p-5 border-1 border-slate-600 border-l-5">
              <h3 className="font-medium text-xl">Total Revenue</h3>
              <h2 className="text-primary">₹{totalRevenue}</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserCount;
