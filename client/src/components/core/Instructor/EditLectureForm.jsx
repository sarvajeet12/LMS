import React, { useEffect, useState } from "react";
import RemoveLecture from "./RemoveLecture";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
} from "../../../features/apis/courseApi";

const MEDIA_API = "http://localhost:5000/api/v1/media";
// const MEDIA_API = "https://lms-server-qw4r.onrender.com/api/v1/media";

const EditLectureForm = () => {
  const {instructorId} = useParams();
  // ---------------------------------------------- States -----------------------------------------------

  // Video Is Free Or Not
  const [isToggled, setIsToggled] = useState(false);

  // Lecture Title
  const [lectureTitle, setLectureTitle] = useState("");

  // Video Info
  const [videoInfo, setVideoInfo] = useState(null);

  // Media Progress
  const [mediaProgress, setMediaProgress] = useState(false);

  // Upload Progress
  const [uploadProgress, setUploadProgress] = useState(0);

  // Button Disable While Progress Running
  const [btnDisable, setBtnDisable] = useState(false);

  // When loading progress reached 100% and show please wait, when completed i will hide it
  const [hideTest, setHideTest] = useState(false);

  // --------------------------------------------- Params an navigation
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  // --------------------------------------------- Video Upload handler ----------------------------------------------
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("videoFile", file);
      setMediaProgress(true);
      setBtnDisable(true);
      setHideTest(true);

      // console.log("formData", formData);

      try {
        const response = await axios.post(
          `${MEDIA_API}/upload-video`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );

        if (response.data.success) {
          setVideoInfo({
            videoUrl: response.data.response.url,
            publicId: response.data.response.public_id,
          });
          setBtnDisable(false);
          setHideTest(false);
          setMediaProgress(false);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.log("Error occur while uploading video", error);
      }
    }
  };

  // ----------------------------------------------- Edit Lecture Form Handler ------------------------------------

  const [
    editLecture,
    {
      data: editLectureData,
      error: editLectureError,
      isLoading: editLectureLoading,
      isSuccess: editLectureSuccess,
    },
  ] = useEditLectureMutation();

  const editLectureHandler = async (e) => {
    e.preventDefault();

    await editLecture({
      lectureTitle,
      videoInfo,
      isToggled,
      courseId,
      lectureId,
    });
  };

  // -------------------------------- Get Lecture by Id -------------------------------------
  const {
    data: lectureDataById,
    error: lectureDataByIdError,
    isLoading: lectureDataByIdIsLoading,
  } = useGetLectureByIdQuery(lectureId);

  useEffect(() => {
    const lecture = lectureDataById?.response;
    // console.log("lecture", lecture);

    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsToggled(lecture.isPreviewFree);
      setVideoInfo(lecture.videoUrl);
    }
  }, [lectureDataById]);

  // ---------------------------------- Effect ----------------------------------------------
  useEffect(() => {
    if (editLectureData && editLectureSuccess) {
      toast.success(editLectureData.message || "Lecture edit successfully");
      // console.log("editLectureData", editLectureData);
      navigate(`/instructor/${instructorId}/course/${courseId}/lecture`);
    }

    if (editLectureError) {
      toast.success("Failed to edit lecture");
    }
  }, [editLectureData, editLectureSuccess, editLectureError]);

  return (
    <div className="mt-10 md:mt-20  rounded-md p-5 shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)]">
      <h3 className="text-base sm:text-xl font-medium">Edit Lecture</h3>
      <p className="text-sm sm:text-base text-secondary-dark">
        Make changes and click save when done.
      </p>

      {/* Remove Lecture Button */}
      <RemoveLecture />

      <hr className="bg-slate-300 h-[.1px] border-0 my-10" />

      {/* --------------------------- Form ------------------------------------  */}

      <form
        className=" flex flex-col gap-y-5"
        onSubmit={(e) => {
          editLectureHandler(e);
        }}
        encType="multipart/form-data"
      >
        {/* Input File */}
        <div className="flex flex-col gap-y-2">
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="lectureTitle"
            className="border-slate-300 border-1 w-full h-8 sm:h-10 outline-0 px-1 rounded-sm"
            placeholder="Your Lecture Title Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            required
          />
        </div>

        {/* Add Video File */}
        <div className="flex flex-col">
          <label htmlFor="videoFile" className="text-base font-medium">
            Video <sup className="text-red-600 text-sm">*</sup>
          </label>
          <input
            type="file"
            accept="video/*"
            name="videoFile"
            required
            id="videoFile"
            className="border-[.1px] border-slate-300 rounded-sm w-full h-8 sm:h-10 px-1 py-2 text-sm outline-0 cursor-pointer"
            onChange={(e) => fileChangeHandler(e)}
          />
        </div>

        {/* Video Progress bar */}
        {mediaProgress && (
          <div className="w-full bg-gray-200 rounded-lg h-4">
            <div
              className="bg-blue-500 h-4 rounded-lg"
              style={{ width: `${uploadProgress}%` }}
            ></div>

            {hideTest && (
              <>
                {uploadProgress !== 100 ? (
                  <p>{uploadProgress}% uploaded</p>
                ) : (
                  <p>Please wait...</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Toggle Button */}
        <div
          className={`flex gap-x-2 items-center ${
            mediaProgress ? "mt-10" : "mt-0"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsToggled(!isToggled)}
            className={`w-14 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              isToggled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                isToggled ? "translate-x-8" : "translate-x-0"
              }`}
            ></div>
          </button>
          <h3 className="font-medium text-base">Is this video FREE?</h3>
        </div>

        {/* Submit Button */}
        <div className={`${mediaProgress ? "mt-8" : "mt-0"}`}>
          <button
            className={`btn ${
              btnDisable ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {editLectureLoading ? "Loading..." : "Update Lecture"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLectureForm;
