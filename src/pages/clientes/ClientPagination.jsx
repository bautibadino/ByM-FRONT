import PaginationV2 from "../../component/Pagination/PaginationV2";



const ClientPagination = ({pagesQuantity, handlePrevPage, handleNextPage,currentPage, handleFirstPage, handleLastPage}) => {  

  return (
    <div className="pagination-content w-full">
      <div className="flex w-full items-center justify-center lg:justify-between">
        {/* <PaginationV1 /> */}
        <PaginationV2
          pagesQuantity={pagesQuantity}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
          />
      </div>
    </div>
  );
}

export default ClientPagination;
