import React, { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { CheckTable } from "./CheckTable";
import PaginationV1 from "../../component/Pagination/PaginationV1";
import { list } from "postcss";

export const SearchCheque = ({ cheques }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchDrawer, setSearchDrawer] = useState("");
  const [pagesLength, setPagesLength] = useState([]);
  const [filteredChecks, setFilteredChecks] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [checkList, setCheckList] = useState([]);
  const [maxChecks, setMaxChecks] = useState(30);
  const [checkStatus, setCheckStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [listasDeCheques, setListasDeCheques] = useState([])

  const addTotalAmount = () => {
    let total = 0;
    filteredChecks.forEach((check) => {
      total += check.amount;
    });
    setTotalAmount(total);
  };
  const filterByDate = () => {
    if (cheques) {
      const filtered = cheques.filter((check) => {
        return check.expiredDate && check.expiredDate.includes(searchDate);
      });
      setFilteredChecks(filtered);
    }
  };

  const filterByNumber = () => {
    if (cheques) {
      const filtered = cheques.filter((check) => {
        return check.chequeNumber && check.chequeNumber.includes(searchTerm);
      });
      setFilteredChecks(filtered);
    }
  };

  const filterByStatus = () => {
    if (cheques) {
      const filtered = cheques.filter((check) => {
        return check.status && check.status.includes(checkStatus);
      });
      setFilteredChecks(filtered);
    }
  };

  const resetForm = () => {
    setSearchTerm("");
    setSearchDate("");
    setSearchDrawer("");
    setCheckStatus("");
  };

  function dividirArrayEnListas(array, elementosPorLista) {
    const listas = [];
    for (let i = 0; i < array.length; i += elementosPorLista) {
      const lista = array.slice(i, i + elementosPorLista);
      console.log(listas)
      listas.push(lista);
    }

    setListasDeCheques(listas)
  }


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

  const handleStatusFilter = (status) => {
    setCheckStatus(status);
  };
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };
  const handleMaxChecks = (max) => {
    setMaxChecks(max);
  };

  useEffect(() => {
    dividirArrayEnListas(filteredChecks, maxChecks);
  }, [maxChecks, filteredChecks]);
  useEffect(() => {
    addTotalAmount();
  }, [filteredChecks]);

  useEffect(() => {
    filterByStatus();
  }, [checkStatus]);

  useEffect(() => {
    filterByNumber();
  }, [searchTerm]);

  useEffect(() => {
    filterByDate();
  }, [searchDate]);

  useEffect(() => {
    filterByDrawer();
  }, [searchDrawer]);

  useEffect(() => {
    cheques ? setFilteredChecks(cheques) : setFilteredChecks([]);
  }, [cheques]);

  useEffect(() => {
    if (listasDeCheques.length > 0) {
      const pages = [];
      for (let i = 1; i <= listasDeCheques.length; i++) {
        pages.push(i);
      }
      setPagesLength(pages);
    }
  }, [listasDeCheques]);

  const filterByDrawer = (check) => {
    if (cheques) {
      const filtered = cheques.filter((check) => {
        return (
          check.drawer &&
          check.drawer.includes(searchDrawer.toLocaleUpperCase())
        );
      });
      setFilteredChecks(filtered);
    }
  };

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-row justify-between">
        <div className="">
          <h2 className="text-2xl font-semibold text-darkblack-400 mt-6 dark:text-slate-200">
            Buscar cheques
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center mt-2">
        <div className="flex flex-col justify-center items-center">
          <label className="text-sm mb-1" htmlFor="maxChecks">
            Cantidad de cheques por página:
          </label>
          <select 
          className="border-none rounded-md w-3/4"
          name="maxChecks" id="" onChange={(e) => {
            handleMaxChecks(e.target.value)
          }
          }>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="flex flex-col justify-end items-center mt-2">
          <label className="text-sm mb-1" htmlFor="statusFilter">
            Filtra por el estado de tu cheque:
          </label>
          <select
            className="border-none rounded-md"
            name="statusFilter"
            id=""
            onChange={(e) => {
              handleStatusFilter(e.target.value);
            }}
          >
            <option value="">TODOS</option>
            <option value="PENDING">EN CARTERA</option>
            <option value="DELIVERED">ENTREGADO</option>
            <option value="COLLECTED">COBRADO</option>
            <option value="DEPOSITED">DEPOSITADO</option>
          </select>
        </div>
        </div>
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
          <button
            className="my-2 lg:w-3/4 bg-yellow-300 py-2 rounded-md"
            onClick={resetForm}
          >
            RESETEAR FILTROS
          </button>
        </div>
        {cheques && (
          <CheckTable
            checkList={checkList}
            filteredChecks={filteredChecks}
            cheques={cheques}
            searchTerm={searchTerm}
            listasDeCheques={listasDeCheques}
            currentPage={currentPage}
          
          />
        )}
      </div>
      <div className="w-full my-5 flex justify-center items-center flex-col">
        <span>Monto de cheques en la búsqueda:
        </span>
        <span className="text-2xl font-semibold">${totalAmount}</span>
      </div>
      <div>
        <PaginationV1 
        currentPage= {currentPage}
        totalPages= {pagesLength}
        handleCurrentPage={handleCurrentPage}
        />

      </div>
    </div>
  );
};
