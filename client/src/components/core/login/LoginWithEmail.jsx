import React, { useEffect, useState } from "react";
import { useSendOtpMutation } from "../../../features/apis/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userSendOtp } from "../../../features/authSlice";

const LoginWithEmail = ({ role }) => {
  // State
  const [email, setEmail] = useState("");

  // Dispatch
  const dispatch = useDispatch();

  // Auth api
  const [sendOtp, { isLoading: sendOtpIsLoading }] = useSendOtpMutation();

  // Handler
  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await sendOtp({
        email: email,
        role: role.toLowerCase(),
      });
      // console.log("response", response);

      if (response.error) {
        toast.error(response.error.data.message);
        return;
      }

      dispatch(
        userSendOtp({
          email: response.data.response.email,
          role: role.toLowerCase(),
        })
      );
      setEmail("");
      // toast
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error occur while sending otp", error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-y-10 w-full"
        onSubmit={(e) => handleUserLogin(e)}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          className="border-slate-300 border-1 h-12 px-2 outline-0 w-full"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="submit"
          value={sendOtpIsLoading ? "Loading..." : "Login"}
          className="btn w-25"
        />
      </form>
    </>
  );
};

export default LoginWithEmail;
