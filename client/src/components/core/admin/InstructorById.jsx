import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetCourseByInstructorIdByParamsQuery } from "../../../features/apis/purchaseApi";
import { DashboardSkeleton } from "../../common/Loading/Skeleton";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useGetInstructorByIdQuery } from "../../../features/apis/authApi";

const InstructorById = () => {
  const { instructorId } = useParams();
  const {
    data: instructorCourseDetails,
    isLoading: instructorLoading,
    isError: instructorError,
  } = useGetCourseByInstructorIdByParamsQuery(instructorId);
  // console.log("admin instructor details", instructorCourseDetails);

  const { data: instructorDetails } = useGetInstructorByIdQuery(instructorId);
  // console.log("instructor details", instructorDetails);

  //   if (!instructorError)
  //     return <h2 className="text-red-400 text-center">Failed to get instructor details</h2>;

  const { response } = instructorCourseDetails || [];

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
    <div className="xl:w-5xl mx-auto   px-3 sm:px-10 py-10">
      {instructorLoading ? (
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

          <div className="flex flex-row gap-x-5">
            <Link
              to={`/admin/dashboard`}
              className="size-8 sm:size-10 border-2 border-slate-200 flex justify-center items-center rounded-full "
            >
              <IoMdArrowBack className="text-base sm:text-xl" />{" "}
            </Link>
            <h2 className="text-primary text-3xl md:text-4xl">
              INSTRUCTOR DETAILS :
            </h2>
          </div>

          <h3 className="text-2xl font-medium mt-5">
            Instructor:{" "}
            {instructorDetails?.response[0]?.additionalDetails?.firstName}{" "}
            {instructorDetails?.response[0]?.additionalDetails?.lastName}
          </h3>

          <div className="flex gap-x-15 mt-10">
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

export default InstructorById;
