import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const LineChart = ({ transactions }) => {
  const transactionsByType = {}; 
  let transaccionesCash = [];
  let transaccionesDebitCard = [];
  let transaccionesCreditCard = [];
  let transaccionesCheck = [];
  let transaccionesBankTransfer = [];
  let transaccionesOthers = [];
console.log(transactions)

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
      case 'OTHER':
        transaccionesOthers.push(transaccion);
        break;
      // Puedes agregar más casos según tus tipos de pago
    }
  });
  console.log('cash', transaccionesCash);
  console.log('debit', transaccionesDebitCard);
  console.log('credit', transaccionesCreditCard);
  console.log('check', transaccionesCheck);
  console.log('bank', transaccionesBankTransfer);
  console.log('others', transaccionesOthers);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    Animation: true

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
        label: "Transacciones",
        data:[transaccionesCash.length, transaccionesCreditCard.length, transaccionesDebitCard.length, transaccionesCheck.length, transaccionesBankTransfer.length, transaccionesOthers.length],
        backgroundColor: [
          "#8400ff",
          "#ff0048",
          "#00ffc8",
          "#b7ff00",
          "#fd4r00",
          "#ff0000",
        ],
      }
    ],
  };  

  return (

    <Pie
    data={data}
    options={options}/>
  );
};
