import React from "react";
import { noInternetAssets } from "../../data/image-data";

const Offline = () => {
  return (
    <div className="my-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto xl:w-5xl flex flex-col items-center justify-center text-center gap-y-5">
        <h1 className="text-5xl  md:text-7xl lg:text-9xl  text-primary">
          Whoops!
        </h1>
        <p className="text-primary-dark text-base w-9/10 sm:max-w-2/4">
          No Internet connection. Please check your network settings and try
          again.
        </p>
        <div>
            <img src={noInternetAssets.noInternetImage} alt="no internet" className="w-3xl h-auto"/>
        </div>
      </div>
    </div>
  );
};

export default Offline;
