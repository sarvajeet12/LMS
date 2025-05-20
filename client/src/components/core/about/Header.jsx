import React from "react";

const Header = () => {
  return (
    <div className="bg-primary text-white py-10 mt-15 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <div className="border-dashed border-1 border-white py-25 rounded-2xl">
          <span className="text-xl sm:text-2xl bg-secondary px-3 sm:px-5 py-2 rounded-4xl">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl mt-10">
            Unlock Your Future with Online Learning
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
