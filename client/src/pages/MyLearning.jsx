import React, { useEffect } from "react";
import { popularCourse } from "../data/popular-courses";
import PopularComp from "../components/core/home/PopularComp";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import { Skeleton } from "../components/common/Loading/Skeleton";
import { useFetchCoursesQuery } from "../features/apis/courseApi";
import { Link } from "react-router-dom";
import { useGetEnrolledCoursesQuery } from "../features/apis/authApi";
import LearningComp from "../components/core/student/LearningComp";

const MyLearning = () => {
  // Getting courses of creator
  const { data: fetchCourseData, isLoading: fetchCourseLoading } =
    useFetchCoursesQuery();
  // console.log("fetchCourseData", fetchCourseData);

  // Getting courses of student
  const {
    data: enrolledCourseData,
    isLoading: enrolledCourseLoading,
    refetch,
  } = useGetEnrolledCoursesQuery();
  // console.log("enrolledCourseData", enrolledCourseData);

  const user = useSelector((state) => state.auth.user);

  // Refetch on login
  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto xl:w-5xl">
          <h3 className="text-3xl font-bold">
            {user?.role === "instructor"
              ? "Created course"
              : user?.role === "student" && "My learning"}
          </h3>

          {/* ----------------------------------- Course Created And Purchase Course -------------------------------------- */}
          <div className="mt-10">
            {user?.role === "instructor" ? (
              // Created Course
              <>
                {fetchCourseLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <Skeleton key={index} />
                    ))}
                  </div>
                ) : (
                  <>
                    {fetchCourseData?.response?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20 mt-10">
                        {fetchCourseData?.response.map((course) => (
                          <div className="border-1 border-gray-300 rounded-lg p-4 flex flex-col hover:shadow-lg transition duration-300 ease-in-out text-sm">
                            <img
                              src={course?.courseThumbnail}
                              alt={
                                !course?.courseThumbnail && "Course Thumbnail"
                              }
                              className="border-1 h-50"
                            />
                            <p className="text-lg font-bold mt-4">
                              Course Title : {course?.courseTitle}
                            </p>
                            <span className="font-medium text-base my-5">
                              Status:{" "}
                              <span
                                className={`${
                                  course?.isPublished
                                    ? "bg-green-400 px-2 py-1 rounded-sm text-xs sm:text-sm text-white"
                                    : "bg-secondary text-white px-2 py-1 rounded-sm  text-xs sm:text-sm"
                                } inline-block w-20 text-center`}
                              >
                                {" "}
                                {course.isPublished ? "Published" : "Draft"}
                              </span>
                            </span>
                            <Link to={`/instructor/${user._id}/course`}>
                              <button type="button" className="btn">
                                View Page Course
                              </button>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-10 mt-20">
                        <h3 className="text-2xl font-medium text-center">
                          No Course Created Yet!
                        </h3>
                        <Link to="/instructor/create-course" className="btn">
                          Create Course
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              user?.role === "student" && (
                // Purchased Course
                <>
                  {enrolledCourseLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton />
                      ))}
                    </div>
                  ) : (
                    <>
                      {enrolledCourseData &&
                      enrolledCourseData?.response?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20 mt-10">
                          {enrolledCourseData?.response?.map((course) => (
                            <div className="border-1 border-gray-300 rounded-lg p-4 flex flex-col hover:shadow-lg transition duration-300 ease-in-out text-sm">
                              <img
                                src={course?.courseThumbnail}
                                alt=""
                                className="border-1 h-50"
                              />
                              <p className="text-lg font-bold mt-4">
                                {course?.courseTitle}
                              </p>
                              <p className="">
                                Instructor:{" "}
                                {course?.creator?.additionalDetails?.firstName}{" "}
                                {course?.creator?.additionalDetails?.lastName}
                              </p>
                              <span className="flex justify-between items-center mt-2">
                                <p className="bg-primary py-1 px-3 text-xs text-white rounded-2xl">
                                  {course?.category}
                                </p>
                                <p className="bg-primary py-1 px-3 text-xs text-white rounded-2xl">
                                  {course?.courseLevel}
                                </p>
                              </span>
                              <hr className="my-4" />
                              <div className="flex justify-between items-center">
                                <Link to={`/course-details/${course?._id}`}>
                                  <button className="border-1 border-slate-300 px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-all hover:shadow-lg">
                                    Watch
                                  </button>
                                </Link>
                                <Link to={`/review/${course?._id}`}>
                                  <button className="bg-secondary btn">
                                    Give Review
                                  </button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-10 mt-20">
                          <h3 className="text-2xl font-medium text-center">
                            No Course Buy Yet!
                          </h3>
                          <Link to={"/courses-list"}>
                            <button className="btn">Explore Course</button>
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyLearning;
