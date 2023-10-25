import React from "react";
import { BsSearch } from "react-icons/bs";

export const SearchInput = ({ handleSearchTerm, placeholder, inputType, searchValue}) => {
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    handleSearchTerm(newSearchTerm); // Llama a la función pasada desde ListTab
  };

  return (
    <div className="w-full flex justify-center items-center">

      <div className="flex flex-col h-full w-full rounded-lg border border-transparent bg-bgray-100 pl-4 focus-within:border-success-300 dark:bg-darkblack-500 sm:block my-2 lg:w-3/4">
        <div className="flex items-center">
          <span className="mr-4">
            <BsSearch className="text-bgray-500 dark:text-bgray-400" />
          </span>
          <input
            type={inputType}
            id="listSearch"
            placeholder={placeholder}
            className=" w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-bgray-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500 rounded-lg"
            onChange={handleSearch}
            value={searchValue}
          />
        </div>
      </div>

    </div>
  );
};
