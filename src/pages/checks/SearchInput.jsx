import React from 'react'
import { BsSearch } from "react-icons/bs";

export const SearchInput = ({handleSearchTerm}) => {
    
    const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    handleSearchTerm(newSearchTerm); // Llama a la función pasada desde ListTab
    }
  return (
    <div className="flex flex-col h-full rounded-lg border border-transparent bg-bgray-100 pl-4 focus-within:border-success-300 dark:bg-darkblack-500 sm:block sm:w-70 lg:w-88">

    <div className="flex items-center">
      <span className="mr-4">
        <BsSearch className="text-bgray-500 dark:text-bgray-400" />
      </span>
        <input
          type="number"
          id="listSearch"
          placeholder="Numero de cheque"
          className=" w-full border-none bg-bgray-100 px-0 text-sm tracking-wide text-bgray-600 placeholder:text-sm placeholder:font-medium placeholder:text-bgray-500 focus:outline-none focus:ring-0 dark:bg-darkblack-500 rounded-lg"
          onChange={handleSearch}
        />
    </div>
    </div>
  )
}


{/* <div className='flex flex-col mt-6'>
        <div className='flex flex-row justify-center items-center'>
            <div className='flex flex-col w-1/4 mx-3'>
                <label htmlFor="" className='ml-1 mb-1 dark:text-white'>Numero de cheque</label>
                <input type="text" className='border border-gray-300 rounded-md '/>
            </div>
            <div className='flex flex-col w-1/4 mx-3'>
                <label htmlFor="" className='ml-1 mb-1 dark:text-white'>Numero de cheque</label>
                <input type="text" className='border border-gray-300 rounded-md '/>
            </div>
            <div className='flex flex-col w-1/4 mx-3'>
                <label htmlFor="" className='ml-1 mb-1 dark:text-white'>Numero de cheque</label>
                <input type="text" className='border border-gray-300 rounded-md '/>
            </div>
        </div>
        
    </div> */}