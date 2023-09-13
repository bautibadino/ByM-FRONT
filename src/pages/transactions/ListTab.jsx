import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import TransactionTab from "./TransactionTab";

import MonthSelector from "./MonthSelector";
import SellerSelector from "./SellerSelector";
import PaymentSelector from "./PaymentSelector";

const ListTab = ({ pageSize }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSeller = (seller) => {
    setSeller(seller);
  };
  const handleMonth = (month) => {
    setMonth(month);
  };
  const handlePayment = (payment) => {
    setPayment(payment);
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
    const client = e.target.clientName.value;
    const seller = e.target.seller.value;
    const payment = e.target.payment.value;
    const status = e.target.status.value;
    const description = e.target.description.value;
    const total = e.target.total.value;
    

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

  } 

  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          <MonthSelector handleMonth={handleMonth}/> 
          <SellerSelector handleSeller={handleSeller}/> 
          <PaymentSelector handlePayment={handlePayment}/> 
          <button
            className=" px-2 bg-gradient-to-r from-darkblack-500 to-darkblack-600 text-yellow-300 dark:bg-gradient-to-r dark:from-yellow-200 dark:to-yellow-300 dark:text-black rounded-md "
            onClick={openModal}
          >
            Crear transacción
          </button>
        </div>

        <TransactionTab
          pageSize={pageSize}
          success={success}
        />
        {/* <Pagination
          pagesQuantity={pagesQuantity}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
          /> */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Agregar transacción</h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <div className="mx-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre de cliente
                  </label>
                  <input
                    type="text"
                    id="Clientname"
                    name="Clientname"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                </div>

                <div className="mx-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Vendedor
                  </label>
                  <input
                    type="email"
                    id="seller"
                    name="seller"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="mx-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Medio de pago
                    </label>
                    <input
                      type="text"
                      id="payment"
                      name="payment"
                      className="border rounded-lg px-3 py-2 w-full"
                    />
                  </div>
                  <div className="flex flex-col mx-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Estado de venta
                    </label>
                    <input
                      type="text"
                      id="status"
                      name="status"
                      className="border rounded-lg px-3 py-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col m-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Descripcion de venta
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">

                  <div className="flex flex-col m-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Total
                    </label>
                    <input
                      type="text"
                      id="total"
                      name="total"
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

              {/* {success && <Sucess mensaje="Cliente creado con éxito" />} */}
              {/* {error && <Error mensaje="Compruebe los datos ingresados" />} */}
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
