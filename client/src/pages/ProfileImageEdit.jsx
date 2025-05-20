import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateProfileImageMutation } from "../features/apis/authApi";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { logoAssets } from "../data/image-data";

const ProfileImageEdit = () => {
  // STATES

  // In File Upload Text Is Upload
  const [fileName, setFileName] = useState("Upload");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Get Data From Redux
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ---------------------------- Calling Hook -----------------------------------------
  const [
    updateProfileImage,
    {
      data: updateProfileData,
      isLoading: updateProfileLoading,
      isError: updateProfileError,
      isSuccess: updateProfileSuccess,
    },
  ] = useUpdateProfileImageMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await updateProfileImage(formData);

    // console.log("response update", response);

    if (response.error) {
      toast.error(response.error.data.message);
      return;
    }

    toast.success(response.data.message);
    navigate("/profile");
  };

  return (
    <>
      <Navbar />

      {/* Edit Image Area */}
      <div className="mt-30 sm:mt-50 mb-20 sm:mb-30 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto xl:w-5xl flex flex-col gap-y-10 border-1 p-10 border-dashed">
          <div className="flex gap-x-2 items-center">
            <Link
              to={`/profile`}
              className="size-8 sm:size-10 border-2 border-slate-200 flex justify-center items-center rounded-full"
            >
              <IoMdArrowBack className="text-base sm:text-xl" />{" "}
            </Link>
            <h3 className="text-xl sm:text-3xl font-bold">
              Edit Profile Image
            </h3>
          </div>

          {/* -------------------------------- user info (Profile Photo, email and role) ------------------------------ */}
          <div className="flex flex-col md:flex-row gap-x-20 gap-y-10 items-center md:justify-between">
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
              <div className="text-start mt-5 ">
                <form
                  action=""
                  className="flex gap-x-10"
                  onSubmit={handleSubmit}
                >
                  <label
                    htmlFor="profileImage"
                    className="btn border-1 border-slate-300 text-black bg-transparent"
                  >
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      className="hidden"
                      onChange={handleFileChange}
                      required
                    />
                    {fileName}
                  </label>

                  <button className="btn">
                    {updateProfileLoading ? "Loading..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
            {preview ? (
              <img src={preview} className="bg-blue-500 h-50 w-45" />
            ) : (
              <div className="bg-blue-500 h-50 w-45">
                {" "}
                <img src={logoAssets.profileImage} className="h-full w-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfileImageEdit;
