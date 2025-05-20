import React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchCoursesQuery } from "../../../features/apis/courseApi";
import { CourseListSkeleton } from "../../common/Loading/Skeleton";

const CourseTable = () => {
  const { data, isLoading } = useFetchCoursesQuery();
  const { instructorId } = useParams();

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return title;
  };

  return (
    <>
      {isLoading ? (
        <div className="my-32  px-4 sm:px-6 lg:px-8">
          {Array.from({ length: 1 }).map((_, index) => (
            <CourseListSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {data && data.response.length > 0 ? (
            <>
              <table className="w-full text-left mt-10">
                <thead className="">
                  <tr>
                    <th className="w-5/10  text-sm sm:text-base  text-secondary-dark font-medium pb-3 pr-2">
                      Title
                    </th>
                    <th className="w-1/10  text-sm sm:text-base  text-secondary-dark font-medium pb-3 pr-2">
                      Price
                    </th>
                    <th className="w-1/10  text-sm sm:text-base  text-secondary-dark font-medium pb-3 pr-2">
                      Status
                    </th>
                    <th className="w-1/10  text-sm sm:text-base  text-secondary-dark font-medium pb-3 pr-2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.response.map((item, index) => (
                    <tr key={index}>
                      <td className="w-4/10 border-t-[.1px] text-black border-slate-300 font-medium text-xs sm:text-sm py-5  pr-5">
                        {truncateTitle(item.courseTitle)}
                      </td>
                      <td className="w-2/10 border-t-[.1px] text-black border-slate-300 font-medium text-xs sm:text-sm py-5 pr-5">
                        {!item.coursePrice ? "N/A" : item.coursePrice}
                      </td>
                      <td className="w-2/10 border-t-[.1px] text-black border-slate-300 font-medium text-xs sm:text-sm py-5 pr-5">
                        <span
                          className={`${
                            item.isPublished
                              ? "bg-green-400 px-2 py-1 rounded-sm text-xs sm:text-sm text-white"
                              : "bg-secondary text-white px-2 py-1 rounded-sm  text-xs sm:text-sm"
                          } inline-block w-20 text-center`}
                        >
                          {item.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="w-2/10 border-t-[.1px] text-black border-slate-300 font-medium text-xs sm:text-sm py-0 sm:py-5 pr-5">
                        <Link
                          to={`/instructor/${instructorId}/course/edit/${item._id}`}
                          className="border-1 border-slate-400 p-2 rounded-sm w-10 sm:w-20 text-center inline-block hover:bg-slate-200"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3 className="text-xl text-center font-medium mt-20">
                No Course Found !
              </h3>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CourseTable;
