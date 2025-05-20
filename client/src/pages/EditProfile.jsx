import React, { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useLoadUserQuery,
  useUpdateUserProfileMutation,
} from "../features/apis/authApi";
import { useSelector } from "react-redux";

import {
  instructorProfession,
  instructorExperience,
} from "../data/instructors-data";

const EditProfile = () => {
  const [updateUser, setUpdateUser] = React.useState({
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    about: "",
    experience: "",
    profession: "",
  });
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // ---------------------------- Calling RTK Hook ----------------------------

  const { data: userData, isSuccess: userDataSuccess } = useLoadUserQuery();
  const userProfile = userData?.response?.additionalDetails;

  // console.log("userProfile", userProfile);

  // ---------------------------- Handle Input Change ----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser({ ...updateUser, [name]: value });
  };

  // ---------------------------- Calling RTK Hook ----------------------------
  const [
    updateUserProfile,
    {
      data: userUpdateData,
      isError: userUpdateError,
      isLoading: userUpdateLoading,
      isSuccess: userUpdateSuccess,
    },
  ] = useUpdateUserProfileMutation();
  // console.log("userUpdateData", userUpdateData);

  // ---------------------------- Handle Form Submit ----------------------------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("updateUser", updateUser);

    // Check contact number length
    if (updateUser.contactNumber.length > 0) {
      if (updateUser.contactNumber.length < 10) {
        toast.error("Contact number must be 10 digits long.");
        return;
      } else if (updateUser.contactNumber.length > 10) {
        toast.error("Contact number must be 10 digits long.");
        return;
      }
    }

    await updateUserProfile({
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      gender: updateUser.gender,
      contactNumber: updateUser.contactNumber,
      about: updateUser.about,
      experience: updateUser.experience,
      profession: updateUser.profession,
    });
  };

  useEffect(() => {
    if (userUpdateData && userUpdateData) {
      toast.success("Profile updated successfully.");
      navigate("/profile");
    }

    if (userUpdateError) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [userUpdateData, userUpdateError, userUpdateSuccess]);

  // Prefill form when user data is successfully loaded
  useEffect(() => {
    if (userDataSuccess && userProfile) {
      setUpdateUser({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        gender: userProfile.gender || "",
        contactNumber: userProfile.contactNumber || "",
        about: userProfile.about || "",
        experience: userProfile.experience || "",
        profession: userProfile.profession || "",
      });
    }
  }, [userDataSuccess, userProfile]);

  return (
    <>
      <Navbar />
      <div className="my-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto xl:w-5xl flex flex-col gap-y-10">
          <h2>Update Profile :</h2>
          <form
            action=""
            onSubmit={(e) => handleFormSubmit(e)}
            className="flex flex-col gap-y-10"
          >
            {/*----------------------------------- First name and last name -----------------------------------*/}
            <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 gap-y-5">
              <div className="flex flex-col  gap-y-2 w-full md:w-4/10">
                <label className="text-secondary-dark">
                  First Name <sup className="text-red-400 text-sm">*</sup>{" "}
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ex: Sarvajeet"
                  className="bg-slate-200 text-md px-3 py-2 font-medium outline-0"
                  value={updateUser.firstName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="flex flex-col  gap-y-2 w-full md:w-4/10">
                <label className="text-secondary-dark">
                  Last Name <sup className="text-red-400 text-sm">*</sup>
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Ex: Shah"
                  className="bg-slate-200 text-md px-3 py-2 font-medium outline-0"
                  value={updateUser.lastName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
            </div>

            {/* ------------------------------- gender and  contact number --------------------------------*/}
            <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 gap-y-5">
              <div className="flex flex-col  gap-y-2  w-full md:w-4/10">
                <label>Gender</label>
                <select
                  name="gender"
                  value={updateUser.gender}
                  className="bg-slate-200 text-md px-3 py-2 font-medium outline-0"
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">Ex: Male</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="flex flex-col  gap-y-2  w-full md:w-4/10">
                <label>Phone Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  placeholder="Ex: 9874563210"
                  className="bg-slate-200 text-md px-3 py-2 font-medium outline-0"
                  value={updateUser.contactNumber}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>

            {/* -------------------------------- Experience And Profession ----------------------------- */}
            {user.role === "instructor" && (
              <>
                <div className="flex flex-col md:flex-row md:justify-between md:gap-y-0 gap-y-5">
                  <div className="flex flex-col  gap-y-2  w-full md:w-4/10">
                    <label>Experience</label>
                    <select
                      name="experience"
                       value={updateUser.experience}
                      className="bg-slate-200 text-md px-3 py-2 font-medium outline-0"
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">Experience</option>
                      {instructorExperience.map((experience) => (
                        <option key={experience} value={experience}>
                          {experience}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col  gap-y-2  w-full md:w-4/10">
                    <label>Profession</label>
                    <select
                      name="profession"
                       value={updateUser.profession}
                      className="bg-slate-200 text-md px-3 py-2 font-medium outline-0"
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="">Profession</option>
                      {instructorProfession.map((profession) => (
                        <option key={profession} value={profession}>
                          {profession}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/*----------------------------------------- about ----------------------------------------------- */}
            <div className="flex flex-col gap-y-2 w-full">
              <label>About</label>
              <textarea
                name="about"
                placeholder="Write about yourself here..."
                className="bg-slate-200 text-md px-3 py-2 font-medium max-h-96 overflow-y-auto outline-0 min-h-50"
                value={updateUser.about}
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </div>

            <div className="flex justify-end gap-x-5">
              <Link to={"/profile"}>
                <button
                  type="button"
                  className="btn border-1 border-slate-300 text-black bg-transparent"
                >
                  Cancel
                </button>
              </Link>

              <button type="submit" className="btn">
                {userUpdateLoading? "Saving...": "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
