import React, { useEffect } from "react";
import { logoAssets } from "../../../data/image-data";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../../../features/apis/authApi";
import { toast } from "react-toastify";

const AdminNav = () => {
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
    <div className="border-b-1 border-slate-300 pb-10 pt-5 flex flex-col gap-y-5">
      <div className="flex justify-between">
        <Link to={"/"} className="flex items-center">
          <img src={logoAssets.logo} alt="logo" className="size-8 sm:size-10" />
          <h2 className="ml-2 font-bold text-primary text-2xl sm:text-3xl">
            Edu
          </h2>
          <h2 className="font-bold text-primary text-2xl sm:text-3xl">Vista</h2>
        </Link>
        <button type="btn" className="btn" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      <div className="flex justify-center">
        <span className="bg-secondary text-primary px-5 py-2 font-bold text-xl sm:text-2xl text-center">
          ADMIN DASHBOARD
        </span>
      </div>
    </div>
  );
};

export default AdminNav;
