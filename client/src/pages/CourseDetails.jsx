import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { BsExclamationOctagon, BsPlayCircle } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import PayButton from "../components/common/PayButton";
import { useGetCourseWithPaymentStatusQuery } from "../features/apis/purchaseApi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import CourseReview from "../components/core/student/CourseReview";
import RecommendCourse from "./RecommendCourse";

const CourseDetails = () => {
  const { courseId } = useParams();

  const { data, refetch } = useGetCourseWithPaymentStatusQuery(courseId);

  console.log("Course details with purchase details:", data);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Navbar />

      {/* ---------------------------------- Headers: Course Details ------------------------------------------  */}
      <div className="bg-primary text-white py-10 mt-15 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col gap-y-5">
          <h1 className="text-4xl md:text-5xl">{data?.course?.courseTitle}</h1>
          <h3 className="font-medium text-base sm:text-xl">
            {data?.course?.subTitle}
          </h3>
          <p className="flex gap-x-2">
            <span>Created By - </span>
            <span className="text-base font-medium">
              {data?.creatorInfo?.firstName} {data?.creatorInfo?.lastName}
            </span>
          </p>
          <p className="flex gap-x-2 items-center text-sm">
            <BsExclamationOctagon />
            <span>Last updated {data?.course?.createdAt.split("T")[0]}</span>
          </p>
        </div>
      </div>

      {/* ------------------------------------- Description And Video ---------------------------------------- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 gap-y-20 grid grid-cols-1 lg:grid-cols-2 bg-gray-100 py-25">
        {/* Description */}
        <div className="border-1 border-slate-300 bg-slate-200 p-4 rounded-2xl">
          <h3 className="text-3xl font-bold">Description</h3>
          <p
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: data?.course?.description }}
          ></p>
        </div>

        {/*----------------------------------------- Video and Pay Option ---------------------------------*/}
        <div className="flex justify-center ">
          <div className="w-full sm:w-7/10 md:w-6/10 lg:w-8/10 xl:w-6/10 p-4 md:h-130 bg-payment-bg">
            {/* Video */}
            <div className="w-full border-1 bg-primary-dark h-60">
              <ReactPlayer
                width="100%"
                height={"100%"}
                url={data?.course?.lectures[0].videoUrl}
                controls={true}
                autoPlay={true}
              />
            </div>
            <h3 className="text-2xl font-medium mt-5 text-white">
              {data?.course?.lectures[0].lectureTitle}
            </h3>
            <hr className="bg-slate-300 h-[.1px] border-0 my-5" />
            {data?.purchased ? (
              <></>
            ) : (
              <p className="font-medium text-3xl text-white">
                ₹{data?.course?.coursePrice}
              </p>
            )}
            {/* button */}
            <div className="text-center mt-10">
              <PayButton
                purchased={data?.purchased}
                courseId={courseId}
                creator={data?.course?.creator?._id}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content  */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-20 flex flex-col gap-y-5">
        <div className="p-4 rounded-2xl w-full lg:max-w-7/10 xl:max-w-1/2 shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] flex flex-col gap-y-5">
          <h3 className="font-medium text-xl">Course Content</h3>
          <h4 className="text-base text-secondary-dark">
            {data?.course?.lectures.length} Lecture
          </h4>

          {/* content */}
          {data?.course?.lectures.map((lecture, index) => (
            <div key={index} className="flex gap-x-2 items-center">
              <span>
                {lecture.isPreviewFree ? (
                  <BsPlayCircle size={20} />
                ) : (
                  <CiLock size={20} />
                )}
              </span>
              <p className="text-base">{lecture.lectureTitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Review */}
      <CourseReview courseId={courseId} />
      <RecommendCourse courseId={courseId} />

      <Footer />
    </>
  );
};

export default CourseDetails;
