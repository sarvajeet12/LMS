import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserLoginMutation } from "../../../features/apis/authApi";
import { useDispatch, useSelector } from "react-redux";
import { userSendOtp } from "../../../features/authSlice";

const VerifyEmailOtp = () => {
  // States
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // getting email value authSlice
  const email = useSelector((state) => state.auth.email);
  const role = useSelector((state) => state.auth.role);

  // Use dispatch method to remove email value
  const dispatch = useDispatch();

  // Auth api
  const [
    userLogin,
    {
      data: loginData,
      isLoading: loginIsLoading,
      error: loginError,
      isSuccess: loginSuccess,
    },
  ] = useUserLoginMutation();

  // console.log("login data", loginData);

  // Handler
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    await userLogin({ email, otp, role });
  };

  // Effect
  useEffect(() => {
    if (loginData && loginSuccess) {
      toast.success(loginData.message || "Login successful.");
      dispatch(userSendOtp({ email: "" }));
      navigate(`/profile`);
    }

    if (loginError) {
      toast.error(loginError.data.message || "login Failed");
    }
  }, [loginError, loginSuccess]);

  return (
    <form
      action=""
      onSubmit={(e) => handleVerifyEmail(e)}
      className="w-full flex flex-col gap-10 items-center"
    >
      <OTPInput
        value={otp}
        name={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => (
          <input
            {...props}
            placeholder="-"
            className="h-10 border-1 border-slate-300 lg:!w-10 lg:mx-3 md:!w-8 md:mx-2 !w-8 mx-2"
          />
        )}
      />
      <input
        className="btn"
        type="submit"
        value={loginIsLoading ? "Loading..." : "Verify Email"}
      />
    </form>
  );
};

export default VerifyEmailOtp;
