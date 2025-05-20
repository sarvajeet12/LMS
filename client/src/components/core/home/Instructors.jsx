import React from "react";
// import { instructorData } from "../../../data/instructors-data";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAllInstructorsQuery } from "../../../features/apis/authApi";

const Instructors = () => {
  const { data: instructorData, isLoading: instructorLoading } =
    useGetAllInstructorsQuery();

    // console.log("instructorData", instructorData);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="py-20">
      <div className="m-auto w-3/4">
        <div>
          {/* heading and subheading*/}
          <p className=" text-secondary-dark">Instructors</p>
          <h2 className="text-3xl font-bold">Meet our experts</h2>
          <p className="font-medium text-base">
            Discover brilliance in code with our expert instructors. Passionate
            mentors dedicated to fueling your coding journey at CodeHelp.
          </p>
        </div>

        {/* slider */}
        <div className="my-10">
          <Slider {...settings}>
            {!instructorData ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-lg font-bold text-secondary-dark">
                  Loading...
                </p>
              </div>
            ) : instructorData?.response?.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-lg font-bold text-secondary-dark">
                  No Instructor available
                </p>
              </div>
            ) : (
              instructorData?.response?.map((instructor, index) => (
                <div
                  key={index}
                  className="md:p-5 lg:p-15 rounded-md p-5 bg-instructor-bg text-white border-1 border-white"
                >
                  <div className="flex flex-col lg:flex-row items-center md:items-start justify-between">
                    <div className="w-3/10">
                      <img
                        src={instructor.photoUrl}
                        alt={instructor.photoUrl}
                        className="w-full h-auto aspect-auto"
                      />
                    </div>
                    <div className="text-center md:text-left w-3/5">
                      <h3 className="text-xl font-bold">{instructor?.additionalDetails?.firstName}{" "}{instructor?.additionalDetails?.lastName}</h3>
                      <p className="text-base text-white font-medium my-2">
                        Profession : {instructor?.additionalDetails?.profession}
                      </p>
                      <p className="text-base text-white font-medium my-2">
                        Experience {instructor?.additionalDetails?.experience}
                      </p>
                      <p className="text-sm  xl:text-base text-white mt-5 xl:mt-10 ">
                        {instructor?.additionalDetails?.about}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
        <div className="text-center">
          <Link to={"/explore-instructors"}>
            <button type="button" className="btn">
              Explore Instructors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
