import React from "react";
import { useCapturePaymentMutation } from "../../features/apis/purchaseApi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

// const RAZORPAY_KEY_ID = "rzp_test_hvnSUZERvfIugJ";
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_ID;

// const VERIFY_PAYMENT_API =
//   "http://localhost:5000/api/v1/purchase/verified-payment";

const VERIFY_PAYMENT_API =
  "https://lms-server-i8kl.onrender.com/api/v1/purchase/verified-payment";

const PayButton = ({ purchased, courseId, creator }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // ------------------------------ Capture Payment And Verify Payment ----------------------------------------
  const [
    capturePayment,
    { data: capturePaymentData, isLoading: capturePaymentLoading },
  ] = useCapturePaymentMutation();

  const buyCourseHandler = async () => {
    const response = await capturePayment(courseId);
    // console.log("response ", response);

    verifyPaymentHandler(response.data.response);
  };

  const handlePaymentResponse = async (response, notes, amount) => {
    // console.log("payment done response", response);
    // console.log("notes", notes);
    // console.log("amount", amount);
    try {
      const resp = await axios.post(VERIFY_PAYMENT_API, {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpaySignature: response.razorpay_signature,
        courseId: notes.courseId,
        userId: notes.userId,
        amount: amount,
      });
      if (resp.data.success) {
        // console.log("Payment verified successfully!");
        toast.success("Payment verified successfully!");
        navigate("/my-learning");
      }
    } catch (error) {
      console.error(
        "Error occurred while verifying payment:",
        error.response.data.message
      );
      toast.error(error.response.data.message);
    }
  };

  const verifyPaymentHandler = async (data) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      handler: (response) =>
        handlePaymentResponse(response, data.notes, data.amount), // Pass the callback function here
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // ---------------------------------------------- CONTINUE COURSE -----------------------------------------
  const continueCourse = () => {
    navigate(`/course-progress/${courseId}`);
  };

  return (
    <>
      {user?.role === "instructor" ? (
        <>
          {creator === user?._id ? (
            <>
              <Link to={`/instructor/${creator}/dashboard`}>
                <button className="btn w-full">Edit Course</button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {purchased ? (
            <>
              <button
                className="btn bg-green-400 w-full text-base"
                onClick={() => continueCourse()}
              >
                Continue Course
              </button>
            </>
          ) : (
            <>
              <button
                className="btn bg-green-400 w-full text-base"
                onClick={() => buyCourseHandler()}
              >
                Buy Course
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PayButton;
