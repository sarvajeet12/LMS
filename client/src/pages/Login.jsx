import React, { useState } from "react";
import { loginAssets, logoAssets } from "../data/image-data";
import { Link } from "react-router-dom";
import VerifyEmailOtp from "../components/core/login/VerifyEmailOtp";
import LoginWithEmail from "../components/core/login/LoginWithEmail";
import { useSelector } from "react-redux";

const Login = () => {
  const email = useSelector((state) => state.auth.email);
  const [role, setRole] = useState("Student"); // Default role

  //   Select  role
  const toggleRole = (e) => {
    setRole(e.target.value);
  };

  // Description
  const student = `Unlock knowledge, access courses, track progress, engage in learning, and achieve goals through a seamless, secure login experience.`;

  const instructor = `- Empower students, manage lessons, evaluate performance, foster learning, and streamline teaching with a secure, efficient login gateway.`;

  const admin = `Maintain platform integrity, oversee operations, manage users, enforce security, and optimize system functionality through controlled, secure access.`;

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {/* image */}
      <div className=" w-full lg:w-6/10">
        {role === "Student" ? (
          <img
            src={loginAssets.loginImage}
            alt=""
            className="h-screen w-full"
          />
        ) : role === "Instructor" ? (
          <img
            src={loginAssets.instructorLogin}
            alt=""
            className="h-screen w-full"
          />
        ) : (
          role === "Admin" && (
            <img
              src={loginAssets.adminLogin}
              alt=""
              className="h-screen w-full"
            />
          )
        )}
      </div>

      {/* login form */}
      <div className="flex flex-col justify-center items-center gap-10 px-4 sm:px-6 lg:px-8 lg:w-4/10 w-full lg:py-0 py-20 ">
        <div className="border-1 border-slate-300 w-full flex flex-col justify-center items-center gap-y-10 px-5 sm:px-20 lg:px-4 py-10 rounded-lg shadow-md">
          {/* logo */}
          <>
            <Link to={"/"} className="flex items-center">
              <img src={logoAssets.logo} alt="logo" className="size-10" />
              <h2 className="ml-2 font-bold text-primary text-3xl">Edu</h2>
              <h2 className="font-bold text-primary text-3xl">Vista</h2>
            </Link>
          </>

          {/* create an account */}
          <>
            {email !== "" ? (
              <>
                <p className="text-xl text-primary-dark">Verify Otp</p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-xl text-secondary-dark mb-4">{role} Login</p>
                {role === "Student" ? (
                  <p className="text-center text-sm text-secondary-dark">
                    {student}
                  </p>
                ) : role === "Instructor" ? (
                  <p className="text-center text-sm text-secondary-dark">
                    {instructor}
                  </p>
                ) : (
                  role === "Admin" && (
                    <p className="text-center text-sm text-secondary-dark">
                      {admin}
                    </p>
                  )
                )}
              </div>
            )}
          </>

          {/* input filed */}
          <>
            {email !== "" ? (
              <>
                <VerifyEmailOtp />{" "}
              </>
            ) : (
              <>
                <div>
                  <select
                    id="role"
                    className="btn bg-transparent border-1 border-slate-300 text-black"
                    onChange={toggleRole}
                  >
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <LoginWithEmail role={role} />{" "}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Login;
