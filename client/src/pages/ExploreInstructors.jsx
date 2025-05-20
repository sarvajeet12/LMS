import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import InstructorList from "../components/core/Instructor/InstructorList";

const ExploreInstructors = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <Navbar />
      <div className="bg-primary text-white py-10 mt-15 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <div className="border-dashed border-1 border-white py-15 rounded-2xl flex flex-col items-center px-2">
            <span className="text-xl sm:text-2xl bg-secondary px-3 sm:px-5 py-2 rounded-4xl">
              Our Instructors
            </span>
            <h1 className="text-4xl md:text-5xl mt-10">
              Unlock your future with expert guidance
            </h1>
            <form
              action=""
              className="w-full text-center flex flex-col items-center md:flex-row  gap-y-5 md:justify-center mt-5 md:mt-10"
            >
              <input
                type="text"
                placeholder="Search for instructors"
                className="border-1 border-slate-300 w-full md:w-7/10 lg:w-1/2 px-5 h-10 outline-0 md:rounded-bl-3xl md:rounded-tl-3xl md:rounded-br-3xl md:rounded-tr-3xl
              rounded-3xl bg-white text-black text-center"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>

      {/* Instructors Area */}
      <InstructorList searchTerm={searchTerm} />
      <Footer />
    </>
  );
};

export default ExploreInstructors;
