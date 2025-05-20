import React from "react";
import HelperComp from "./HelperComp";
import { helper } from "../../../data/helper-data";

const Helper = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 sm:px-6 lg:px-8 mt-10">
      <HelperComp heading={helper.helperHeading1} para={helper.helperPara1} />
      <HelperComp heading={helper.helperHeading2} para={helper.helperPara2} />
      <HelperComp heading={helper.helperHeading3} para={helper.helperPara3} />
    </div>
  );
};

export default Helper;
