import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { crateCourseCategory } from "../data/popular-courses";
import { Link } from "react-router-dom";
import axios from "axios";
// const SEARCH_API = "http://localhost:5000/api/v1/course/search";
const SEARCH_API = "https://lms-server-i8kl.onrender.com/api/v1/course/search";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track the selected category

  useEffect(() => {
    fetchCourses();
  }, [sortOrder, categoryFilter]);

  const fetchCourses = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(SEARCH_API, {
        params: {
          searchTerm,
          sortOrder,
          categoryFilter,
        },
      });
      // console.log("courses list:", response.data.result);
      setCourses(response.data.result);
    } catch (error) {
      console.error("Error fetching courses", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // console.log("courses filter ", courses);

  const handleSearch = () => {
    fetchCourses();
  };

  return (
    <>
      <Navbar />
      {/* Headers: Search  */}
      <div className="bg-primary text-white py-15 md:py-20 mt-15 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-y-5">
          <h2 className="text-center">Find the Best Courses for You</h2>
          <p className="text-center">
            Discover, Learn and Up skill with our wide range of courses
          </p>
          <div
            action=""
            className="w-full text-center flex flex-col items-center md:flex-row  gap-y-5 md:justify-center mt-5 md:mt-10"
          >
            <input
              type="text"
              placeholder="Search Courses Name"
              className="border-1 border-slate-300 w-full md:w-7/10 lg:w-1/2 px-5 h-10 outline-0 md:rounded-bl-3xl md:rounded-tl-3xl md:rounded-br-none md:rounded-tr-none
              rounded-3xl bg-white text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(); // Trigger the search when "Enter" is pressed
                }
              }}
            />
            <button
              className="h-10 text-sm font-medium  bg-secondary text-primary-dark w-25 border-1 border-secondary cursor-pointer 
              md:rounded-br-3xl md:rounded-tr-3xl md:rounded-bl-none md:rounded-tl-none rounded-3xl"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* filter */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row my-20">
        {/* Filter options */}
        <aside className="w-full lg:w-3/10 p-5 border-b-1 lg:border-b-0 lg:border-r-1 border-slate-300">
          {/* Sort by High to low or low to hight price */}
          <div className="flex gap-x-5 items-center">
            <label
              htmlFor="filterOption"
              className="text-black text-xl font-medium"
            >
              Filter Options
            </label>
            <select
              name="price"
              id=""
              className="border-1 border-slate-300 rounded-md py-2 w-30 cursor-pointer"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="lowToHigh">Low to high</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          {/* Category filter */}
          <div className="mt-10">
            <h3 className="text-xl font-medium">Category</h3>
            <div className="flex flex-row gap-x-5 flex-wrap lg:flex-col gap-y-5 mt-5">
              {crateCourseCategory.map((category, index) => (
                <label
                  className="flex gap-x-2 text-base items-center font-medium"
                  key={index}
                >
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={selectedCategory === category} // Controls the checked state
                    className="text-base"
                    onChange={() => {
                      // If the same category is clicked, uncheck it
                      if (selectedCategory === category) {
                        setSelectedCategory(""); // Clear selection (uncheck)
                        setCategoryFilter(""); // Reset filter
                        // console.log("Unchecked:", category);
                      } else {
                        setSelectedCategory(category); // Set new selection (check)
                        setCategoryFilter(category); // Update filter
                        // console.log("Checked:", category);
                      }
                    }}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* lists */}
        <div className="w-full lg:w-7/10 p-5 flex flex-col gap-y-10">
          {courses.length > 0 ? (
            <>
              {loading ? (
                <h3 className="font-bold text-2xl text-center">Loading...</h3>
              ) : (
                <>
                  {courses?.map((course, index) => (
                    <Link key={index} to={`/course-details/${course._id}`}>
                      <div className="border-b-1 border-slate-300  flex flex-col sm:flex-row gap-y-5 sm:gap-x-5 pb-4">
                        {/* Image */}
                        <div className="w-full sm:w-3/10 h-50 sm:h-40 border-1 border-slate-300">
                          <img
                            src={course.courseThumbnail}
                            alt="thumbnail"
                            className="w-full h-full "
                          />
                        </div>
                        {/* Content */}
                        <div className="w-full sm:w-7/10 flex flex-col gap-y-3">
                          <h3 className="font-bold text-2xl ">
                            {course?.courseTitle}
                          </h3>
                          <p className="text-secondary-dark text-base">
                            {course.subTitle}
                          </p>
                          <p className="text-secondary-dark text-base">
                            Instructor :{" "}
                            <span className="font-medium text-black">
                              {course?.creator?.additionalDetails?.firstName}
                              {course?.creator?.additionalDetails?.lastName}
                            </span>
                          </p>
                          <p className="text-secondary-dark text-base">
                            Price :{" "}
                            <span className="font-medium text-black">
                              {course.coursePrice}
                            </span>
                          </p>
                          <span className="px-5 py-1 rounded-xl bg-primary text-white font-medium text-sm w-25 text-center">
                            {course.courseLevel}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </>
          ) : (
            <h3 className="text-xl font-medium">No course found</h3>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseList;
