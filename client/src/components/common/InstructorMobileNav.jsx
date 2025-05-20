import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoAssets } from "../../data/image-data";
import { useUserLogoutMutation } from "../../features/apis/authApi";
import { toast } from "react-toastify";

const InstructorMobileNav = () => {
  const url = window.location.pathname;
  const lastWord = url.split("/").pop();
  const [activeTab, setActiveTab] = useState(lastWord);

  // -------------------------------------- Logout --------------------------------------
  const navigate = useNavigate();
  const [
    userLogout,
    { data: logoutData, error: logoutError, isSuccess: logoutSuccess },
  ] = useUserLogoutMutation();


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
    <div className="flex justify-between">
      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <img src={logoAssets.logo} alt="logo" className="size-10" />
      </Link>

      {/* Instructor Category */}

      <div className="flex gap-x-2 items-center">
        <span
          className={`flex items-center gap-x-1 text-sm font-medium course-pointer ${
            activeTab === "dashboard" ? "text-primary" : ""
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <Link to={"/instructor/dashboard"}>Dashboard</Link>
        </span>

        <span
          className={`flex items-center gap-x-1 text-sm font-medium course-pointer  ${
            activeTab === "course" ? "text-primary" : ""
          }`}
          onClick={() => setActiveTab("course")}
        >
          <Link to={"/instructor/course"}>Courses</Link>
        </span>
        <span>
          <button
            className="btn bg-white text-black border-slate-300 border-2 rounded-sm "
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </span>
      </div>
    </div>
  );
};

export default InstructorMobileNav;
