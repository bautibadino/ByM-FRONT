import React, { useEffect, useState } from "react";
import ProtoTypes from "prop-types";
import TransactionTab from "./TransactionTab";
import MonthSelector from "./MonthSelector";
import SellerSelector from "./SellerSelector";
import PaymentSelector from "./PaymentSelector";
import { GrPowerReset } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";
import { Sucess } from "../../component/alerts/Sucess";
import { Error } from "../../component/alerts/Error";

const ListTab = ({ pageSize }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [bdSeller, setBdSeller] = useState([]); //BD
  const [formSeller, setFormSeller] = useState(null);
  const [month, setMonth] = useState("");
  const [seller, setSeller] = useState("");
  const [payment, setPayment] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [successModify, setSuccessModify] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(""); 
  const [editedData, setEditedData] = useState({
    client: "",
    seller: "",
    paymentType: "",
    status: "",
    description: "",
    total: 0,
  });

  const sellState = [
    { id: "PAID", name: "PAGO" },
    { id: "DEBITED", name: "ADEUDADO" },
  ];

  const paymentSelector = [
    { id: "CASH", name: "EFECTIVO" },
    { id: "CREDIT_CARD", name: "CREDITO" },
    { id: "DEBIT_CARD", name: "DEBITO" },
    { id: "BANK_TRANSFER", name: "TRANSFERENCIA" },
    { id: "CHECK", name: "CHEQUE" },
  ];

  const getSellers = async () => {
    fetch("http://localhost:4000/api/users", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setBdSeller(data.data.users))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getSellers();
  }, []);

  const handleSetMonth = (selectedMonth) => {
    setMonth(selectedMonth);
  };
  const handleSetSeller = (selectedSeller) => {
    setSeller(selectedSeller);
  };

  const handleSetPayment = (selectedPayment) => {
    setPayment(selectedPayment);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //POST request
  const handleAddTransaction = async (transaction) => {
    const response = await fetch("http://localhost:4000/api/transactions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(transaction),
    });
    const data = await response.json();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setIsModalOpen(false);
    }, 2000);
  };

  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/transactions");
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      const orderByDate = await data.data.transaction.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });

      // Transformar las fechas aquí
      const transactionsWithFormattedDate = data.data.transaction.map(
        (transaction) => {
          const date = transaction.createdAt;
          const newDate = date.split(/[T-]/);
          const year = newDate[0];
          const month = newDate[1];
          const day = newDate[2];
          const dateFormatted = `${day}/${month}/${year}`;

          // Devolver el objeto de transacción actualizado
          return {
            ...transaction,
            year: year,
            month: month,
            day: day,
            formattedDate: dateFormatted,
          };
        }
      );

      // Establecer las transacciones en el estado
      setTransactions(transactionsWithFormattedDate);
    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Obtener los valores del formulario
    const client = e.target.clientName.value;
    const seller = formSeller;
    const paymentType = e.target.paymentType.value;
    const status = e.target.status.value;
    const description = e.target.description.value;
    const total = e.target.total.value;

    if (
      client === "" ||
      seller === null ||
      paymentType === "" ||
      status === "" ||
      description === "" ||
      total === ""
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

    const date = new Date(); // Obtenemos la fecha actual
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dateFormatted = `${day}/${month}/${year}`;

    console.log(dateFormatted);
    const dailyTransaction = {
      client,
      seller,
      paymentType,
      status,
      description,
      total,
      formattedDate: dateFormatted,
    };

    handleAddTransaction(dailyTransaction);
    setTransactions([dailyTransaction, ...transactions]);
  };
  const handleModify = (id) => {
    setIsModifyModalOpen(true);
    const order = transactions.find((transaction) => transaction._id === id);
    setCurrentOrder(order);
    // Establece los valores iniciales de editedData cuando abres el modal de modificación
    setEditedData({
      client: order.client,
      seller: order.seller,
      paymentType: order.paymentType,
      status: order.status,
      description: order.description,
      total: order.total,
    });
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/api/transactions/${currentOrder._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

    setSuccessModify(true);
    transactions.filter((transaction) => {
      if (transaction._id === currentOrder._id) {
        transaction.client = editedData.client;
        transaction.seller = editedData.seller;
        transaction.paymentType = editedData.paymentType;
        transaction.status = editedData.status;
        transaction.description = editedData.description;
        transaction.total = editedData.total;
      }
    });
    setTimeout(() => {
      setSuccessModify(false);
      setIsModifyModalOpen(false);
    }, 2000);
  };
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    console.log(newStatus)
    setSelectedStatus(newStatus); // Actualiza el estado al cambiar el estado seleccionado
  };
  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 ">
      <div className="flex flex-col items-center justify-center  md:justify-between mb-6 md:flex-row ">
        <h2 className="text-2xl font-semibold text-darkblack dark:text-white my-2 ">
          Transacciones diarias
        </h2>
        <div className="flex flex-row">
          <button
            className=" flex justify-center items-center flex-col text-sm bg-gradient-to-r from-green-200 to-green-300 text-black rounded-md hover:from-green-300 hover:to-green-400 p-2 mx-2"
            onClick={() => {
              setMonth("");
              setSeller("");
              setPayment("");
            }}
          >
            <span className="text-sm">Limpiar filtros</span>
            {/* <GrPowerReset className="text-black text-xl" /> */}
          </button>
          <button
            className=" flex justify-center items-center flex-col flex-wrap text-sm bg-gradient-to-r from-yellow-200 to-yellow-300 text-black rounded-md hover:from-yellow-300 hover:to-yellow-400 p-2 mx-2 "
            onClick={openModal}
          >
            <span className="text-sm">Agregar transaccion</span>
            {/* <IoAddCircleOutline className="text-black text-2xl" /> */}
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col items-center w-full md:flex-row">
          <MonthSelector
            className=""
            onMonthChange={handleSetMonth}
            month={month}
          />
          <SellerSelector
            className=""
            onSellerChange={handleSetSeller}
            bdSeller={bdSeller}
            seller={seller}
          />
          <PaymentSelector
            className=""
            onPaymentChange={handleSetPayment}
            payment={payment}
          />
        </div>

        <TransactionTab
          getTransactions={getTransactions}
          transactions={transactions}
          pageSize={pageSize}
          success={success}
          bdSeller={bdSeller}
          month={month}
          seller={seller}
          payment={payment}
          handleModify={handleModify}
          successModify={successModify}
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
      {}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Agregar transacción</h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <div className="w-1/2 mx-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre de cliente
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                </div>

                <div className="w-1/2 mx-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Vendedor
                  </label>
                  <select
                    className="w-full rounded-md bg-white"
                    id="seller"
                    name="seller"
                    onChange={(e) => setFormSeller(e.target.value)}
                    defaultValue=""
                  >
                    <option disabled value=""></option>
                    {bdSeller.map((seller) => (
                      <option
                        className="mt-4"
                        value={seller._id}
                        key={seller._id}
                      >{`${seller.firstName} ${seller.lastName}`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col mx-2 mb-4 w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Estado de venta
                    </label>
                    <select
                      type="text"
                      id="status"
                      name="status"
                      className="border rounded-lg px-3 py-2 w-full"
                      defaultValue={""}
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      <option disabled value=""></option>
                      {sellState.map((state) => (
                        <option
                          className="mt-4"
                          name="status"
                          value={state.id}
                          key={state.id}
                        >
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mx-2 mb-4 w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Medio de pago
                    </label>
                    <select
                      type="text"
                      id="paymentType"
                      name="paymentType"
                      className="border rounded-lg px-3 py-2 w-full"
                      defaultValue={""}
                      disabled={true}
                    > 
                      <option disabled value=""></option>
                      {paymentSelector.map((payment) => (
                        <option
                          className="mt-4"
                          name="paymentType"
                          key={payment.id}
                          value={payment.id}
                        >
                          {payment.name}
                        </option>
                      ))}
                    </select>
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
                  <label className="block text-sm font-medium text-gray-700 ml-3">
                    Total
                  </label>
                  <div className="flex flex-row items-center">
                    <span className="mr-2">$</span>
                    <input
                      type="number"
                      step=".01"
                      id="total"
                      name="total"
                      className="border rounded-lg px-3 py-2 w-full"
                    />
                  </div>
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
                <button
                  type="submit"
                  className="bg-gradient-to-l from-green-300 to-green-500 text-white rounded-lg px-4 py-2 ml-2 hover:bg-green-600"
                >
                  Guardar
                </button>
              </div>

              {success && <Sucess mensaje="Transaccion creada con éxito" />}
              {error && <Error mensaje="Compruebe los datos ingresados" />}
            </form>
          </div>
        </div>
      )}
      {isModifyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Modificar transacción
            </h2>

            <form onSubmit={handleModifySubmit}>
              <div className="flex flex-row">
                <div className="w-1/2 mx-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nombre de cliente
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    className="border rounded-lg px-3 py-2 w-full"
                    value={editedData.client}
                    onChange={(e) =>
                      setEditedData({ ...editedData, client: e.target.value })
                    }
                  />
                </div>

                <div className="w-1/2 mx-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Vendedor
                  </label>
                  <select
                    className="w-full rounded-md bg-white"
                    id="seller"
                    name="seller"
                    defaultValue=""
                    value={editedData?.seller}
                    onChange={(e) =>
                      setEditedData({ ...editedData, seller: e.target.value })
                    }
                  >
                    <option disabled value=""></option>
                    {bdSeller.map((seller) => (
                      <option
                        className="mt-4"
                        value={seller._id}
                        key={seller._id}
                      >{`${seller.firstName} ${seller.lastName}`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-row w-full">
                  <div className="mx-2 mb-4 w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Medio de pago
                    </label>
                    <select
                      type="text"
                      id="paymentType"
                      name="paymentType"
                      className="border rounded-lg px-3 py-2 w-full"
                      defaultValue={""}
                      value={editedData?.paymentType}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          paymentType: e.target.value,
                        })
                      }
                    >
                      <option disabled value=""></option>
                      {paymentSelector.map((payment) => (
                        <option
                          className="mt-4"
                          name="paymentType"
                          key={payment.id}
                          value={payment.id}
                        >
                          {payment.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mx-2 mb-4 w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Estado de venta
                    </label>
                    <select
                      type="text"
                      id="status"
                      name="status"
                      className="border rounded-lg px-3 py-2 w-full"
                      defaultValue={""}
                      value={editedData?.status}
                      onChange={(e) =>
                        setEditedData({ ...editedData, status: e.target.value })
                      }
                    >
                      <option disabled value=""></option>
                      {sellState.map((state) => (
                        <option
                          className="mt-4"
                          name="status"
                          value={state.id}
                          key={state.id}
                        >
                          {state.name}
                        </option>
                      ))}
                    </select>
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
                    value={editedData?.description}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-col m-2">
                  <label className="block text-sm font-medium text-gray-700 ml-3">
                    Total
                  </label>
                  <div className="flex flex-row items-center">
                    <span className="mr-2">$</span>
                    <input
                      type="number"
                      step=".01"
                      id="total"
                      name="total"
                      className="border rounded-lg px-3 py-2 w-full"
                      value={editedData?.total}
                      onChange={(e) =>
                        setEditedData({ ...editedData, total: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Repite esto para los otros campos del formulario */}
              <div className="flex justify-end">
                <button
                  className=" text-white bg-gradient-to-r from-red-300 to-red-500 rounded-lg px-4 py-2 hover:bg-blue-600"
                  onClick={(e) => setIsModifyModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-l from-green-300 to-green-500 text-white rounded-lg px-4 py-2 ml-2 hover:bg-green-600"
                >
                  Guardar
                </button>
              </div>

              {successModify && (
                <Sucess mensaje="Transaccion modificada con éxito" />
              )}
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
