import React, { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { CheckTable } from "./CheckTable";
import PaginationV1 from "../../component/Pagination/PaginationV1";

export const SearchCheque = ({ cheques }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState([]);
  const [filteredChecks, setFilteredChecks] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [checkList, setCheckList] = useState([]);
  const [maxChecks , setMaxChecks] = useState(20)


  useEffect(() => {
    // Verificar si cheques está definido antes de filtrar y calcular totalPages
    if (cheques) {
      const ChecksFiltered = cheques.filter((check) => {
        return (
          check.chequeNumber && // Verificar si chequeNumber está definido
          check.chequeNumber.includes(searchTerm)
        );
      });
      console.log(searchTerm);
      setFilteredChecks(ChecksFiltered);

      // Calcular totalPages después de haber filtrado los cheques
      setTotalPages(Math.ceil(ChecksFiltered.length / maxChecks));
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPagesLength(pages);
    }
  }, [searchTerm, cheques]);

  // Función para dividir el array en listas más pequeñas
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
    setCurrentPage(1);
    setSearchTerm(term);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const handleMaxChecks = (max) => {
    setMaxChecks(max);
  };

  console.log(`maxChecks: ${maxChecks}`)
  useEffect(() => {
    setCheckList(listasDeCheques[currentPage - 1]);
  }, [currentPage, filteredChecks]);
  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-darkblack-400 mt-6 dark:text-slate-200">
          Buscar cheques
        </h2>
        <div className="w-1/5 flex flex-col items-center justify-center mt-3">
          <label className="text-darkblack-400 dark:text-slate-200 font-semibold">Cheques por pagina:</label>
          <input 
          type="number" 
          className="border border-gray-300 rounded-md w-1/2"
          // onChange={e => handleMaxChecks(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full my-8">
        <SearchInput handleSearchTerm={handleSearchTerm} />
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
