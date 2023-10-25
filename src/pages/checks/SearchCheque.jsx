import React, { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { CheckTable } from "./CheckTable";
import PaginationV1 from "../../component/Pagination/PaginationV1";
import { list } from "postcss";

export const SearchCheque = ({ cheques }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDrawer, setSearchDrawer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState([]);
  const [filteredChecks, setFilteredChecks] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [checkList, setCheckList] = useState([]);
  const [maxChecks, setMaxChecks] = useState(30);

  const filterByDrawer = (check) => {
    if(cheques){
      const filtered = cheques.filter((check) => {
        return check.drawer && check.drawer.includes(searchDrawer.toLocaleUpperCase());
      });
      setFilteredChecks(filtered);
    }
  };

  const filterByDate = (check) => {
    if(cheques){
      const filtered = cheques.filter((check) => {
        return check.expiredDate && check.expiredDate.includes(searchDate);
      });
      setFilteredChecks(filtered);
    }
  };

  const filterByNumber = () => {
    if (cheques) {
      const filtered = cheques.filter((check) => {
        console.log(check)
        return check.chequeNumber && check.chequeNumber.includes(searchTerm);
      });
      setFilteredChecks(filtered);
    }
  };

  const resetForm = () => {
    setSearchTerm("");
    setSearchDate("");
    setSearchDrawer("");
  }
  
  useEffect(() => {
    filterByNumber();
  }, [searchTerm]);
  
  useEffect(() => {
    filterByDate();
  }
  , [searchDate]);

  useEffect(() => {
    filterByDrawer();
  }
  , [searchDrawer]);

  function dividirArrayEnListas(array, elementosPorLista) {
    const listas = [];
    for (let i = 0; i < array.length; i += elementosPorLista) {
      const lista = array.slice(i, i + elementosPorLista);
      listas.push(lista);
    }
    return listas;
  }

  const listasDeCheques = dividirArrayEnListas(filteredChecks, maxChecks);


  const handleSearchTerm = (term) => {
    if (!term) {
      setFilteredChecks([]);
      setTotalPages(0);
      setPagesLength([]);
      setCheckList([]);
    } else {
      setCurrentPage(1);
    }
    setSearchTerm(term);
  };

  const handleSearchDate = (date) => {
    if (!date) {
      setFilteredChecks([]);
      setTotalPages(0);
      setPagesLength([]);
      setCheckList([]);
    } else {
      setCurrentPage(1);
    }
    setSearchDate(date);
  };

  const handleSearchDrawer = (drawer) => {
    if (!drawer) {
      setFilteredChecks([]);
      setTotalPages(0);
      setPagesLength([]);
      setCheckList([]);
    } else {
      setCurrentPage(1);
    }
    setSearchDrawer(drawer.toUpperCase());
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleMaxChecks = (max) => {
    setMaxChecks(max);
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-darkblack-400 mt-6 dark:text-slate-200">
          Buscar cheques
        </h2>
      </div>
      <div className="w-full my-8">
        <SearchInput
          handleSearchTerm={handleSearchTerm}
          inputType={"number"}
          placeholder="Número de Cheque"
          searchValue={searchTerm}
        />
        <SearchInput
          handleSearchTerm={handleSearchDate}
          inputType={"Date"}
          placeholder="Fecha"
          searchValue={searchDate}
        />
        <SearchInput
          handleSearchTerm={handleSearchDrawer}
          inputType={"text"}
          placeholder="Propietario"
          searchValue={searchDrawer}
        />
        <div className="w-full flex justify-center items-center ">
          <button className="my-2 lg:w-3/4 bg-yellow-300 py-2 rounded-md"
          onClick={resetForm}>
            RESETEAR FILTROS
          </button>
        </div>
        {cheques && (
          <CheckTable
            totalPages={pagesLength.length}
            checkList={checkList}
            filteredChecks={filteredChecks}
            cheques={cheques}
            searchTerm={searchTerm}
            formatDate={formatDate}
          />
        )}
      </div>
    </div>
  );
};
