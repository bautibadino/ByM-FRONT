import React, { useEffect } from "react";
import { LineChart } from "./LineChart";

export const PaymentTypeGraph = ({ transactions }) => {
  let transaccionesCash = [];
  let transaccionesDebitCard = [];
  let transaccionesCreditCard = [];
  let transaccionesCheck = [];
  let transaccionesBankTransfer = [];
  let transaccionesOthers = [];

  transactions.forEach((transaccion) => {
    switch (transaccion.paymentType) {
      case "CASH":
        transaccionesCash.push(transaccion);
        break;
      case "DEBIT_CARD":
        transaccionesDebitCard.push(transaccion);
        break;
      case "CREDIT_CARD":
        transaccionesCreditCard.push(transaccion);
        break;
      case "CHECK":
        transaccionesCheck.push(transaccion);
        break;
      case "BANK_TRANSFER":
        transaccionesBankTransfer.push(transaccion);
        break;
      case "OTHER":
        transaccionesOthers.push(transaccion);
        break;
      // Puedes agregar más casos según tus tipos de pago
    }
  });

  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600 flex flex-col items-center justify-center ">
      <div className="w-full bg-slate-100 rounded-md flex flex-col justify-center items-center mt-3 md:w-3/4">
        <h3 className="text-xl font-bold text-center mt-3">TIPO DE PAGO</h3>
        <div className="flex flex-col w-full my-6">
          <div>
            <LineChart
              transactions={transactions}
              transaccionesCash={transaccionesCash}
              transaccionesDebitCard={transaccionesDebitCard}
              transaccionesCreditCard={transaccionesCreditCard}
              transaccionesCheck={transaccionesCheck}
              transaccionesBankTransfer={transaccionesBankTransfer}
              transaccionesOthers={transaccionesOthers}
            />
          </div>
          <div className="flex flex-col items-start justify-center m-5">
            <p className="text-lg text-darkblack-600 mb-5">
              Cantidad total de transacciones: {transactions.length}
            </p>
            <p className="text-md text-darkblack-600">
              Transacciones en efectivo: {transaccionesCash.length}
            </p>
            <p className="text-md text-darkblack-600">
              Transacciones con tarjeta de credito:{" "}
              {transaccionesCreditCard.length}
            </p>
            <p className="text-md text-darkblack-600">
              Transacciones con tarjeta de debito:{" "}
              {transaccionesDebitCard.length}
            </p>
            <p className="text-md text-darkblack-600">
              Transacciones con cheque: {transaccionesCheck.length}
            </p>
            <p className="text-md text-darkblack-600">
              Transacciones con transferencia bancaria:{" "}
              {transaccionesBankTransfer.length}
            </p>
            <p className="text-md text-darkblack-600">
              Transacciones con otros medios: {transaccionesOthers.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
