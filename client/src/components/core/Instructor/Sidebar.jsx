import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logoAssets } from "../../../data/image-data";
import { MdSpaceDashboard } from "react-icons/md";
import { MdTopic } from "react-icons/md";
import { useUserLogoutMutation } from "../../../features/apis/authApi";
import { toast } from "react-toastify";

const Sidebar = () => {

  const {instructorId} = useParams();

  const [
    userLogout,
    { data: logoutData, error: logoutError, isSuccess: logoutSuccess },
  ] = useUserLogoutMutation();

  const navigate = useNavigate();

  const url = window.location.pathname;
  const lastWord = url.split("/").pop();

  const [activeTab, setActiveTab] = useState(lastWord);

  //   ----------------------------------------- Logout Functionality -----------------------------------------
  const handleLogout = async () => {
    try {
      await userLogout();
    } catch (error) {
      console.log("Error occur while logout", error);
    }
  };

  useEffect(() => {
    if (logoutData && logoutSuccess) {
      toast.success(logoutData.message || "Logout Successfully");
      navigate("/");
    }

    if (logoutError) {
      toast.error("Failed to logout");
    }
  }, [logoutData, logoutError, logoutSuccess]);

  return (
    <div className="hidden md:w-4/10 lg:w-3/10 xl:w-2/10 border-1 py-5 px-4 md:flex flex-col h-screen justify-between sticky top-0">
      <div>
        {/* Logo */}

        <Link to={"/"} className="flex items-center">
          <img src={logoAssets.logo} alt="logo" className="size-10" />
          <h2 className="ml-2 font-bold text-primary text-3xl">Edu</h2>
          <h2 className="font-bold text-primary text-3xl">Vista</h2>
        </Link>

        {/* Horizontal line */}

        {/* Instructor Category */}
        <div className="mt-20 flex flex-col gap-y-5">
          <span
            className={`flex items-center gap-x-2 text-md font-medium course-pointer ${
              activeTab === "dashboard" ? "text-primary" : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <MdSpaceDashboard className="text-xl" />
            <Link to={`/instructor/${instructorId}/dashboard`}>Dashboard</Link>
          </span>
          <hr className="bg-slate-300 h-[.1px] border-0" />
          <span
            className={`flex items-center gap-x-2 text-md font-medium course-pointer  ${
              activeTab === "course" ? "text-primary" : ""
            }`}
            onClick={() => setActiveTab("course")}
          >
            <MdTopic className="text-xl" />
            <Link to={`/instructor/${instructorId}/course`}>Courses</Link>
          </span>
          <hr className="bg-slate-300 h-[.1px] border-0" />
        </div>
      </div>
      <div>
        <button className="btn" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
