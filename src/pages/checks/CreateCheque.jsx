import React, { useState } from "react";
import { CheckForm } from "./CheckForm";

export const CreateCheque = () => {
  const [checkData, setCheckData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e, cheque) => {
    e.preventDefault();
    console.log(cheque)
    if (cheque) {
      // Verifica que todas las propiedades del objeto 'cheque' estén completas
      const requiredProperties = [
        "chequeNumber",
        "expiredDate",
        "drawer",
        "bank",
        "bankPlace",
        "deliveredBy",
        "employee",
        "amount",
        "status",
      ];
      const missingProperties = requiredProperties.filter(
        (property) => !cheque[property]
      );

      if (missingProperties.length === 0) {
        setSuccess(true);
        fetch('http://localhost:4000/api/checks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cheque)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cheque creado con éxito', data);
        })
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        console.error("Faltan propiedades requeridas:", missingProperties);
      }
    }
  };

  const handleCheckData = (cheque) => {
    setCheckData(cheque);
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold text-darkblack-400 mt-6 dark:text-slate-200 ml-4">
          Crear cheques
        </h2>
      </div>
      <CheckForm
        handleSubmit={handleSubmit}
        handleCheckData={handleCheckData}
        error={error}
        success={success}
      />
    </div>
  );
};
