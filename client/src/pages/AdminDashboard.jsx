import React from "react";
import AdminNav from "../components/core/admin/AdminNav";
import UserCount from "../components/core/admin/UserCount";
import InstructorList from "../components/core/admin/InstructorList";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
      {/* ------------------------------------- Admin Navbar -----------------------------------  */}
      <AdminNav />

      {/* ------------------------------------- User Count ------------------------------------------ */}
      <UserCount />

      {/* ------------------------------------- Number Count ------------------------------------------ */}
      <InstructorList />
    </div>
  );
};

export default AdminDashboard;
