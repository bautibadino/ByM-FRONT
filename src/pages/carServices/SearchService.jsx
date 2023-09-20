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

const SearchService = () => {
  const [searchByPatent, setSearchByPatent] = useState("");
  const [searchByOwner, setSearchByOwner] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleFetch = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/services");
      if (response.ok) {
        const data = await response.json();
        const dataServices = data.data.servicesWithOwners;
        setServices(dataServices);
      } else {
        console.error("API request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

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
        service.patent.toLowerCase().includes(searchByPatent.toLowerCase()) || 
        service.owner.ownerName && service.owner.ownerName.toLowerCase().includes(searchByPatent.toLowerCase())
      );
    });
    setFilteredServices(filtered);
  };

  const filterServicesByOwner = () => {
  const filtered = services.filter((service) => {
  return (
    service.owner.ownerName &&
    service.owner.ownerName.toLowerCase().includes(searchByOwner.toLowerCase())
  );
  })
  setFilteredServices(filtered);
  };

  useEffect(() => {
    filterServicesByPatent();
  }, [searchByPatent]); 

  useEffect(() => {
    filterServicesByOwner();
  }, [searchByOwner]);

  const handleModal = (event, id) => {
    event.preventDefault();
    setOpenModal(!openModal);
    
    console.log(openModal,id)
  }
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
                  <li className="flex flex-row justify-between items-center border-b-2 border-gray-200 py-6 dark:text-white ">
                    <div className="w-1/6 text-md text-center">
                      <span>{service.Date.split("T")[0]}</span>
                    </div>
                    <div className="w-1/6 text-md text-center">
                      <span>{service.patent}</span>
                    </div>
                    <div className="w-1/6 text-md text-center">
                      <span>{service.vehicle.brand}</span>
                    </div>
                    <div className="w-1/6 text-md text-center">
                      <span>{service.owner.ownerName}</span>
                    </div>
                    <div className="w-1/6 text-md text-center">
                      <span>{service.km}</span>
                    </div>
                    <button 
                    className="text-lg text-center bg-slate-200 p-2 rounded-md dark:bg-darkblack-400"
                    onClick={(e) => handleModal(e, service._id)}
                    >
                      <BsArrowBarDown />
                    </button>
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