import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchLecturesQuery } from "../../../features/apis/courseApi";
import { LectureListSkeleton } from "../../common/Loading/Skeleton";

const LecturesList = () => {
  const params = useParams();
  const courseId = params.id;
  const {instructorId} = useParams();

  const { data: lecturesData, isLoading: lectureIsLoading } =
    useFetchLecturesQuery(courseId);

  // console.log("lectures data", lecturesData);

  return (
    <>
      {lectureIsLoading ? (
        <div className="my-32  px-4 sm:px-6 lg:px-8">
          {Array.from({ length: 1 }).map((_, index) => (
            <LectureListSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {lecturesData && lecturesData.response.length > 0 ? (
            <ul className="flex flex-col gap-y-3 mt-15">
              {lecturesData.response.map((lecture, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center gap-x-10 bg-slate-100 p-2 rounded-md"
                >
                  <p className="font-medium text-base">
                    <span>Lecture-{index + 1}: </span>
                    <span>{lecture.lectureTitle}</span>
                  </p>
                  <Link
                    to={`/instructor/${instructorId}/course/${courseId}/lecture/edit/${lecture._id}`}
                    className="border-1 border-slate-400  p-2 rounded-sm w-15 sm:w-20 text-center inline-block hover:bg-slate-200"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <h3 className="text-center mt-30 font-medium text-2xl">
              No Lectures created yet !
            </h3>
          )}
        </>
      )}
    </>
  );
};

export default LecturesList;
