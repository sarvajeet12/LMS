import React from "react";
import { Link } from "react-router-dom";

const ParallaxEffect = () => {
  return (
    <div className="relative h-screen flex items-center justify-center ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1676422355165-d809008b8342?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 p-5 border-1 border-dashed text-white flex flex-col items-center gap-y-10 text-center py-10">
          <h3 className="font-medium">EduSphere</h3>
          <h1>Learn Anything, Anytime, Anywhere </h1>
          <Link to={"/login"}>
            <button type="button" className="btn">
              Learn
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParallaxEffect;
