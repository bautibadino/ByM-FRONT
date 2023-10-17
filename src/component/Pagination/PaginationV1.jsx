import { useEffect, useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";

function PaginationV1({ handleCurrentPage, currentPage, pagesLength }) {
  const [active, setActive] = useState(false);

  const handleOnClick = () => {
    setActive(!active);
  };

  const handlePageClick = (page) => {
    handleCurrentPage(page);
    setActive(false); // Cierra la lista al hacer clic en una página
  };
  console.log(pagesLength)
  return (
    <div className="hidden items-center space-x-4 lg:flex">
      <span className="text-sm font-semibold text-bgray-600 dark:text-bgray-50">
        Página a ver:
      </span>
      <div className="relative">
        <button
          aria-label="none"
          onClick={handleOnClick}
          type="button"
          className="flex items-center space-x-6 rounded-lg bg-white border border-bgray-300 px-3 py-2 dark:border-darkblack-400"
        >
          <span className="text-sm font-semibold text-bgray-900 dark:text-bgray-50">
            {currentPage}
          </span>
          <span>
            <BsArrowDownShort className="text-bgray-900 dark:text-bgray-50" />
          </span>
        </button>

        <div
          id="result-filter"
          style={{ display: active ? "block" : "none" }}
          className="absolute right-0 top-14 z-10 hidden w-full overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <ul>
            {pagesLength?.map((page) => (
              <li
                value={page}
                key={page}
                onClick={() => handlePageClick(page)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              >
                {page}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PaginationV1;
