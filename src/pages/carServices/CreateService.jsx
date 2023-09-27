import React, { useEffect, useState } from "react";
import Search from "../../component/forms/Search";
import { BsSearch } from "react-icons/bs";
import { ServicesForm } from "./ServicesForm";


export const CreateService = ({ services }) => {

  
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 ">
      <div className="flex flex-row w-full ">
        <h2 className="text-darkblack-600 text-2xl w-1/4 text-center dark:text-white mb-8">
          Create Service
        </h2>
      </div>
      <div className="flex flex-col justify-center mt-6">
        <ServicesForm
          services={services}
        />
      </div>
    </div>
  );
};
