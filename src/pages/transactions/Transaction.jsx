
import Layout from "../../component/layout";
import { StatusGraph } from "./StatusGraph";
import ListTab from "./ListTab";
import { useState } from "react";
import { PaymentTypeGraph } from "./PaymentTypeGraph";

const Transaction = () => {
  // ESTE APARTADO ES PARA REGISTRAR MOVIMIENTOS DIARIOS DE CAJA, SIN MUCHO DETALLE
  const [transactions, setTransactions] = useState([]);

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
  const handleSetTransaction =  (transaction) => {
    setTransactions(transaction)
  }
  const handleGetTransactions =  () => {
    getTransactions()
  }
  return (
    <Layout>
      <main className="w-full xl:px-12 px-6 pb-6 xl:pb-12 sm:pt-[156px] pt-[100px]">
        {/* write your code here */}
        <div className="2xl:flex 2xl:space-x-[48px]">
          <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
            <ListTab transactions={transactions} handleSetTransaction={handleSetTransaction} pageSize={50} handleGetTransactions={handleGetTransactions}/>
          </section>
          <section className="w-full">
            {/* <StatusGraph className="w-full" transactions={transactions}/> */}
            <PaymentTypeGraph className="w-full" transactions={transactions}/>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Transaction;
