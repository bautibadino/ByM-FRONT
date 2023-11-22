import React, { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";

export const CheckForm = ({handleSubmit, error, success}) => {
  const [cheque, setCheque] = useState({
    chequeNumber: "",
    expiredDate: "",
    drawer: "",
    bank: "",
    bankPlace: "",
    deliveredBy: "",
    employee: "",
    amount: "",
    deliveredTo: "",
    cuit: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setCheque((prevCheque) => ({
      ...prevCheque,
      [name]: value,
    }));
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    handleSubmit(e, cheque);
    setCheque({
      chequeNumber: "",
      expiredDate: "",
      drawer: "",
      bank: "",
      bankPlace: "",
      deliveredBy: "",
      employee: "",
      cuit: "",
      deliveredTo: "",
      amount: "",
      status: "",
    });

  };



  return (
    <div className="flex flex-col w-full justify-center items-center">
      <form className="flex flex-col justify-between mb-10"
      onSubmit={onSubmit}
      >
        <div className="flex flex-row w-full mb-3 ">
          <div className="mx-2 flex flex-col">
            <label 
            htmlFor="chequeNumber"
            className="dark:text-white">Numero:</label>
            <input
            id="chequeNumber"
            onChange={handleInputChange}
            onFocus={handleInputChange}
            value={cheque.chequeNumber}
            name="chequeNumber"
            type="text" 
            className="border-none rounded-md" />
          </div>
          <div className="mx-2 flex flex-col">
            <label 
            htmlFor="expiredDate"
            className="dark:text-white">Fecha de vencimiento:</label>
            <input 
            id="expiredDate"
            onChange={handleInputChange}
            onFocus={handleInputChange}
            value={cheque.expiredDate}
            name="expiredDate"
            type="date" 
            className="border-none rounded-md" />
          </div>
        </div>
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="drawer"
          className="dark:text-white">Librador:</label>
          <input
          id="drawer"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          value={cheque.drawer}
          name="drawer"
          type="text" className="border-none rounded-md"/>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="bank"
          className="dark:text-white">Banco:</label>
          <input
          id="bank"
          onChange={handleInputChange} 
          onFocus={handleInputChange}
          value={cheque.bank}
          name="bank"
          type="text" className="border-none rounded-md" />
        </div>
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="bankPlace"
          className="dark:text-white">Plaza:</label>
          <input 
          id="bankPlace"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          value={cheque.bankPlace}
          name="bankPlace"
          type="text" className="border-none rounded-md"/>
        </div>
        
        </div>
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="cuit"
          className="dark:text-white">Cuit:</label>
          <input 
          id="cuit"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          value={cheque.cuit}
          name="cuit"
          type="text" className="border-none rounded-md"/>
        </div>
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="deliveredBy"
          className="dark:text-white">Entregado por:</label>
          <input
          id="deliveredBy"
          onChange={handleInputChange} 
          onFocus={handleInputChange}
          value={cheque.deliveredBy}
          name="deliveredBy"
          type="text" className="border-none rounded-md"/>
        </div>
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="employee"
          className="dark:text-white">Cargado por:</label>
          <input
          id="employee"
          onChange={handleInputChange} 
          onFocus={handleInputChange}
          value={cheque.employee}
          name="employee"
          ype="text" className="border-none rounded-md"/>
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col mx-2">
          <label 
          htmlFor="amount"
          className=" dark:text-white ">Monto:</label>
          <div className="flex flex-row items-center">
            <span className="mr-2 dark:text-white">$</span>
            <input
            id="amount"
            onChange={handleInputChange}
            onFocus={handleInputChange} 
            value={cheque.amount}
            name="amount"
            type="number" className="border-none rounded-md w-full"/>
          </div>
        </div>
        <div className="flex flex-col mx-2 w-1/2">
          <label 
          htmlFor="status"
          className="dark:text-white">Estado:</label>
          <select 
          id="status"
          onChange={handleInputChange}
          onFocus={handleInputChange}
          value={cheque.status}
          name="status"
          className="border-none rounded-md">
            <option value="PENDING">EN CARTERA</option>
            <option value="DELIVERED">ENTREGADO</option>
            <option value="COLLECTED">COBRADO</option>
            <option value="DEPOSITED">DEPOSITADO</option>
          </select>
        </div>
        </div>
        <button
        type="submit"
        className="rounded-md px-3 py-2 bg-green-400 mt-10  ">
          Enviar
        </button>
        {
          error? <div className="px-4 py-2 bg-red-400 mt-6 rounded-md">
            <p className="text-center font-semibold  uppercase text-white">Debes completar todos los campos</p>
          </div> : null
        }
        {
          success? <div className="px-4 py-2 bg-green-400 mt-6 rounded-md">
          <p className="text-center font-semibold  uppercase text-white">Cheque creado con éxito</p>
        </div> : null
        }
      </form>
    </div>
  );
};
