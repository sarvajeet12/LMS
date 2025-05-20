import React, { useEffect, useState } from "react";
import { crateCourseCategory } from "../data/popular-courses";
import InstructorMobileNav from "../components/common/InstructorMobileNav";
import { useCreateCourseMutation } from "../features/apis/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { instructorId } = useParams();

  const [
    createCourse,
    {
      data: createCourseData,
      error: createCourseError,
      isLoading: createCourseIsLoading,
      isSuccess: createCourseIsSuccess,
    },
  ] = useCreateCourseMutation();

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    await createCourse({ courseTitle, category });

    setCourseTitle("");
    setCategory("");
  };

  useEffect(() => {
    if (createCourseData && createCourseIsSuccess) {
      toast.success("Course Create Successfully");
      navigate(`/instructor/${instructorId}/course`);
    }

    if (createCourseError) {
      toast.error(createCourseError.data.message || "Failed to create course");
    }
  }, [createCourseData, createCourseIsSuccess, createCourseError]);

  return (
    <div className="border-1 border-red-700 w-full px-3 sm:px-10 py-5">
      <div className="block md:hidden">
        <InstructorMobileNav />{" "}
      </div>

      <hr className="block md:hidden bg-slate-300 h-[.1px] border-0 my-2" />

      <h3 className="font-medium text-2xl">
        Lets add course, add some basic details for your new course
      </h3>
      <p className="text-md text-secondary-dark">
        Start learning today with interactive, engaging, and practical content.
      </p>

      {/* Add course form */}
      <form
        className="mt-15 flex flex-col gap-y-5"
        onSubmit={(e) => handleCreateCourse(e)}
      >
        <div className="flex flex-col gap-y-2">
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="courseTitle"
            className="border-slate-300 border-1 w-full md:full lg:w-7/10 h-8 sm:h-10 outline-0 px-1 rounded-sm"
            placeholder="Your Course Name"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-medium">Category</label>
          <select
            className="border-slate-300 border-1 w-full md:w-full lg:w-3/10 h-8 sm:h-10 outline-0 px-1 rounded-sm"
            onChange={(e) => setCategory(e.target.value)}
            required
            value={category}
          >
            <option value="">Select Category</option>
            {crateCourseCategory.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-x-5 mt-5">
          <button
            type="button"
            className="border-1 border-slate-300 px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-all hover:shadow-lg"
            onClick={() => navigate(`/instructor/${instructorId}/course`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn">
            {createCourseIsLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
