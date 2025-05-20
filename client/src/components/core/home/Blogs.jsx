import React from "react";
import { blogData } from "../../../data/blogs-data";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiShoppingTag } from "react-icons/ci";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className=" bg-gray-100 py-30">
      {/* heading and subheading*/}
      <p className=" text-secondary-dark text-center">Blogs And News</p>
      <h2 className="text-3xl font-bold text-center">
        Stay updated with our news and blog.
      </h2>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 px-4 sm:px-6 lg:px-8 mt-20">
        {blogData.map((blog, index) => (
          <div
            key={index}
            className="border-1 bg-white border-slate-300 rounded-sm shadow-md h-96 p-2"
          >
            <div className="h-1/2">
              <img src={blog.image} className="h-full w-full" alt="" />
            </div>
            <div className="h-1/2 p-2">
              <span className="flex justify-between items-center">
                <p className="flex items-center text-xs font-bold text-white gap-1 bg-primary px-2 py-1 rounded-full">
                  <span>
                    <FaRegCalendarAlt />{" "}
                  </span>
                  <span>{blog.date}</span>{" "}
                </p>
                <p className="flex items-center text-xs font-bold text-white gap-1 bg-primary px-2 py-1 rounded-full">
                  <span>
                    <CiShoppingTag />{" "}
                  </span>
                  <span>{blog.category}</span>{" "}
                </p>
              </span>
              <h3 className="text-lg font-bold mt-3 mb-2 w-full">
                {blog.title.split(" ").slice(0, 6).join(" ") + "..."}
              </h3>
              <Link to={blog.link} target="_blank" className="text-primary font-bold">
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
