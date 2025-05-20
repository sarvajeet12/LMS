import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCourseWithPaymentStatusQuery } from "../features/apis/purchaseApi";
import { toast } from "react-toastify";
import { useCourseReviewMutation } from "../features/apis/courseApi";
import { IoMdArrowBack } from "react-icons/io";

const Review = ({}) => {
  // State for review and rating
  const [reviewDescription, setReviewDescription] = React.useState("");
  const [rating, setRating] = React.useState("");

  // Getting courseId from URL params
  const { courseId } = useParams();
  const navigate = useNavigate();

  // ----------------------------------------------- Calling Hook -----------------------------------------------------
  const { data, refetch } = useGetCourseWithPaymentStatusQuery(courseId);

  const [
    courseReview,
    {
      data: reviewData,
      isError: reviewError,
      isLoading: reviewLoading,
      isSuccess: reviewSuccess,
    },
  ] = useCourseReviewMutation();

  const reviewSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await courseReview({
      courseId,
      reviewDescription,
      rating,
    });

    // console.log("Review response:", response);

    if (response.error) {
      toast.error(response.error.data.message);
      return;
    }
    toast.success(response.data.message || "Review submitted successfully");

    setReviewDescription("");
    setRating("");
    navigate("/my-learning"); // Redirect to home page or any other page after submission
  };

  // console.log("Review course data:", data);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto xl:w-5xl flex flex-col gap-y-10">
          {/* Heading Section */}
          <div>
            {" "}
            <div className="flex gap-x-5 items-center">
              <Link
                to={`/my-learning`}
                className="size-8 sm:size-10 border-2 border-slate-200 flex justify-center items-center rounded-full "
              >
                <IoMdArrowBack className="text-base sm:text-xl" />{" "}
              </Link>
              <h3 className="text-4xl font-medium">Course Review :</h3>
            </div>
            <p className="text-secondary-dark mt-3">
              Share your thoughts and feedback on the course
            </p>
          </div>

          {/* Course Information */}
          <div className="flex flex-col gap-y-4 bg-gray-100 p-4">
            <h3 className="text-lg font-semibold">Course Information</h3>
            <p className="text-gray-600">
              Course Title: {data?.course?.courseTitle}
            </p>
            <p className="text-gray-600">
              Instructor Name : {data?.creatorInfo?.firstName}{" "}
              {data?.creatorInfo?.lastName}
            </p>
          </div>

          {/* Review Form */}
          <form
            className="flex flex-col gap-y-4"
            onSubmit={(e) => reviewSubmitHandler(e)}
          >
            <div className="flex flex-col gap-y-2">
              <label htmlFor="rating" className="text-sm font-semibold">
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                className="border border-gray-300 rounded-md p-2"
                required
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select a rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            <div className="flex flex-col gap-y-2">
              <label htmlFor="review" className="text-sm font-semibold">
                Review
              </label>
              <textarea
                id="review"
                name="review"
                rows="4"
                className="border border-gray-300 rounded-md p-2"
                placeholder="Write your review here..."
                required
                onChange={(e) => setReviewDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Review;
