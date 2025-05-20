import React from "react";
import { useGetRecommendedCoursesQuery } from "../features/apis/courseApi";
import PopularComp from "../components/core/home/PopularComp";

const RecommendCourse = ({ courseId }) => {
  const { data: recommendCourse, isLoading: recommendCourseLoading } =
    useGetRecommendedCoursesQuery(courseId);

  // console.log("Recommended courses:", recommendCourse);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-20 ">
      <h2>Recommended Courses</h2>
      <div>
        <>
          {recommendCourse && recommendCourse?.response?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-10">
              {recommendCourse?.response.map((course) => (
                <PopularComp
                  key={course._id}
                  courseId={course._id}
                  title={course.courseTitle}
                  image={course.courseThumbnail}
                  firstName={course?.creator?.additionalDetails?.firstName}
                  lastName={course?.creator?.additionalDetails?.lastName}
                  price={course.coursePrice}
                  category={course.category}
                  level={course.courseLevel}
                />
              ))}
            </div>
          ) : (
            <p className="text-center font-medium text-xl mt-15">
              No Course found!
            </p>
          )}
        </>
      </div>
    </div>
  );
};

export default RecommendCourse;
