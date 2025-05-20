import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateLectureMutation } from "../../../features/apis/courseApi";
import { toast } from "react-toastify";

const CreateLectureForm = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  const params = useParams();
  const courseId = params.id;
  const navigate = useNavigate();
  const {instructorId} = useParams();

  // ------------------------------------- useCreateLectureMutation Hook ---------------------------------------
  const [
    createLecture,
    {
      data: createLectureData,
      error: createLectureError,
      isLoading: createLectureIsLoading,
      isSuccess: createLectureIsSuccess,
    },
  ] = useCreateLectureMutation();

  // console.log("data", createLectureData);
  // console.log("error", createLectureError);

  useEffect(() => {
    if (createLectureData && createLectureIsSuccess) {
      toast.success(
        createLectureData.message || "Lecture created successfully"
      );
    }

    if (createLectureError) {
      toast.error("Failed to create course");
    }
  }, [createLectureData, createLectureIsSuccess, createLectureError]);

  const createLectureHandler = async (e) => {
    e.preventDefault();
    await createLecture({ lectureTitle, courseId });
    setLectureTitle("");
  };

  return (
    <form className="mt-5" onSubmit={(e) => createLectureHandler(e)}>
      <div className="flex flex-col gap-y-2">
        <label className="font-medium">Title</label>
        <input
          type="text"
          name="lectureTitle"
          className="border-slate-300 border-1 w-full md:full lg:w-7/10 h-8 sm:h-10 outline-0 px-1 rounded-sm"
          placeholder="Your Lecture Title Name"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-x-5 mt-5">
        <button
          type="button"
          className="border-1 border-slate-300 px-3 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium cursor-pointer transition-all hover:shadow-lg"
          onClick={() => navigate(`/instructor/${instructorId}/course/edit/${courseId}`)}
        >
          Back to course
        </button>
        <button type="submit" className="btn">
          {createLectureIsLoading ? "Loading..." : "Create Lecture"}
        </button>
      </div>
    </form>
  );
};

export default CreateLectureForm;
