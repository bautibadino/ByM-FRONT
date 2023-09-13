import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
function PaginationV2({
  pagesQuantity,
  handlePrevPage,
  handleNextPage,
  currentPage,
  handleFirstPage,
  handleLastPage,
}) {
  console.log(currentPage);
  return (
    <div className="flex items-center space-x-5 sm:space-x-[35px]">
      <button aria-label="none" type="button" onClick={handlePrevPage}>
        <span>
          <GrFormPreviousLink className="text-xl bg-bgray-400 rounded-sm" />
        </span>
      </button>
      <div className="flex items-center">
        {currentPage === 1 ? null : (
          <button
            aria-label="none"
            type="button"
            className="rounded-lg bg-yellow-100 px-4 py-1.5 text-xs font-bold hover:bg-gradient-to-b hover:from-yellow-300 hover:to-yellow-200 hover:text-bgray-700 text-bgray-600 dark:bg-darkblack-500 dark:text-bgray-600 lg:px-6 lg:py-2.5 lg:text-sm"
            onClick={handleFirstPage}
          >
            1
          </button>
        )}

        <span className="text-sm text-bgray-600 dark:text-darkblack-600 px-3 py-1 rounded-md mx-4 bg-gradient-to-b from-yellow-400 to-yellow-300">
          {currentPage}
        </span>
        <button
          aria-label="none"
          type="button"
          className="rounded-lg bg-yellow-100 px-4 py-1.5 text-xs font-bold hover:bg-gradient-to-b hover:from-yellow-300 hover:to-yellow-200 hover:text-bgray-700 text-bgray-600 dark:bg-darkblack-500 dark:text-bgray-600 lg:px-6 lg:py-2.5 lg:text-sm"
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
