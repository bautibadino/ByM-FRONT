import React, { useState, useEffect } from "react";
import { Sucess } from "../../component/alerts/Sucess";
import { Error } from "../../component/alerts/Error";

export const ServicesForm = ({ services }) => {
  const currentDay = new Date();
  const day = currentDay.getDate();
  const month = currentDay.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
  const year = currentDay.getFullYear();
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  const [filteredServices, setFilteredServices] = useState([]);
  const [previousSearch, setPreviousSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState(false);
  // inputs form
  const [search, setSearch] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [km, setKm] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerCity, setOwnerCity] = useState("");
  const [motorOilType, setMotorOilType] = useState("");
  const [motorOilChange, setMotorOilChange] = useState(false);
  const [differentialOilType, setDifferentialOilType] = useState("");
  const [differentialOilChange, setDifferentialOilChange] = useState(false);
  const [differentialOilReviewed, setDifferentialOilReviewed] = useState(false);
  const [gearboxOilType, setGearboxOilType] = useState("");
  const [gearboxOilChange, setGearboxOilChange] = useState(false);
  const [gearboxOilReviewed, setGearboxOilReviewed] = useState(false);
  const [airFilterChange, setAirFilterChange] = useState(false);
  const [airFilterReviewed, setAirFilterReviewed] = useState(false);
  const [oilFilterChange, setOilFilterChange] = useState(false);
  const [fuelFilterChange, setFuelFilterChange] = useState(false);
  const [patent, setPatent] = useState("");
  const [date, setDate] = useState(formattedDate);
  // fin inputs form

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
  const handleUpdateFields = () => {
    if (selectedService) {
      setVehicleBrand(selectedService.vehicle.brand);
      setVehicleModel(selectedService.vehicle.model);
      setVehicleYear(selectedService.vehicle.year);
      setOwnerName(selectedService.owner.ownerName);
      setOwnerEmail(selectedService.owner.email);
      setOwnerPhone(selectedService.owner.phone);
      setPatent(selectedService.patent);
    }
  };
  useEffect(() => {
    handleUpdateFields();
  }, [selectedService]);

  const handleResetForm = () => {
    setSearch("");
    setVehicleBrand("");
    setVehicleModel("");
    setVehicleYear("");
    setOwnerName("");
    setOwnerEmail("");
    setOwnerPhone("");
    setPatent("");
    setKm("");
    setMotorOilType("");
    setMotorOilChange(false);
    setDifferentialOilType("");
    setDifferentialOilChange(false);
    setDifferentialOilReviewed(false);
    setGearboxOilType("");
    setGearboxOilChange(false);
    setGearboxOilReviewed(false);
    setAirFilterChange(false);
    setAirFilterReviewed(false);
    setOilFilterChange(false);
    setFuelFilterChange(false);
    };
  const createService = async (event) => {
    event.preventDefault();

    const ownerData = {
      associatedVehicle:{
        patent: patent? patent : search,
        brand: vehicleBrand,
        model: vehicleModel,
        year: vehicleYear,
      },
      owner:{
          ownerName: ownerName,
          ownerPhone: ownerPhone,
          ownerEmail: ownerEmail,
          ownerCity: ownerCity,
      }
    };
    console.log(ownerData)
    const serviceData = {
        patent: patent? patent : search,
        km,
        date,
        motorOil: {
          OilType: motorOilType,
          changed: motorOilChange,
        },
        steeringOil: {
          OilType: differentialOilType,
          changed: differentialOilChange,
          reviewed: differentialOilReviewed,
        },
        gearboxOil: {
          OilType: gearboxOilType,
          changed: gearboxOilChange,
          reviewed: gearboxOilReviewed,
        },
        airFilter: {
          changed: airFilterChange,
          reviewed: airFilterReviewed,
        },
        oilFilter: {
          changed: oilFilterChange,
        },
        fuelFilter: {
          changed: fuelFilterChange,
        },
    };

    if(
        ownerData.associatedVehicle.patent === "" ||
        ownerData.associatedVehicle.brand === "" ||
        ownerData.associatedVehicle.year === "" ||
        ownerData.owner.ownerName === "" ||
        serviceData.patent === "" ||
        serviceData.km === "" ||
        serviceData.date === "" ||
        serviceData.motorOil.OilType === "" 
        // serviceData.steeringOil.OilType === "" ||
        // serviceData.gearboxOil.OilType === "" 
        ){
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 2000);
        return
        }
    
    fetch("http://localhost:4000/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerData,
        serviceData,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
      setSuccessMessage(true)
      handleResetForm()
      setTimeout(() => {
        setSuccessMessage(false)
      }, 2000);
  };
  return (
    <form className="" onSubmit={(event) => createService(event)}>
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col mr-4">
          <div className="flex flex-col">
            <label htmlFor="patent" className="dark:text-white">
              Patente
            </label>
            <div className="flex flex-row">
              <input
                className=" border-none bg-slate-100 rounded-md w-1/2"
                name="search"
                onChange={handleSearch}
                value={search? search : "" }
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
          <label htmlFor="patent" className="dark:text-white">
            Fecha
          </label>
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
              name="marca"
              placeholder="Ford"
              type="text"
              value={vehicleBrand ? vehicleBrand : ""}
              onChange={(e) => setVehicleBrand(e.target.value)}
            />
          </div>
          <div className=" ml-4 flex flex-col w-1/3">
            <span className="dark:text-white">Modelo</span>
            <input
              className="rounded-md border-none bg-slate-200"
              name=""
              placeholder="Fiesta"
              type="text"
              value={vehicleModel ? vehicleModel : ""}
              onChange={(e) => setVehicleModel(e.target.value)}
            />
          </div>
          <div className="w-1/5 ml-4 flex flex-col">
            <span className="dark:text-white">Año</span>
            <input
              className="rounded-md border-none bg-slate-100"
              name="year"
              placeholder="2019"
              type="text"
              value={vehicleYear ? vehicleYear : ""}
              onChange={(e) => setVehicleYear(e.target.value)}
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
              value={ownerName ? ownerName : ""}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/3 ml-4">
            <span className="dark:text-white">Correo</span>
            <input
              className="  rounded-md border-none bg-slate-200"
              name="email"
              placeholder="juancito@gmail.com"
              type="email"
              value={ownerEmail ? ownerEmail : ""}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/5 ml-4">
            <span className="dark:text-white">KM</span>
            <input
              className="  rounded-md border-none bg-slate-200"
              name="km"
              placeholder="105000"
              type="text"
              value={km ? km : ""}
              onChange={(e) => setKm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 ">
        <div className="flex flex-col w-full justify-center rounded-md row-start-1 row-end-2 md:items-start md:row-start-1 md:col-start-1 md:col-end-2">
          <div className="flex flex-row mt-4 m-3">
            <div className="flex flex-col">
              <label htmlFor="patent" className="dark:text-white font-semibold">
                Aceite motor
              </label>
              <div className="flex flex-row">
                <input
                  className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                  name="motorOil"
                  onChange={(e) => setMotorOilType(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-center dark:text-white">cambio</label>
              <select
                className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                onChange={(e) =>
                  setMotorOilChange(e.target.value === "true" ? true : false)
                }
              >
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
              <label
                htmlFor="differential"
                className="dark:text-white font-semibold"
              >
                Aceite de diferencial
              </label>
              <div className="flex flex-row">
                <input
                  className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                  name="differentialOil"
                  onChange={(e) => setDifferentialOilType(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-center dark:text-white">cambio</label>
              <select
                className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                onChange={(e) =>
                  setDifferentialOilChange(
                    e.target.value === "true" ? true : false
                  )
                }
              >
                <option className="" value="true">
                  Si
                </option>
                <option className="" value="false">
                  No
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-center dark:text-white">revisado</label>
              <select
                className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                onChange={(e) =>
                  setDifferentialOilReviewed(
                    e.target.value === "true" ? true : false
                  )
                }
              >
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
              <label htmlFor="patent" className="dark:text-white font-semibold">
                Aceite caja
              </label>
              <div className="flex flex-row">
                <input
                  className="w-full border-none bg-slate-100 rounded-md dark:text-darkblack-600"
                  name="gearboxOil"
                  onChange={(e) => setGearboxOilType(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-center dark:text-white">cambio</label>
              <select
                className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                onChange={(e) =>
                  setGearboxOilChange(e.target.value === "true" ? true : false)
                }
              >
                <option className="" value="true">
                  Si
                </option>
                <option className="" value="false">
                  No
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-center dark:text-white">revisado</label>
              <select
                className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                onChange={(e) =>
                  setGearboxOilReviewed(
                    e.target.value === "true" ? true : false
                  )
                }
              >
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

        <div className="flex flex-col w-full items-center justify-center rounded-md row-start-2 row-end-3 md:row-start-1 md:col-start-2 md:col-end-3">
          <div className="flex flex-col mt-4 m-3">
            <label className="text-center font-semibold dark:text-white">Filtro de aire</label>
            <div className="flex flex-row mt-3">
              <div className="flex flex-col">
                <label className="text-center dark:text-white">Revisado</label>
                <select
                  className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                  onChange={(e) =>
                    setAirFilterReviewed(
                      e.target.value === "true" ? true : false
                    )
                  }
                >
                  <option className="" value="true">
                    Si
                  </option>
                  <option className="" value="false">
                    No
                  </option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-center dark:text-white">cambio</label>
                <select
                  className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                  onChange={(e) =>
                    setAirFilterChange(e.target.value === "true" ? true : false)
                  }
                >
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
          <div className="flex flex-row mt-4 m-3">
            <div className="flex flex-col">
              <label htmlFor="patent" className="dark:text-white font-semibold ">
                Filtro de aceite
              </label>
              <div className="flex flex-row items-center mt-3">
                <label className="text-center dark:text-white">cambio:</label>
                <select
                  className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                  onChange={(e) =>
                    setOilFilterChange(e.target.value === "true" ? true : false)
                  }
                >
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
          <div className="flex flex-row mt-4 m-3">
            <div className="flex flex-col">
              <label htmlFor="patent" className="dark:text-white font-semibold">
                Filtro de combustible
              </label>
              <div className="flex flex-row items-center mt-3">
                <label className="text-center dark:text-white">cambio:</label>
                <select
                  className="border-none bg-slate-100 rounded-md mx-2 dark:text-darkblack-600"
                  onChange={(e) =>
                    setFuelFilterChange(
                      e.target.value === "true" ? true : false
                    )
                  }
                >
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
      </div>

      <div className="w-full flex justify-center items-center mt-16">
        <button
          className="bg-yellow-400 px-4 py-2 rounded-md shadow-md active:shadow-sm"
          type="submit"
        >
          Guardar
        </button>
      </div>
      <div className="flex justify-center items-center">
        {
        successMessage &&
        <Sucess mensaje="Service creado" descripcion="El service se ha creado correctamente" />
        }
        {
        error &&
        <Error mensaje="Error" descripcion="Todos los campos son obligatorios" />
        }

      </div>
    </form>
  );
};
