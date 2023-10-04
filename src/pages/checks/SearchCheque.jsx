import React, { useState } from "react";
import { CheckSearch } from "./CheckSearch";

export const SearchCheque = ({ cheques }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (term) => {
    setSearchTerm(term);
  };


  return (
    <div className="flex flex-col px-4">
      <h2 className="text-2xl font-semibold text-darkblack-400 mt-6 dark:text-slate-200">
        Buscar cheques
      </h2>
      <div className="w-full my-8">
        <CheckSearch handleSearchTerm={handleSearchTerm} />
        <div className="flex flex-col mt-6">
          <div className="flex flex-row items-center justify-around w-full mb-6 dark:text-white">
            <div className="w-1/3 text-center font-bold text-lg">
              <span>Numero</span>
            </div>
            <div className="w-1/3 text-center font-bold text-lg">
              <span>Monto</span>
            </div>
            <div className="w-1/3 text-center font-bold text-lg">
              <span>Vencimiento</span>
            </div>
          </div>
          <ul className="w-full">
            {
                cheques?.map((cheque) => {
                    return (
                        <li className="flex flex-row items-center justify-around w-full mb-6 dark:text-white">
                            <div className="w-1/3 text-center font-bold text-lg">
                                <span>{cheque.chequeNumber}</span>
                            </div>
                            <div className="w-1/3 text-center font-bold text-lg">
                                <span>$ {cheque.amount}</span>
                            </div>
                            <div className="w-1/3 text-center font-bold text-lg">
                                <span>{cheque.expiredDate}</span>
                            </div>
                        </li>
                    )
                }
                )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};
