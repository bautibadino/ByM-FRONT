import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const LineChart = ({ 
  transactions,
  transaccionesCash,
transaccionesDebitCard,
transaccionesCreditCard,
transaccionesCheck,
transaccionesBankTransfer,
transaccionesOthers,}) => {


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
