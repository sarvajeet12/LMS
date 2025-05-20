import React from "react";

// Course Skeleton
export const Skeleton = () => {
  return (
    <div className="max-w-xs mx-auto space-y-2">
      <div className="w-60 h-50 bg-slate-400 animate-pulse rounded-sm"></div>
      <p className=" bg-slate-400 animate-pulse rounded-md h-4"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-4"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-4"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-4"></p>
    </div>
  );
};

// Course Details Skeleton
export const ProfileSkeleton = () => {
  return (
    <div className="xl:w-5xl mx-auto space-y-2">
      <div className=" h-40 bg-slate-400 animate-pulse rounded-sm"></div>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-20"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
    </div>
  );
};

// Course Details Skeleton
export const CourseListSkeleton = () => {
  return (
    <div>
      <div className=" h-10 bg-slate-400 animate-pulse rounded-sm"></div>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
    </div>
  );
};

// Dashboard Skeleton
export const DashboardSkeleton = () => {
  return (
    <div>
      <div className="flex gap-x-20 ">
        <p className="w-48 bg-slate-400 animate-pulse rounded-md h-28 mt-5"></p>
        <p className="w-48 bg-slate-400 animate-pulse rounded-md h-28 mt-5"></p>
      </div>

      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-70 mt-32"></p>
    </div>
  );
};

// Lecture Skeleton
export const LectureListSkeleton = () => {
  return (
    <div>
      <div className=" h-10 bg-slate-400 animate-pulse rounded-sm"></div>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-10 mt-5"></p>
    </div>
  );
};

// Admin Dashboard Count Skeleton
export const AdminDashboardCountSkeleton = () => {
  return (
    <div className="flex gap-x-10 justify-between ">
      <p className="w-48 bg-slate-400 animate-pulse rounded-md h-28 mt-5"></p>
      <p className="w-48 bg-slate-400 animate-pulse rounded-md h-28 mt-5"></p>
      <p className="w-48 bg-slate-400 animate-pulse rounded-md h-28 mt-5"></p>
    </div>
  );
};

// Course Details Skeleton
export const InstructorSkeleton = () => {
  return (
    <div>
      <div className=" h-50 bg-slate-400 animate-pulse rounded-sm"></div>
      <p className=" bg-slate-400 animate-pulse rounded-md h-3 mt-2"></p>
      <p className=" bg-slate-400 animate-pulse rounded-md h-3 mt-2"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-3 mt-2"></p>
      <p className=" text-gray-500 text-xs bg-slate-400 animate-pulse rounded-md h-3 mt-2"></p>
    </div>
  );
};
