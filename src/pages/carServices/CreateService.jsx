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

export const CreateService = ({ services }) => {
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [previousSearch, setPreviousSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  //estados de inputs
  const [vehicleBrand , setVehicleBrand] = useState("")
  const [vehicleModel , setVehicleModel] = useState("")
  const [vehicleYear , setVehicleYear] = useState("")
  const [km, setKm] = useState("")
  const [ownerName , setOwnerName] = useState("")
  const [ownerEmail , setOwnerEmail] = useState("")
  const [ownerPhone , setOwnerPhone] = useState("")
  const [motorOilType , setMotorOilType] = useState("")
  const [motorOilChange , setMotorOilChange] = useState(false)
  const [steeringOilType , setSteeringOilType] = useState("")
  const [steeringOilChange , setSteeringOilChange] = useState(false)
  const [steeringOilReviewed, setSteeringOilReviewed] = useState(false)
  const [gearboxOilType , setGearboxOilType] = useState("")
  const [gearboxOilChange , setGearboxOilChange] = useState(false)
  const [gearboxOilReviewed, setGearboxOilReviewed] = useState(false)
  const [airFilterChange , setAirFilterChange] = useState(false)
  const [airFilterReviewed, setAirFilterReviewed] = useState(false)
  const [oilFilterChange , setOilFilterChange] = useState(false)
  const [fuelFilterChange, setFuelFilterChange] = useState(false)
  const [patent , setPatent] = useState("")
  const [date, setDate] = useState(formattedDate)
  //fin estados

  //crear service 
  const createService = async () => {
    const response = await fetch("http://localhost:4000/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Date: date,
        vehicle: {
          brand: vehicleBrand,
          model: vehicleModel,
          year: vehicleYear,
        },
        km: km,
        owner: {
          ownerName: ownerName,
          email: ownerEmail,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
  };



  const handleSearch = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);
    updateSuggestions(newValue);
  };

  const updateSuggestions = (query) => {
    if (query === "") {
      setSuggestions([]);
    } else {
      const suggested = services
        .filter((service) => {
          return (
            service.patent &&
            service.patent.toLowerCase().includes(query.toLowerCase())
          );
        })
        .map((service) => service.patent)
        .slice(0, 5);
      setSuggestions(suggested);
    }
  };

  const filterServicesByPatent = () => {
    if (search === "") {
      setFilteredServices([]);
    } else {
      const filtered = services.filter((service) => {
        return (
          service.patent &&
          service.patent.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredServices(filtered);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setSearch(suggestion); // Establecer la sugerencia seleccionada en el campo de búsqueda.
    setSuggestions([]); // Cerrar la lista de sugerencias al hacer clic.
  };

  useEffect(() => {
    if (search.startsWith(previousSearch)) {
      filterServicesByPatent();
    } else {
      setFilteredServices([]);
      setPreviousSearch(search);
    }
  }, [search, previousSearch, services]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const service = services.find((service) => service.patent === search);
    setSelectedService(service);
  };
  console.log(selectedService)
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 ">
      <div className="flex flex-row w-full ">
        <h2 className="text-darkblack-600 text-2xl w-1/4 text-center dark:text-white mb-8">
          Create Service
        </h2>
      </div>
      <div className="flex flex-col justify-center mt-6">
        <form className="">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col mr-4">
              <div className="flex flex-col">
                <label htmlFor="patent" className="dark:text-white">Patente</label>
                <div className="flex flex-row">
                  <input
                    className=" border-none bg-slate-100 rounded-md w-1/2"
                    name="search"
                    onChange={handleSearch}
                    value={search}
                  />
                  <button
                    className="ml-4 flex justify-center items-center bg-yellow-400 px-4 rounded-md shadow-md active:shadow-sm"
                    onClick={handleSearchSubmit}
                  >
                    nuevo service
                  </button>
                </div>
              </div>
              <div className="suggestions bg-slate-200 flex flex-col items-center justify-center mt-1 rounded-md shadow-md w-1/2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item my-2 w-full text-center cursor-pointer pb-2 shadow-sm hover:scale-105 transition-all duration-200 ease-in-out"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="patent" className="dark:text-white">Fecha</label>
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
                <span className="dark:text-white">Marca</span>
                <input
                  className="rounded-md border-none bg-slate-100"
                  name=""
                  placeholder="Ford"
                  type="text"
                  value={selectedService?.vehicle.brand}
                />
              </div>
              <div className=" ml-4 flex flex-col w-1/3">
                <span className="dark:text-white">Modelo</span>
                <input
                  className="rounded-md border-none bg-slate-200"
                  name=""
                  placeholder="Fiesta"
                  type="text"
                  value={selectedService?.vehicle.model}
                />
              </div>
              <div className="w-1/5 ml-4 flex flex-col">
                <span className="dark:text-white">Año</span>
                <input
                  className="rounded-md border-none bg-slate-100"
                  name="year"
                  placeholder="2019"
                  type="text"
                  value={selectedService?.vehicle.year}
                />
              </div>
            </div>
            <div className="flex flex-row my-5">
              <div className="flex flex-col w-1/3">
                <span className="dark:text-white">Propietario</span>
                <input
                  className="rounded-md border-none bg-slate-100"
                  name=""
                  placeholder="Propietario"
                  type="text"
                  value={selectedService?.owner.ownerName}
                />
              </div>
              <div className="flex flex-col w-1/3 ml-4">
                <span className="dark:text-white">Correo</span>
                <input
                  className="  rounded-md border-none bg-slate-200"
                  name="email"
                  placeholder="juancito@gmail.com"
                  type="email"
                  value={selectedService?.owner.email}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 ">
            <div className="flex flex-col w-full items-center justify-center rounded-md col-start-1 col-end-2">
            <div className="flex flex-row mt-4 m-3 ">
                  <div className="flex flex-col">
                    <label htmlFor="patent" className="dark:text-white">Aceite motor</label>
                    <div className="flex flex-row">
                      <input
                        className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                        name="motorOil"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-center">cambio</label>
                      <select className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600">
                        <option className="" value="true">
                          Si
                        </option>
                        <option className="" value="false">
                          No
                        </option>
                      </select>
                    </div>
              </div>
              <div className="flex flex-row mt-4 m-3 ">
                  <div className="flex flex-col">
                    <label htmlFor="patent" className="dark:text-white">Aceite de dirección</label>
                    <div className="flex flex-row">
                      <input
                        className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                        name="steeringOil"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-center">cambio</label>
                      <select className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600">
                        <option className="" value="true">
                          Si
                        </option>
                        <option className="" value="false">
                          No
                        </option>
                      </select>
                    </div>
              </div>
              <div className="flex flex-row mt-4 m-3 ">
                  <div className="flex flex-col">
                    <label htmlFor="patent" className="dark:text-white">Aceite caja</label>
                    <div className="flex flex-row">
                      <input
                        className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                        name="gearboxOil"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-center">cambio</label>
                      <select className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600">
                        <option className="" value="true">
                          Si
                        </option>
                        <option className="" value="false">
                          No
                        </option>
                      </select>
                    </div>
              </div>
            </div>
            
            <div className="flex flex-col w-full items-center justify-center rounded-md col-start-2 col-end-">
            <div className="flex flex-row mt-4 m-3">
                  <div className="flex flex-col">
                    <label htmlFor="patent" className="dark:text-white">Filtro de aire</label>
                    <div className="flex flex-row">
                      <input
                        className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                        name="airFilter"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-center">cambio</label>
                      <select className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600">
                        <option className="" value="true">
                          Si
                        </option>
                        <option className="" value="false">
                          No
                        </option>
                      </select>
                    </div>
              </div>
              <div className="flex flex-row mt-4 m-3">
                  <div className="flex flex-col">
                    <label htmlFor="patent" className="dark:text-white">Filtro de aceite</label>
                    <div className="flex flex-row">
                      <input
                        className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                        name="oilFilter"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-center">cambio</label>
                      <select className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600">
                        <option className="" value="true">
                          Si
                        </option>
                        <option className="" value="false">
                          No
                        </option>
                      </select>
                    </div>
              </div>
              <div className="flex flex-row mt-4 m-3">
                  <div className="flex flex-col">
                    <label htmlFor="patent" className="dark:text-white">Filtro de combustible</label>
                    <div className="flex flex-row">
                      <input
                        className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                        name="fuelFilter"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                      <label className="text-center">cambio</label>
                      <select className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600">
                        <option className="" value="true">
                          Si
                        </option>
                        <option className="" value="false">
                          No
                        </option>
                      </select>
                    </div>
              </div>
              </div>
          </div>

          <div className="w-full flex justify-center items-center mt-16">
            <button className="bg-yellow-400 px-4 py-2 rounded-md shadow-md active:shadow-sm">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
