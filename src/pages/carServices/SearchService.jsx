import React, { useEffect, useState } from "react";
import Search from "../../component/forms/Search";
import { BsArrow90DegDown, BsArrowBarDown, BsSearch } from "react-icons/bs";

const currentDay = new Date();
const day = currentDay.getDate();
const month = currentDay.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
const year = currentDay.getFullYear();
const formattedDate = `${day.toString().padStart(2, "0")}/${month
  .toString()
  .padStart(2, "0")}/${year}`;

const SearchService = ({services}) => {
  const [searchByPatent, setSearchByPatent] = useState("");
  const [searchByOwner, setSearchByOwner] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);



  const handleSearchByPatent = (e) => {
    const newValue = e.target.value;
    setSearchByPatent(newValue);
  };

  const handleSearchByOwner = (e) => {
    const newValue = e.target.value;
    setSearchByOwner(newValue);
  };

  const filterServicesByPatent = () => {
    const filtered = services.filter((service) => {
      return (
        service.patent &&
        service.patent.toLowerCase().includes(searchByPatent.toLowerCase())
      );
    });
    setFilteredServices(filtered);
  };

  const filterServicesByOwner = () => {
    const filtered = services.filter((service) => {
      return (
        service.owner.ownerName &&
        service.owner.ownerName
          .toLowerCase()
          .includes(searchByOwner.toLowerCase())
      );
    });
    setFilteredServices(filtered);
    console.log(filtered);
  };

  useEffect(() => {
    filterServicesByPatent();
  }, [searchByPatent]);

  useEffect(() => {
    filterServicesByOwner();
  }, [searchByOwner]);

  const handleModal = (event, service) => {
    event.preventDefault(); // Evitar que el formulario se envíe
    if (selectedService && selectedService._id === service._id) {
      // Si se hace clic en el mismo servicio, cierra el modal
      setSelectedService(null);
    } else {
      // Si se hace clic en un servicio diferente, abre el modal con ese servicio
      setSelectedService(service);
    }
  };
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 ">
      <div className="flex flex-row w-full ">
        <h2 className="text-darkblack-600 text-2xl w-1/4 text-center dark:text-white mb-8">
          Search service
        </h2>
      </div>
      <div className="flex flex-col justify-center mt-6">
        <form>
          <div className="flex flex-col w-full items-center md:flex-row">
            <div className="flex flex-col mr-4 dark:text-white w-full md:w-1/4">
              <label htmlFor="patent">Patente</label>
              <input
                className=" border-none bg-slate-100 rounded-md dark:bg-darkblack-400 "
                name="search"
                onChange={handleSearchByPatent}
              />
            </div>
            <div className="flex flex-col mr-4 dark:text-white w-full md:w-1/4">
              <label htmlFor="patent">Propietario</label>
              <input
                className=" border-none bg-slate-100 rounded-md dark:bg-darkblack-400 "
                name="search"
                onChange={handleSearchByOwner}
              />
            </div>
            <div className="flex flex-col dark:text-white w-1/3 md:w-1/4">
              <label htmlFor="patent">Fecha</label>
              <input
                className="w-3/4 border-none bg-slate-100 rounded-md dark:bg-darkblack-400"
                name="search"
                value={formattedDate}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center my-8">
            <div className="w-5/6 flex flex-col">
              <div className="flex flex-row items-center justify-around w-full mb-6 dark:text-white">
                <div className="w-1/6 text-center font-bold text-lg">
                  <span>Fecha</span>
                </div>
                <div className="w-1/6 text-center font-bold text-lg">
                  <span>Patente</span>
                </div>
                <div className="w-1/6 text-center font-bold text-lg">
                  <span>Vehiculo</span>
                </div>
                <div className="w-1/6 text-center font-bold text-lg">
                  <span>Propietario</span>
                </div>
                <div className="w-1/6 text-center font-bold text-lg">
                  <span>Km</span>
                </div>
                <div className=" text-center font-bold text-lg">
                  <span></span>
                </div>
              </div>
              <ul className="w-full dark:text-white">
                {filteredServices?.map((service) => (
                  <li className="flex flex-col justify-center items-center border-b-2 border-gray-200 py-6 dark:text-white ">
                    <div className="flex flex-row justify-around items-center w-full ">
                      <div className="w-1/6 text-center">
                        <span>{service.Date.split("T")[0]}</span>
                      </div>
                      <div className="w-1/6 text-center">
                        <span>{service.patent}</span>
                      </div>
                      <div className="w-1/6 text-center">
                        <span>{service.vehicle.brand}</span>
                      </div>
                      <div className="w-1/6 text-center">
                        <span>{service.owner.ownerName}</span>
                      </div>
                      <div className="w-1/6 text-center">
                        <span>{service.km}</span>
                      </div>
                      <button
                        className="text-lg text-center bg-slate-200 p-2 rounded-md dark:bg-darkblack-400"
                        onClick={(event) => handleModal(event, service)}
                      >
                        <BsArrowBarDown />
                      </button>
                    </div>
                    {selectedService && selectedService._id === service._id && (
                      <div className="flex flex-col w-full mt-8 ">
                        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between ">
                          <div className="flex flex-col w-3/4 md:1/3 m-3">
                            <span className="mb-4">Aceite motor</span>
                            <div className="flex flex-row justify-between bg-slate-200  p-3 rounded-md dark:bg-darkblack-400">
                              <span className="">
                                {service.motorOil.OilType}
                              </span>
                              <span className="">
                                {service.motorOil.changed === true && "SI"}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col w-3/4 md:1/3 m-3">
                            <span className="mb-4">Aceite caja</span>
                            <div className="flex flex-row justify-between bg-slate-200 p-3 rounded-md dark:bg-darkblack-400">
                              <span className="">
                                {service.gearboxOil.OilType}
                              </span>
                              <span className="">
                                {service.gearboxOil.changed ? "SI" : "NO"}{" "}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col w-3/4 md:1/3 m-3">
                            <span className="mb-4">Aceite direccion</span>
                            <div className="flex flex-row justify-between bg-slate-200 p-3 rounded-md dark:bg-darkblack-400 shadow-md">
                              <span className="">
                                {service.steeringOil.OilType}
                              </span>
                              <span className="">
                                {service.steeringOil.changed ? "SI" : "NO"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between ">
                          <div className="flex flex-col items-start md:items-end text-center w-3/4 md:1/3 m-3">
                            <span className="mb-4">Filtro de aceite</span>
                            <div className="flex flex-col w-1/2 m-1">
                              <div className="w-full flex flex-row justify-between bg-slate-200 p-3 rounded-md dark:bg-darkblack-400">
                                <span>
                                  {service.oilFilter.changed ? "SI" : "NO"}
                                </span>
                              </div>
                              <span className="text-center">
                                cambio
                              </span>
                              </div>
                          </div>

                          <div className="flex flex-col w-3/4 md:1/3 m-3 text-center">
                            <span className="mb-4">Filtro de aire</span>
                            <div className=" flex flex-row">
                            <div className="flex flex-col w-1/2 m-1">
                              <div className="w-full flex flex-row justify-between bg-slate-200 p-3 rounded-md dark:bg-darkblack-400">
                                <span>
                                  {service.airFilter.changed ? "SI" : "NO"}
                                </span>
                              </div>
                              <span className="text-center">
                                cambio
                              </span>
                              </div>

                              <div className="flex flex-col w-1/2 m-1 text-center">
                              <div className="w-full flex flex-row justify-between bg-slate-200 p-3 rounded-md dark:bg-darkblack-400">
                                <span>
                                  {service.airFilter.reviewed ? "SI" : "NO"}
                                </span>
                              </div>
                              <span className="text-center">
                                revisado
                              </span>
                              </div>

                            </div>
                          </div>

                          <div className="flex flex-col w-3/4 md:1/3 m-3">
                            <span className="mb-4">Filtro de combustible</span>
                            <div className="flex flex-col w-1/2 m-1">
                              <div className="w-full flex flex-row justify-between bg-slate-200 p-3 rounded-md dark:bg-darkblack-400">
                                <span>
                                  {service.fuelFilter.changed ? "SI" : "NO"}
                                </span>
                              </div>
                              <span className="text-center">
                                cambio
                              </span>
                              </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SearchService;
