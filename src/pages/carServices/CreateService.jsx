import React, { useEffect, useState } from "react";
import Search from "../../component/forms/Search";
import { BsSearch } from "react-icons/bs";

const currentDay = new Date();
const day = currentDay.getDate();
const month = currentDay.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
const year = currentDay.getFullYear();
const formattedDate = `${day.toString().padStart(2, "0")}/${month
  .toString()
  .padStart(2, "0")}/${year}`;

export const CreateService = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  const handleFetch = async () => {
    const response = await fetch(
      'http://localhost:4000/api/services'
    );
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    handleFetch();
  }
  , [])
  const handleSearch = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
  }
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 ">
      <div className="flex flex-row w-full ">
        <h2 className="text-darkblack-600 text-2xl w-1/4 text-center dark:text-white mb-8">
          Create Service
        </h2>
      </div>
      <div className="flex flex-col justify-center mt-6">
        <form>
          <div className="flex flex-row w-full items-center">
            <div className="flex flex-col mr-4">
              <label htmlFor="patent">Patente</label>
              <input
                className=" border-none bg-slate-100 rounded-md"
                name="search"
                onChange={handleSearch}
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
            <div className="flex flex-row mt-4">
              <div className="flex flex-col w-1/3">
                <span>Marca</span>
                <input
                  className="rounded-md border-none bg-slate-100"
                  name=""
                  placeholder="Ford"
                  type="text"
                />
              </div>
              <div className=" ml-4 flex flex-col w-1/3">
                <span>Modelo</span>
                <input
                  className="rounded-md border-none bg-slate-200"
                  name=""
                  placeholder="Fiesta"
                  type="text"
                />
              </div>
              <div className="w-1/5 ml-4 flex flex-col">
                <span>Año</span>
                <input
                  className="rounded-md border-none bg-slate-100"
                  name="year"
                  placeholder="2019"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-row my-5">
              <div className="flex flex-col w-1/3">
                <span>Propietario</span>
                <input
                  className="rounded-md border-none bg-slate-100"
                  name=""
                  placeholder="Propietario"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-1/3 ml-4">
                <span>Correo</span>
                <input
                  className="  rounded-md border-none bg-slate-200"
                  name="email"
                  placeholder="juancito@gmail.com"
                  type="email"
                />
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
