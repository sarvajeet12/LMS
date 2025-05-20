import React, { useEffect } from "react";
import { logoAssets } from "../../data/image-data";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserLogoutMutation } from "../../features/apis/authApi";
import { toast } from "react-toastify";
import { motion, useScroll } from "motion/react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  // Framer Motion
  const scrollYProgress = useScroll().scrollYProgress;

  const [
    userLogout,
    { data: logoutData, error: logoutError, isSuccess: logoutSuccess },
  ] = useUserLogoutMutation();

  const navigate = useNavigate();

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
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm ">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8  md:h-20 h-16">
        {/* Framer Motion */}
        <motion.div
          className="bg-secondary w-full h-1.5 fixed top-0 left-0 origin-left"
          style={{
            scaleX: scrollYProgress,
          }}
        ></motion.div>
        {/* logo */}

        <Link to={"/"} className="flex items-center">
          <img src={logoAssets.logo} alt="logo" className="size-10" />
          <h2 className="ml-2 font-medium text-2xl">Edu</h2>
          <h2 className="font-medium text-2xl">Vista</h2>
        </Link>

        {
          !user ? (
            <>
              <Link to={"/login"}>
                <button className="btn">Login/Register</button>
              </Link>
            </>
          ) : (
            <>
              <div className="p-4 cursor-pointer relative group">
                <div className="size-10 rounded-full ">
                  <img
                    src={user?.photoUrl}
                    alt="user"
                    className="size-10 rounded-full"
                  />
                </div>
                <div className="border-1 border-slate-300 w-70 absolute right-0 top-18 md:top-18 p-4 flex-col gap-5 bg-white rounded-sm text-secondary-dark hidden group-hover:flex">
                  {user?.role === "instructor" ? (
                    <Link
                      to={"/my-learning"}
                      className="hover:text-primary-dark"
                    >
                      Courses
                    </Link>
                  ) : (
                    user?.role === "student" && (
                      <Link
                        to={"/my-learning"}
                        className="hover:text-primary-dark"
                      >
                        My Learning
                      </Link>
                    )
                  )}

                  <Link to={"/profile"} className="hover:text-primary-dark">
                    Profile
                  </Link>
                  <Link
                    className="hover:text-primary-dark"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Link>
                  {user?.role === "instructor" && (
                    <Link
                      to={`/instructor/${user._id}/dashboard`}
                      className=" bg-primary text-white text-center py-1.5 text-sm rounded-sm"
                    >
                      Instructor Dashboard
                    </Link>
                  )}

                  {user?.role === "admin" && (
                    <Link
                      to={"/admin/dashboard"}
                      className=" bg-primary text-white text-center py-1.5 text-sm rounded-sm"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) //
        }
      </div>
    </nav>
  );
};

export default Navbar;
