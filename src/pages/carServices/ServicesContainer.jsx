import React from "react";
import Search from "../../component/forms/Search";
import { BsSearch } from "react-icons/bs";

export const ServicesContainer = () => {
const currentDay = new Date();
const day = currentDay.getDate();
const month = currentDay.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
const year = currentDay.getFullYear();
const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;



  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 ">
      <h2 className="text-darkblack-600 text-2xl dark:text-white mb-8">
        Services
      </h2>
      <div className="flex flex-col justify-center ">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <label htmlFor="patent">Patente</label>
            <input
              className="w-3/4 border-none bg-slate-100 rounded-md"
              name="search"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="patent">Fecha</label>
            <input
              className="w-3/4 border-none bg-slate-100 rounded-md"
              name="search"
              value={formattedDate}
            />
          </div>
        </div>
        <div className="flex flex-col my-5">
          <div className="row">
            <input
              className="w-1/4 mx-2 rounded-md border-none bg-slate-100"
              name="patente"
              placeholder="Patente"
              type="text"
            />
            <input
              className="w-2/4 mx-2 rounded-md border-none bg-slate-100"
              name="propietario"
              placeholder="Marca"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
