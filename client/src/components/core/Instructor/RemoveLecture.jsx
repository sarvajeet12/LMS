import React, { useEffect } from "react";
import { useRemoveLectureMutation } from "../../../features/apis/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const RemoveLecture = () => {
  const { courseId, lectureId } = useParams();
  const navigate = useNavigate();

  const [
    removeLecture,
    {
      error: lectureDeleteError,
      isLoading: lectureDeleteIsLoading,
      isSuccess: lectureDeleteIsSuccess,
    },
  ] = useRemoveLectureMutation();

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (lectureDeleteIsSuccess) {
      toast.success("Lecture Removed Successfully");
      navigate(`/instructor/course/${courseId}/lecture`);
    }

    if (lectureDeleteError) {
      toast.error("Failed to removed lecture");
    }
  }, [lectureDeleteIsSuccess, lectureDeleteError]);

  return (
    <button
      className="btn bg-red-500 mt-5"
      onClick={() => removeLectureHandler()}
    >
      {lectureDeleteIsLoading ? "Removing.." : "Remove Lecture"}
    </button>
  );
};

export default RemoveLecture;
