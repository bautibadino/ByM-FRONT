import React, { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { CheckTable } from "./CheckTable";
import PaginationV1 from "../../component/Pagination/PaginationV1";

export const SearchCheque = ({ cheques }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDrawer, setSearchDrawer] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState([]);
  const [filteredChecks, setFilteredChecks] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [checkList, setCheckList] = useState([]);
  const [maxChecks , setMaxChecks] = useState(30);

  useEffect(() => {
    if (cheques) {
      const ChecksFiltered = cheques.filter((check) => {
        return (
          check.chequeNumber && // Verificar si chequeNumber está definido
          check.chequeNumber.includes(searchTerm) 
          // check.date && // Verificar si date está definido
          // check.date.includes(searchDate) &&
          // check.drawer && // Verificar si drawer está definido
          // check.drawer.includes(searchDrawer.toUpperCase)
        );
      });

      setFilteredChecks(ChecksFiltered);
      setTotalPages(Math.ceil(ChecksFiltered.length / Math.max(1, maxChecks)));
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPagesLength(pages);
    }
  }, [searchTerm, searchDate, searchDrawer, cheques]);

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
    setSearchDrawer(drawer);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const handleMaxChecks = (max) => {
    setMaxChecks(max);
  };

  useEffect(() => {
    setCheckList(listasDeCheques[currentPage - 1]);
  }, [currentPage, filteredChecks]);
  console.log("SearchTerm:", searchTerm);
console.log("SearchDate:", searchDate);
console.log("SearchDrawer:", searchDrawer);
console.log("FilteredChecks:", filteredChecks);
console.log("Cheques:", cheques);

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-darkblack-400 mt-6 dark:text-slate-200">
          Buscar cheques
        </h2>
      </div>
      <div className="w-full my-8">
        <SearchInput handleSearchTerm={handleSearchTerm} inputType={'number'} placeholder="Número de Cheque" />
        <SearchInput handleSearchTerm={handleSearchDate} inputType={'Date'} placeholder="Fecha" />
        <SearchInput handleSearchTerm={handleSearchDrawer} inputType={'text'} placeholder="Propietario" />
        {cheques && (
          <CheckTable
            totalPages={pagesLength.length}
            checkList={checkList}
            filteredChecks={filteredChecks}
            cheques={cheques}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};
