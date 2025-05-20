import React, { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { crateCourseCategory } from "../../../data/popular-courses";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "../../../features/apis/courseApi";
import { toast } from "react-toastify";

const EditCourseForm = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    thumbnail: "",
    thumbnailPreviewUrl: "",
  });

  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;
  const { instructorId } = useParams();

  // ---------------------------------------- Calling Get course by id ---------------------------------
  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    isSuccess: courseByIdIsSuccess,
  } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (courseByIdData?.response) {
      const course = courseByIdData?.response;
      setFormData({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        thumbnail: "",
      });
    }
  }, [courseId, courseByIdIsSuccess]);

  // ------------------------------------------------- handle input form --------------------------------------------------
  const handleInputForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData({
        ...formData,
        thumbnail: files[0],
        thumbnailPreviewUrl: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ----------------------------------------------------- RTK -----------------------------------------------

  const [
    editCourse,
    {
      data: editData,
      error: editError,
      isLoading: editLoading,
      isSuccess: editSuccess,
    },
  ] = useEditCourseMutation();

  // --------------------------------------------- Handle form data -------------------------------------------------
  const handleEditCourseForm = async (e) => {
    e.preventDefault();

    const formDataInput = new FormData();
    formDataInput.append("courseTitle", formData.courseTitle);
    formDataInput.append("subTitle", formData.subTitle);
    formDataInput.append("description", formData.description);
    formDataInput.append("category", formData.category);
    formDataInput.append("courseLevel", formData.courseLevel);
    formDataInput.append("coursePrice", formData.coursePrice);
    formDataInput.append("thumbnail", formData.thumbnail);

    await editCourse({ formDataInput, courseId }); // Here id is courseId
  };

  // Effect
  useEffect(() => {
    if (editData && editSuccess) {
      toast.success(editData.message || "Course updated Successfully");
      navigate(`/instructor/${instructorId}/course`);
    }

    if (editError) {
      toast.error(editError.error || "Failed to updated course");
    }
  }, [editData, editSuccess]);

  if (courseByIdLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <form
      className="mt-15 flex flex-col gap-y-5"
      onSubmit={(e) => handleEditCourseForm(e)}
      encType="multipart/form-data"
    >
      {/* CourseTitle Input */}
      <div className="flex flex-col">
        <label htmlFor="courseName" className="text-base font-medium">
          Course Name
        </label>
        <input
          type="text"
          name="courseTitle"
          required
          id="courseName"
          placeholder="Course title"
          className="border-[.1px] border-slate-300 rounded-sm w-full h-10 px-1 text-sm outline-0"
          onChange={(e) => handleInputForm(e)}
          value={formData.courseTitle}
        />
      </div>

      {/* CourseTitle Input */}
      <div className="flex flex-col">
        <label htmlFor="subTitle" className="text-base font-medium">
          Subtitle
        </label>
        <input
          type="text"
          name="subTitle"
          required
          id="subTitle"
          placeholder="Course subtitle"
          className="border-[.1px] border-slate-300 rounded-sm w-full h-10 px-1 text-sm outline-0"
          onChange={(e) => handleInputForm(e)}
          value={formData.subTitle}
        />
      </div>

      {/* Course Description */}
      <div className="flex flex-col">
        <label htmlFor="subTitle" className="text-base font-medium">
          Description
        </label>
        <RichTextEditor formData={formData} setFormData={setFormData} />
      </div>

      {/* Category || Course Level  || Price  */}
      <div className="grid sm:grid-cols-3 sm:gap-x-10 gap-y-5">
        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-base font-medium">
            Category
          </label>
          <select
            required
            className="border-[.1px] border-slate-300 rounded-sm h-10 px-1 text-sm outline-0"
            onChange={(e) => handleInputForm(e)}
            value={formData.category}
            name="category"
          >
            <option value="">Select Category</option>
            {crateCourseCategory.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Course Level */}
        <div className="flex flex-col">
          <label htmlFor="courseLevel" className="text-base font-medium">
            Course Level
          </label>
          <select
            required
            className="border-[.1px] border-slate-300 rounded-sm h-10 px-1 text-sm outline-0"
            onChange={(e) => handleInputForm(e)}
            value={formData.courseLevel}
            name="courseLevel"
          >
            <option value="">Select Category</option>
            <option value="Beginner">Beginner</option>
            <option value="Medium">Medium</option>
            <option value="Advance">Advance</option>
          </select>
        </div>

        {/* Price in (INR) */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-base font-medium">
            Price in (INR)
          </label>
          <input
            type="number"
            name="coursePrice"
            id="price"
            placeholder="Price"
            className="border-[.1px] border-slate-300 rounded-sm h-10 px-1 text-sm outline-0"
            onChange={(e) => handleInputForm(e)}
            value={formData.coursePrice}
          />
        </div>
      </div>

      {/* Course Thumbnail */}
      <div>
        <div className="flex flex-col">
          <label htmlFor="thumbnailImages" className="text-base font-medium">
            Course Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            required
            id="thumbnailImages"
            className="border-[.1px] border-slate-300 rounded-sm w-full h-10 px-1 py-2 text-sm outline-0 cursor-pointer"
            onChange={(e) => handleInputForm(e)}
          />
        </div>

        {/* Thumbnail preview */}
        {formData.thumbnailPreviewUrl && (
          <div className=" h-50 sm:w-96 mt-5">
            <img
              src={formData.thumbnailPreviewUrl}
              alt=""
              className="w-full h-full"
            />
          </div>
        )}
      </div>

      {/* Add button of cancel and save */}
      <div className="space-x-5 mt-5">
        <button
          type="button"
          className="border-1 border-slate-300 px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-all hover:shadow-lg"
          onClick={() => navigate(`/instructor/${instructorId}/course`)}
        >
          Cancel
        </button>
        <button type="submit" className="btn">
          {editLoading ? "Loading..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditCourseForm;
