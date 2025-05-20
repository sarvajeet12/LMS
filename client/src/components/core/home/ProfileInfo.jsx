import React from "react";

const ProfileInfo = () => {
  return (
    <div className="flex  flex-col sm:flex-row gap-y-3 gap-x-10 bg-secondary py-8 px-3 rounded-2xl">
      <div className="max-w-4/10">
        <p className="font-bold text-xl size-10 rounded-full bg-amber-200 text-center flex items-center justify-center text-secondary-dark">
          i
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-medium text-black mb-3">Profile Completion Before Accessing Pages</h3>
        <h3 className="italic">Why Fill Out the Profile Form?</h3>
        <h3 className="italic">
          Before exploring our pages, completing your profile form ensures a
          personalized experience tailored to your interests and needs.
        </h3>
      </div>
    </div>
  );
};

export default ProfileInfo;
