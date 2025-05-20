import React, { useState } from "react";
import { popularCourse } from "../../../data/popular-courses";
import { crateCourseCategory } from "../../../data/popular-courses";
import PopularComp from "./PopularComp";
import { Link, useNavigate } from "react-router-dom";
import {
  courseApi,
  useFetchPublishCourseQuery,
} from "../../../features/apis/courseApi";
import { Skeleton } from "../../common/Loading/Skeleton";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authApi } from "../../../features/apis/authApi";

const Popular = () => {
  const Navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Programming Languages");
  const dispatch = useDispatch();

  // ------------------------------ Calling Fetch Publish Course -----------------------------
  const { data: publishCourse, isLoading: publishCourseIsLoading } =
    useFetchPublishCourseQuery();
  // console.log("publish course", publishCourse);

  const handleCategoryChange = (category) => {
    if (category === "View All Courses") {
      Navigate("/courses-list");
    } else {
      setActiveCategory(category);
    }
  };

  const filteredCourses =
    publishCourse?.response?.filter(
      (course) => course.category === activeCategory
    ) || [];

  // useEffect(() => {
  //   dispatch(courseApi.util.resetApiState());
  //   dispatch(authApi.util.resetApiState());
  // }, []);

  // console.log("filter course", filteredCourses);

  return (
    <div className="container mx-auto  px-4 sm:px-6 lg:px-8 mt-30">
      {/* heading and subheading*/}
      <p className="text-secondary-dark text-center">Popular Courses</p>
      <h2 className="text-3xl font-bold text-center">
        Find your perfect program
      </h2>

      {/* course category tabs */}
      <div className="grid xl:grid-cols-6 md:grid-cols-3 gap-4  grid-cols-2 mt-15 md:px-12 px-6">
        {crateCourseCategory.map((category, index) => (
          <button
            key={index}
            className={`text-secondary-dark border-1 text-sm py-2 px-4 cursor-pointer ${
              activeCategory === category
                ? "bg-primary text-white"
                : "text-secondary-dark"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* course */}
      {publishCourseIsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton />
          ))}
        </div>
      ) : (
        <>
          {filteredCourses && filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 mt-10">
              {filteredCourses.map((course) => (
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
      )}

      {/* Button: view all course */}
      <div className="mt-15 text-center">
        <Link to={"/courses-list"}>
          <button className="btn">Explore Courses &rarr;</button>
        </Link>
      </div>
    </div>
  );
};

export default Popular;

//
