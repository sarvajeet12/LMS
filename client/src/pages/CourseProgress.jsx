import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { CiCircleCheck } from "react-icons/ci";
import { BsPlayCircle } from "react-icons/bs";
import {
  useGetCourseProgressQuery,
  useMarkAsCompleteMutation,
  useMarkAsInCompleteMutation,
  useUpdateLectureProgressMutation,
} from "../features/apis/courseProgressApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CourseProgress = () => {
  const [currentLecture, setCurrentLecture] = useState(null);
  const { courseId } = useParams();

  // ----------------------------------------- Calling Hooks ---------------------------------------------------
  const {
    data,
    isLoading: getCourseProgressLoading,
    isError: getCourseProgressError,
    refetch,
  } = useGetCourseProgressQuery(courseId);
  // console.log("useGetCourseProgressQuery: ", data);

  const [
    updateLectureProgress,
    {
      data: updateLectureProgressData,
      isLoading: updateLectureProgressLoading,
      isError: updateLectureProgressError,
    },
  ] = useUpdateLectureProgressMutation();

  const [
    markAsComplete,
    {
      data: marksAsCompleteData,
      isError: marksAsCompleteError,
      isLoading: marksAsCompleteLoading,
      isSuccess: marksAsCompleteSuccess,
    },
  ] = useMarkAsCompleteMutation();

  const [
    markAsInComplete,
    {
      data: InCompleteData,
      isError: InCompleteError,
      isLoading: InCompleteLoading,
      isSuccess: InCompleteSuccess,
    },
  ] = useMarkAsInCompleteMutation();

  // Effect
  useEffect(() => {
    if (marksAsCompleteData) {
      toast.success("Completed");
      refetch();
    }

    if (InCompleteData) {
      toast.success("Mark as incomplete");
      refetch();
    }
  }, [marksAsCompleteSuccess, InCompleteSuccess]);

  if (getCourseProgressLoading) return <h2>Loading...</h2>;
  if (getCourseProgressError) return <h2>Failed to load course details</h2>;

  // ------------------------------------ Initialize the first lecture is not exist ------------------------------------
  const initialLecture =
    currentLecture ||
    (data.data.courseDetails.lectures && data.data.courseDetails.lectures[0]);

  // ------------- Method : to know which lecture is completed or not, it return true and false -------------------------------
  const isLectureComplete = (lectureId) => {
    return data.data.progress.some(
      (prog) => prog.lectureId === lectureId && prog.viewed
    );
  };

  // --------------------- Handle select a specific lecture to watch --------------------------------------
  const handleSelectLecture = (lecture) => {
    // console.log("lecture: ",lecture?._id)
    setCurrentLecture(lecture);
  };

  // --------------------- Handle Update Lecture Progress--------------------------------------
  const handleUpdateLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  // handle mark as complete
  const marksAsCompleteHandler = async () => {
    await markAsComplete(courseId);
  };

  // handle mark as incomplete
  const marksAsInCompleteHandler = async () => {
    await markAsInComplete(courseId);
  };

  //TODO: console.log("current lecture",currentLecture) initially current lecture is null (set first lecture bg-gray) remember it

  return (
    <>
      <Navbar />

      {/* ------------------------------ COURSE PROGRESS CONTENT ------------------------------------ */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-32">
        {/* Course Title and button */}
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-2xl">
            Course Name : {data.data.courseDetails?.courseTitle}
          </h3>
          <button
            className={`${
              data.data.completed
                ? "btn bg-transparent text-black border-2 border-slate-300"
                : "btn"
            }`}
            onClick={
              data.data.completed
                ? marksAsInCompleteHandler
                : marksAsCompleteHandler
            }
          >
            {data.data.completed ? "Completed" : "Mark as completed"}
          </button>
        </div>

        {/* Video and Lecture List index */}
        <div className="mt-10 flex flex-col lg:flex-row gap-y-10 lg:gap-x-10">
          {/* Video */}
          <div className="border-1 rounded-md border-slate-300 lg:w-3/5 p-4">
            <div className="h-96 bg-black">
              <video
                className="w-full h-full"
                src={currentLecture?.videoUrl || initialLecture?.videoUrl}
                controls
                onPlay={() =>
                  handleUpdateLectureProgress(
                    currentLecture?._id || initialLecture?._id
                  )
                }
              />
            </div>
            <h3 className="font-medium text-xl mt-5">
              {`Lecture ${
                data.data.courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture?.lectureTitle
              }`}
            </h3>
          </div>

          {/* Lecture List */}
          <div className="bg-payment-bg rounded-md lg:w-2/5 p-4">
            <h3 className="font-medium text-xl text-white">Course Lectures</h3>

            {/* Lectures  */}
            <ul className="flex flex-col gap-y-5 mt-4 h-96 overflow-y-auto">
              {data.data.courseDetails?.lectures.map((title, index) => (
                <li
                  key={title._id}
                  className={`flex items-center justify-between gap-x-5 font-xl border-1 border-slate-300 rounded-sm p-4 ${
                    title._id === currentLecture?._id
                      ? "bg-slate-300"
                      : "bg-white"
                  }`}
                  onClick={() => handleSelectLecture(title)}
                >
                  <div className="flex items-center gap-x-2">
                    <span>
                      {isLectureComplete(title._id) ? (
                        <CiCircleCheck className="text-green-600" size={20} />
                      ) : (
                        <BsPlayCircle size={20} />
                      )}
                    </span>
                    <span>
                      Lecture-{index + 1}: {title.lectureTitle}
                    </span>
                  </div>

                  {isLectureComplete(title._id) && (
                    <span className="bg-green-300 text-white text-sm px-2 py-0.5 rounded-sm">
                      completed
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseProgress;
