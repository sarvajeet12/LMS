import React from "react";
import { reviewsData } from "../../../data/reviews-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllReviewsQuery } from "../../../features/apis/courseApi";
import { useSelector } from "react-redux";

const Reviews = () => {
  // -------------------------------- Calling Hook to get all reviews ----------------------------------
  const { data: allReviewsData, isLoading: reviewLoading } =
    useGetAllReviewsQuery();

  //   ------------------------------- Custom Arrow Component ----------------------------------
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-secondary text-white p-2 
            size-10 flex justify-center items-center text-2xl cursor-pointer rounded-full shadow-lg  z-50"
    >
      &#8592;
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-secondary text-white p-2 
            size-10 flex justify-center items-center text-2xl cursor-pointer rounded-full shadow-lg "
    >
      &#8594;
    </button>
  );

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1536, // 2xl screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // xl screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // md screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" bg-gray-100 py-20 mt-30">
      <div className="m-auto w-3/4">
        <p className=" text-secondary-dark text-center">Reviews</p>
        <h2 className="text-3xl font-bold text-center">
          What our students says
        </h2>
        <div className="mt-20">
          <Slider {...settings}>
            {reviewLoading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-lg font-bold text-secondary-dark">
                  Loading...
                </p>
              </div>
            ) : allReviewsData?.response?.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-lg font-bold text-secondary-dark">
                  No reviews available
                </p>
              </div>
            ) : (
              allReviewsData?.response?.map((review, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-10
                        border-1 border-gray-200 rounded-md bg-white shadow-2xl"
                >
                  <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <div
                      className={`size-20 rounded-full  flex justify-center items-center`}
                      alt=""
                    >
                      <img
                        src={review?.userId?.photoUrl}
                        alt=""
                        className="size-20 rounded-full"
                      />
                    </div>
                    <p className="text-lg font-medium text-center">
                      {review?.userId?.additionalDetails?.firstName}{" "}
                      {review?.userId?.additionalDetails?.lastName}
                    </p>
                  </div>
                  <p className="text-base text-secondary-dark my-2">
                    {review.reviewDescription}
                  </p>
                  <span className="text-sm  bg-secondary px-4 py-1 text-white font-bold">
                    Rating: {review.rating}/5
                  </span>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
