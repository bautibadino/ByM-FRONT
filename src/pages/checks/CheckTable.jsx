import React, { useEffect, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import PaginationV2 from "../../component/Pagination/PaginationV2";
import PaginationV1 from "../../component/Pagination/PaginationV1";
import exp from "constants";
import { render } from "react-dom";
import { Sucess } from "../../component/alerts/Sucess";

export const CheckTable = ({
  cheques,
  filteredChecks,
  currentPage,
  listasDeCheques,
}) => {
  const [expandedItems, setExpandedItems] = useState([]);
  const [checkData, setCheckData] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const renderChecks = filteredChecks.slice(0, 30); // Tomar solo los primeros 30 cheques

  console.log(listasDeCheques[currentPage]);


  const handleModalExpand = (e, index) => {
    e.preventDefault();
    const newExpandedItems = expandedItems.map((item, i) =>
      i === index ? !item : false
    );
    setExpandedItems(newExpandedItems);
    if (newExpandedItems[index]) {
      setCheckData({ ...renderChecks[index] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isDataChanged &&
      fetch(`http://localhost:4000/api/checks/${checkData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkData),
      })
        .then((response) => response.json())
        .then((data) => {
          setSucess(true);
          setTimeout(() => {
            setIsDataChanged(false);
            setSucess(false);
          }, 2000);
        });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckData({
      ...checkData,
      [name]: value,
    });
    setIsDataChanged(true); // Marcar cambios al editar un input
  };

  useEffect(() => {
    const newExpandedItems = cheques.map((check) => false);
    setExpandedItems(newExpandedItems);
  }, [cheques]);

  useEffect(() => {
    setIsDataChanged(false);
  }, [expandedItems]);

  const formatDate = (dateString) => {
    const fecha = new Date(dateString);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset()); // Ajusta la zona horaria
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();
    const fechaFormateada = `${dia.toString().padStart(2, "0")}/${mes
      .toString()
      .padStart(2, "0")}/${año}`;
    return fechaFormateada;
  };

  const cutDate = (dateString) => {
    const date = dateString.split("T");
    const day = date[0].split("-");
    const dayFormated = `${day[2]}/${day[1]}/${day[0]}`;
    return dayFormated;
  };

  const handleCloseAlert = () => {
    setSucess(false);
  };

  // Ordenar los cheques por fecha de vencimiento
  filteredChecks.sort(
    (a, b) => new Date(b.expiredDate) - new Date(a.expiredDate)
  );
  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-row items-center justify-around w-full mb-6 dark:text-white">
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Numero</span>
        </div>
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Monto</span>
        </div>
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Vencimiento</span>
        </div>
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Ver mas</span>
        </div>
      </div>
      <form className="" onSubmit={(e) => handleSubmit(e)}>
        <ul className="w-full">
          {listasDeCheques[currentPage-1]?.map((cheque, index) => {
            // console.log(cheque)
            return (
              <li
                key={cheque._id}
                className="flex flex-col justify-around w-full mb-6 dark:text-white"
              >
                <div className="flex flex-row">
                  <div className="w-1/4 text-center font-bold text-lg">
                    <span>{cheque.chequeNumber}</span>
                  </div>
                  <div className="w-1/4 text-center font-bold text-lg">
                    <span>$ {cheque.amount}</span>
                  </div>
                  <div className="w-1/4 text-center font-bold text-lg">
                    <span>{formatDate(cheque.expiredDate)}</span>
                  </div>
                  <div className="w-1/4 text-center font-bold text-lg">
                    <button onClick={(e) => handleModalExpand(e, index)}>
                      <BsArrowBarDown />
                    </button>
                  </div>
                </div>
                {expandedItems[index] && (
                  <div className="flex flex-col w-full justify-center items-center my-10">
                    <div className="flex flex-col w-full justify-center">
                      <div className="flex flex-col items-center justify-center mx-2 ">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="" className="">
                            Librador:
                          </label>
                        </div>
                        <input
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                          value={checkData.drawer}
                          onChange={handleInputChange} // Agregar onChange
                          name="drawer"
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center m-2 ">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="" className="">
                            Numero de cheque:
                          </label>
                        </div>
                        <input
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2 "
                          value={checkData.chequeNumber}
                          onChange={handleInputChange} // Agregar onChange
                          name="chequeNumber"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center m-2 ">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="" className="">
                            Fecha de vencimiento:
                          </label>
                        </div>
                        <input
                          type="date"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2 "
                          value={checkData.expiredDate}
                          onChange={handleInputChange} // Agregar onChange
                          name="expiredDate"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center m-2">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="">Entregado por:</label>
                        </div>
                        <input
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                          value={checkData.deliveredBy}
                          onChange={handleInputChange} // Agregar onChange
                          name="deliveredBy"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center m-2">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="">Estado de cheque:</label>
                        </div>
                        <select
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                          value={checkData.status}
                          onChange={handleInputChange} // Agregar onChange
                          name="status"
                        >
                          <option value="PENDING">EN CARTERA</option>
                          <option value="DELIVERED">ENTREGADO</option>
                          <option value="COLLECTED">COBRADO</option>
                          <option value="DEPOSITED">DEPOSITADO</option>
                        </select>
                      </div>
                    </div>
                    {
                      //Si el estado es entregado mostrar campo a quien se le entrego
                      checkData.status === "DELIVERED" && (
                        <div className="flex flex-col w-full justify-center ">
                          <div className="flex flex-col items-center justify-center m-2">
                            <div className="w-3/4 lg:w-1/2">
                              <label htmlFor="">A quien se le entrego:</label>
                            </div>
                            <input
                              type="text"
                              className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                              value={checkData.deliveredTo}
                              onChange={handleInputChange} // Agregar onChange
                              name="deliveredTo"
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center m-2">
                            <div className="w-3/4 lg:w-1/2">
                              <label htmlFor="">Fecha de actualizacion:</label>
                            </div>
                            <input
                              type="text"
                              className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                              value={cutDate(cheque.updatedAt)}
                              onChange={handleInputChange} // Agregar onChange
                              name="deliveredDate"
                            />
                          </div>
                        </div>
                      )
                    }
                    <div className="flex flex-col w-full justify-center ">
                      <div className="flex flex-col items-center justify-center m-2">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="">CUIT</label>
                        </div>
                        <input
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                          value={checkData.cuit}
                          onChange={handleInputChange} // Agregar onChange
                          name="cuit"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center m-2">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="">Banco</label>
                        </div>
                        <input
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                          value={checkData.bank}
                          onChange={handleInputChange} // Agregar onChange
                          name="bank"
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center m-2">
                        <div className="w-3/4 lg:w-1/2">
                          <label htmlFor="">Sucursal banco</label>
                        </div>
                        <input
                          type="text"
                          className="border-none rounded-md text-black w-3/4 lg:w-1/2"
                          value={checkData.bankPlace}
                          onChange={handleInputChange} // Agregar onChange
                          name="bankPlace"
                        />
                      </div>
                    </div>
                    <div className="w-1/4 text-center font-bold text-lg">
                      {/* Mostrar botón 'Actualizar' si hay cambios en los inputs */}
                      {isDataChanged && (
                        <button
                          className="bg-green-400 rounded-md px-4 py-2 mt-5 text-slate-100 dark:text-black"
                          type="submit"
                        >
                          Actualizar
                        </button>
                      )}
                    </div>
                    {sucess && (
                      <div className="w-3/4">
                        <Sucess
                          handleCloseAlert={handleCloseAlert}
                          mensaje={`Cheque modificado correctamente`}
                        />
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </form>
    </div>
  );
};
