import React, { useState } from "react";
import { SearchInput } from "./SearchInput";
import { CheckTable } from "./CheckTable";

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
        <SearchInput handleSearchTerm={handleSearchTerm} />
        {
          cheques && <CheckTable cheques={cheques} searchTerm={searchTerm} />
        }
      </div>
    </div>
  );
};
