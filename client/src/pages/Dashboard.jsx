import React from "react";
import InstructorMobileNav from "../components/common/InstructorMobileNav";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetCourseByInstructorIdQuery } from "../features/apis/purchaseApi";
import { DashboardSkeleton } from "../components/common/Loading/Skeleton";

const Dashboard = () => {
  const {
    data: purchaseCourseData,
    isLoading: purchaseCourseLoading,
    isError: purchaseCourseError,
  } = useGetCourseByInstructorIdQuery();

  if (purchaseCourseLoading)
    return <h2 className="text-center text-primary">Loading...</h2>;
  if (purchaseCourseError)
    return <h2 className="text-red-400">Failed to get purchased course</h2>;

  const { response } = purchaseCourseData || [];

  const courseData = response?.map((course) => ({
    price: course.courseId.coursePrice,
    name: course.courseId.courseTitle,
  }));

  // Total Revenue
  const totalRevenue = response?.reduce(
    (acc, element) => acc + (element.courseId.coursePrice || 0),
    0
  );

  // Total Sales
  const totalSales = response?.length || 0;

  return (
    <div className="w-full border-1 border-red-700 px-3 sm:px-10 py-5">
      {/* Instructor mobile nav */}
      <div className="block md:hidden">
        <InstructorMobileNav />{" "}
      </div>

      <hr className="block md:hidden bg-slate-300 h-[.1px] border-0 my-2" />

      {purchaseCourseLoading ? (
        <>
          <div className="">
            {Array.from({ length: 1 }).map((_, index) => (
              <DashboardSkeleton />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* ---------------------------------- Total Sales and total revenue -------------------------------------- */}

          <div className="flex gap-x-15 mt-10 md:mt-0">
            {/* Total sales */}
            <div className="border-1 border-slate-300 shadow-lg rounded-lg p-5 w-50">
              <h3 className="font-medium text-xl">Total Sales</h3>
              <h2 className="text-primary">{totalSales}</h2>
            </div>

            {/* Total revenue */}
            <div className="border-1 border-slate-300 shadow-lg rounded-lg p-5 w-50">
              <h3 className="font-medium text-xl">Total Revenue</h3>
              <h2 className="text-primary">{totalRevenue}</h2>
            </div>
          </div>

          {/* --------------------------------------------- Graph ---------------------------------------------- */}
          <div className="mt-20 border-1 border-slate-300 rounded-lg p-10 w-full">
            <h3 className="font-medium text-xl mb-10">Course Prices</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7289"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4a90e2" // Change color to a different shade of blue
                  strokeWidth={3}
                  dot={{ stoke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
