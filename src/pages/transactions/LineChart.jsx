import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const LineChart = ({ transactions }) => {
  const transactionsByType = {};

  let transaccionesCash = [];
  let transaccionesDebitCard = [];
  let transaccionesCreditCard = [];
  let transaccionesCheck = [];
  let transaccionesBankTransfer = [];
  let transaccionesOthers = [];

  transactions.forEach(transaccion => {
    switch (transaccion.paymentType) {
      case 'CASH':
        transaccionesCash.push(transaccion);
        break;
      case 'DEBIT_CARD':
        transaccionesDebitCard.push(transaccion);
        break;
      case 'CREDIT_CARD':
        transaccionesCreditCard.push(transaccion);
        break;
      case 'CHECK':
        transaccionesCheck.push(transaccion);
        break;
      case 'BANK_TRANSFER':
        transaccionesBankTransfer.push(transaccion);
        break;
      case 'OTHERS':
        transaccionesOthers.push(transaccion);
        break;
      // Puedes agregar más casos según tus tipos de pago
    }
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {

    labels: [
      "Efectivo",
      "Tarjeta de credito",
      "Tarjeta de debito",
      "Cheque",
      "Transferencia bancaria",
      "Otros",
    ],
    datasets: [
      {
        label: "Tipo de pago",
        data: [transaccionesCash, transaccionesCreditCard, transaccionesDebitCard, transaccionesCheck, transaccionesBankTransfer, transaccionesOthers],
        backgroundColor: ["#00d91d", "#ff1303"],
      },
    ],
  };

  return (
    <Line
    data={data}
    options={options}/>
  );
};
