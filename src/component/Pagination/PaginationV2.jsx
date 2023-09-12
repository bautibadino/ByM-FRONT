import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
function PaginationV2({
  pagesQuantity,
  handlePrevPage,
  handleNextPage,
  currentPage,
  handleFirstPage,
  handleLastPage,
}) {
  console.log(currentPage)
  return (
    <div className="flex items-center space-x-5 sm:space-x-[35px]">
      <button aria-label="none" type="button" onClick={handlePrevPage}>
        <span>
          <GrFormPreviousLink className="text-xl bg-bgray-400 rounded-sm" />
        </span>
      </button>
      <div className="flex items-center">
        {
          currentPage === 1 ? null : 
          <button
          aria-label="none"
          type="button"
          className="rounded-lg bg-success-50 px-4 py-1.5 text-xs font-bold text-success-300 dark:bg-darkblack-500 dark:text-bgray-50 lg:px-6 lg:py-2.5 lg:text-sm"
          onClick={handleFirstPage}
        >
          1
        </button>
        }
        

        <span className="text-sm text-bgray-500 mx-4">
          {currentPage}
          </span>
        <button
          aria-label="none"
          type="button"
          className="rounded-lg px-4 py-1.5 text-xs font-bold text-bgray-500 transition duration-300 ease-in-out hover:bg-success-50 hover:text-success-300 dark:hover:bg-darkblack-500 lg:px-6 lg:py-2.5 lg:text-sm"
          onClick={handleLastPage}
        >
          {pagesQuantity}
        </button>
      </div>
      <button aria-label="none" type="button" onClick={handleNextPage}>
        <span>
          <GrFormNextLink className="text-xl bg-bgray-400 rounded-sm" />
        </span>
      </button>
    </div>
  );
}

export default PaginationV2;
