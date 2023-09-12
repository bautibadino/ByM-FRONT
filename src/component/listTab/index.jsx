import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import Pagination from "../Pagination";
import Filter from "../forms/Filter";
import FilterFull from "../forms/FilterFull";
import Search from "../forms/Search";
import UserTab from "./UserTab";
import { set } from "mongoose";
import { Sucess } from "../alerts/Sucess";
import { Error } from "../alerts/Error";
import user from "../../data/user";

const ListTab = ({ pageSize }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [usersQuantity , setUsersQuantity] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // CREAR USUARIO
  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = e.target.name.value;
    const cuit = e.target.cuit.value;
    const email = e.target.email.value;
    const location = e.target.location.value;
    const direction = e.target.direction.value;

    // Crear un objeto cliente con los valores
    if (
      name === "" ||
      cuit === "" ||
      email === "" ||
      location === "" ||
      direction === ""
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const cliente = {
      name,
      cuit,
      email,
      location,
      direction,
    };

    // Enviar el objeto cliente al backend
    fetch("http://localhost:4000/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cliente guardado con éxito", data);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("Error al guardar el cliente", error);
        setError(true);
      });

    // Cerrar el modal después de un tiempo o después de que se complete la acción
    setTimeout(() => {
      closeModal();
      setSuccess(false);
    }, 2000);
  };
  const handleUsersQuantity = (quantity) => { 
    setUsersQuantity(quantity);
  }

  useEffect(() => {
    setPagesQuantity(Math.floor(usersQuantity/pageSize))
  }, [usersQuantity])

  const handleNextPage = () => {
    if (currentPage === pagesQuantity) return;
    setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(pagesQuantity);
  };
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <Search onSearchChange={handleSearchChange} />
          <button
            className=" bg-gradient-to-r from-darkblack-500 to-darkblack-600 text-yellow-300 dark:bg-gradient-to-r dark:from-yellow-200 dark:to-yellow-300 dark:text-black rounded-md "
            onClick={openModal}
          >
            CREAR CLIENTE
          </button>
        </div>

        <UserTab
          searchFilter={searchTerm}
          pageSize={pageSize}
          searchTerm={searchTerm}
          success={success}
          handleUsersQuantity={handleUsersQuantity}
          currentPage={currentPage}
        />
        <Pagination
          pagesQuantity={pagesQuantity}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
          />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Crear Cliente</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Cuit
                </label>
                <input
                  type="text"
                  id="cuit"
                  name="cuit"
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div className="flex flex-row mb-4">
                <div className="flex flex-col m-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Localidad{" "}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                </div>
                <div className="flex flex-col m-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Direccion
                  </label>
                  <input
                    type="text"
                    id="direction"
                    name="direction"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                </div>
              </div>
              {/* Repite esto para los otros campos del formulario */}
              <div className="flex justify-end">
                <button
                  className=" text-white bg-gradient-to-r from-red-300 to-red-500 rounded-lg px-4 py-2 hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button className="bg-gradient-to-l from-green-300 to-green-500 text-white rounded-lg px-4 py-2 ml-2 hover:bg-green-600">
                  Guardar
                </button>
              </div>

              {success && <Sucess mensaje="Cliente creado con éxito" />}
              {error && <Error mensaje="Compruebe los datos ingresados" />}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

ListTab.propTypes = {
  pageSize: ProtoTypes.number,
};

export default ListTab;
