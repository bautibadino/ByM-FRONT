import { useState } from "react";
import { BsSearch } from "react-icons/bs";

// import BsSearch from "react-icons/bs";
function Search({ onSearchChange }) {
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    onSearchChange(newSearchTerm); // Llama a la función pasada desde ListTab
  };
  

  return (
    <div className="flex flex-row h-full rounded-lg border border-transparent bg-bgray-100 px-[18px] focus-within:border-success-300 dark:bg-darkblack-500 sm:block sm:w-70 lg:w-88">
      <div className="flex h-full w-full items-center space-x-[15px]">
        <span>
          <BsSearch className="text-bgray-500 dark:text-bgray-400" />
        </span>
        <label htmlFor="listSearch" className="w-full">
          <input
            type="text"
            id="listSearch"
            placeholder="Nombre de cliente/empresa"
            className="search-input w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-bgray-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500"
            onChange={handleSearch}
          />
        </label>
      </div>
    </div>

  );
}

export default Search;