import React from "react";
import InstructorMobileNav from "../components/common/InstructorMobileNav";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditCourseForm from "../components/core/Instructor/EditCourseForm";
import {
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "../features/apis/courseApi";
import { toast } from "react-toastify";

const CourseEdit = () => {
  const params = useParams();
  const courseId = params.id;
  const navigate = useNavigate();
  const {instructorId} = useParams();

  // ---------------------------------------- Calling Hook  ----------------------------------------
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    isSuccess: courseByIdIsSuccess,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  const [
    publishCourse,
    {
      data: publishData,
      error: publishError,
      isLoading: publishIsLoading,
      isSuccess: publishIsSuccess,
    },
  ] = usePublishCourseMutation();

  // ---------------------------------------- publish course handler ----------------------------------------

  const coursePublishHandler = async (action) => {
    const response = await publishCourse({ courseId, query: action });

    if (response.data.success) {
      navigate(`/instructor/${instructorId}/course`);
      toast.success("Course Published");
    }
  };

  return (
    <div className="w-full px-3 sm:px-10 py-5">
      <div className="block md:hidden">
        <InstructorMobileNav />{" "}
      </div>
      <hr className="block md:hidden bg-slate-300 h-[.1px] border-0 my-2" />

      {/* ------------------------------------- Course Edit Form box ----------------------------------------- */}
      <div>
        {/* Heading and Links */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
          <h3 className="font-bold text-2xl">
            Add details information regarding course
          </h3>
          <Link
            to={`/instructor/${instructorId}/course/${courseId}/lecture`}
            className="font-medium text-base hover:underline"
          >
            Go to lecture page
          </Link>
        </div>

        {/* Form box */}
        <div className="border-1 border-slate-300 rounded-xl mt-5 p-4">
          {/* Info and button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2 gap-x-5">
            <div>
              <h4 className="text-base font-medium">
                Basic Course Information
              </h4>
              <p className="text-sm text-secondary-dark">
                Make changes to your courses here. Click save when you're done.
              </p>
            </div>
            <div className="space-x-5 space-y-5">
              <button
                type="button"
                className="border-1 border-slate-300 px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-all hover:shadow-lg"
                onClick={() =>
                  coursePublishHandler(
                    courseByIdData?.response?.isPublished ? "false" : "true"
                  )
                }
              >
                {courseByIdData?.response?.isPublished
                  ? "Unpublish"
                  : "Publish"}
              </button>
            </div>
          </div>

          {/* form section */}
          <EditCourseForm />
        </div>
      </div>
    </div>
  );
};

export default CourseEdit;
