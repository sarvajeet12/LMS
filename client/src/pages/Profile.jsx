import React, { useEffect } from "react";
import { popularCourse } from "../data/popular-courses";
import PopularComp from "../components/core/home/PopularComp";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { useLoadUserQuery } from "../features/apis/authApi";
import { useSelector } from "react-redux";
import { ProfileSkeleton } from "../components/common/Loading/Skeleton";
import ProfileInfo from "../components/core/home/ProfileInfo";

const Profile = () => {
  const { data: userData, isLoading, refetch } = useLoadUserQuery();
  const userProfile = userData?.response?.additionalDetails;

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  // console.log("userProfile", userProfile);

  // Refetch on login
  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="my-32  px-4 sm:px-6 lg:px-8">
          {Array.from({ length: 1 }).map((_, index) => (
            <ProfileSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="my-32 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto xl:w-5xl flex flex-col gap-y-10">
            <ProfileInfo />
            <h3 className="text-3xl font-bold">My Profile</h3>

            {/* -------------------------------- user info (Profile Photo, email and role) ------------------------------ */}
            <div>
              <div className="flex flex-col sm:flex-row gap-x-5">
                <img
                  src={user?.photoUrl}
                  className="size-15 md:size-20 rounded-full"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-md md:text-xl">{user?.email}</p>
                  <p className="text-md md:text-xl font-medium">{user?.role}</p>
                </div>
              </div>
              <div className="text-start mt-5">
                <Link to={`/profile-image/${userId}/edit`} className="text-end">
                  <button className="btn">Edit Profile Image</button>
                </Link>
              </div>
            </div>

            <hr className="bg-slate-300 h-[.1px] border-0" />
            {/* --------------------------- Display edit profile part --------------------------------------------- */}
            <div className="flex flex-col gap-y-10">
              {/* first name and last name */}
              <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 gap-y-5">
                <div className="flex flex-col  gap-y-2 w-full md:w-4/10">
                  <label className="text-secondary-dark">First Name</label>
                  <p
                    className={`bg-slate-200 text-md px-3 py-2 font-medium ${
                      (userProfile?.firstName === null ||
                        userProfile?.firstName === "") &&
                      "text-gray-500"
                    }`}
                  >
                    {userProfile?.firstName === null ||
                    userProfile?.firstName === ""
                      ? "Ex. Sarvajeet"
                      : userProfile?.firstName}
                  </p>
                </div>
                <div className="flex flex-col  gap-y-2 w-full md:w-4/10">
                  <label className="text-secondary-dark">Last Name</label>
                  <p
                    className={`bg-slate-200 text-md px-3 py-2 font-medium ${
                      (userProfile?.lastName === null ||
                        userProfile?.lastName === "") &&
                      "text-gray-500"
                    }`}
                  >
                    {userProfile?.lastName === null ||
                    userProfile?.lastName === ""
                      ? "Ex. Shah"
                      : userProfile?.lastName}
                  </p>
                </div>
              </div>

              {/* gender and  contact number*/}
              <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 gap-y-5">
                <div className="flex flex-col  gap-y-2  w-full md:w-4/10">
                  <label>Gender</label>
                  <p
                    className={`bg-slate-200 text-md px-3 py-2 font-medium ${
                      (userProfile?.gender === null ||
                        userProfile?.gender === "") &&
                      "text-gray-500"
                    }`}
                  >
                    {userProfile?.gender === null || userProfile?.gender === ""
                      ? "Ex. Male"
                      : userProfile?.gender}
                  </p>
                </div>
                <div className="flex flex-col  gap-y-2  w-full md:w-4/10">
                  <label>Phone Number</label>
                  <p
                    className={`bg-slate-200 text-md px-3 py-2 font-medium ${
                      (userProfile?.contactNumber === null ||
                        userProfile?.contactNumber === "") &&
                      "text-gray-500"
                    }`}
                  >
                    {userProfile?.contactNumber === null ||
                    userProfile?.contactNumber === ""
                      ? "Ex. 9874563210"
                      : userProfile?.contactNumber}
                  </p>
                </div>
              </div>

              {/* -------------------- Experience And Profession---------------------- */}
              {user?.role === "instructor" && (
                <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 gap-y-5">
                  <div className="flex flex-col  gap-y-2 w-full md:w-4/10">
                    <label>Experience</label>
                    <p
                      className={`bg-slate-200 text-md px-3 py-2 font-medium ${
                        (userProfile?.experience === null ||
                          userProfile?.experience === "") &&
                        "text-gray-500"
                      }`}
                    >
                      {userProfile?.experience === null ||
                      userProfile?.experience === ""
                        ? "Ex. 2 years"
                        : userProfile?.experience}
                    </p>
                  </div>
                  <div className="flex flex-col  gap-y-2 w-full md:w-4/10">
                    <label>Profession</label>
                    <p
                      className={`bg-slate-200 text-md px-3 py-2 font-medium ${
                        (userProfile?.profession === null ||
                          userProfile?.profession === "") &&
                        "text-gray-500"
                      }`}
                    >
                      {userProfile?.profession === null ||
                      userProfile?.profession === ""
                        ? "Ex. Software Engineer"
                        : userProfile?.profession}
                    </p>
                  </div>
                </div>
              )}

              {/* about */}
              <div className="flex flex-col gap-y-2 w-full">
                <label>About</label>
                <p
                  className={`bg-slate-200 text-md px-3 py-2 font-medium max-h-96 overflow-y-auto ${
                    (userProfile?.about === null ||
                      userProfile?.about === "") &&
                    "text-gray-500"
                  }`}
                >
                  {userProfile?.about === null || userProfile?.about === ""
                    ? "Ex. I am a software engineer"
                    : userProfile?.about}
                </p>
              </div>
              <Link to={`/profile/${userId}/edit`} className="text-end">
                <button className="btn">Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

// {/* <hr className="bg-slate-300 h-[.1px] border-0" />
// {/* course  */}
// <div>
//   <h3 className="text-xl font-medium">
//     {user?.role === "instructor"
//       ? "Course you'r created"
//       : user?.role === "student" && "Course you'r enrolled in"}
//   </h3>
//   <div className="mt-10">
//     {user?.enrolledCourses && user.enrolledCourses.length > 0 ? (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-20 mt-10">
//         {popularCourse.map((course) => (
//           <PopularComp
//             key={course.id}
//             title={course.title}
//             image={course.image}
//             instructor={course.instructor}
//             price={course.price}
//             category={course.category}
//             level={course.level}
//           />
//         ))}
//       </div>
//     ) : (
//       <div className="flex flex-col items-center justify-center gap-10 mt-20">
//         <h3 className="text-2xl font-medium text-center">
//           {user?.role === "instructor"
//             ? "No course created yet"
//             : user?.role === "student" && "No course enrolled yet"}
//         </h3>
//         {user?.role === "instructor" ? (
//           <Link to="/instructor/dashboard">
//             <button className="btn">Create Course</button>
//           </Link>
//         ) : (
//           user?.role === "student" && (
//             <Link to="/courses-list">
//               <button className="btn">Explore Course</button>
//             </Link>
//           )
//         )}
//       </div>
//     )}
//   </div>
// </div> */}
