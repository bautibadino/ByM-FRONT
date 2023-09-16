import ProtoTypes from "prop-types";
import { BsArrowDownUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import TransactionInfo from "./TransactionInfo";


const TransactionTab = ({bdSeller, getTransactions, transactions, seller, month, payment}) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [monthNumber, setMonthNumber] = useState(0);
  const pageSize = 100;
  const numberMonths = {
    "Enero": "01",
    "Febrero": "02",
    "Marzo": "03",
    "Abril": "04",
    "Mayo": "05",
    "Junio": "06",
    "Julio": "07",
    "Agosto": "08",
    "Septiembre": "09",
    "Octubre": "10",
    "Noviembre": "11",
    "Diciembre": "12"
  }
  const paymentType = {
    "Efectivo": "CASH",
    "Tarjeta de crédito": "CREDIT_CARD",
    "Tarjeta de débito": "DEBIT_CARD",
    "Cheque": "CHECK",
    "Transferencia": "TRANSFER"
  }


  useEffect(() => {
    getTransactions();
  }
  , []);

  useEffect(() => {
    filterTransactions();
    // orderTransactions();
  }, [seller, month, payment, transactions]);

  useEffect(() => {
    orderTransactions();
  }, []);
  const filterTransactions = () => {
    const filtered = transactions.filter((transaction) => {
      const sellerMatch = seller === "" || transaction.seller === bdSeller.find((vendedor) => vendedor.firstName === seller)._id;
      const paymentMatch = payment === "" || transaction.paymentType === paymentType[payment];
      const monthMatch = month === "" || transaction.month === numberMonths[month];
      return sellerMatch && paymentMatch && monthMatch;
    });
    setFilteredTransactions(filtered);
  };
  
  const orderTransactions = () => {
    const ordered = [...filteredTransactions]; // Clonar el arreglo para no modificarlo directamente
    ordered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    setFilteredTransactions(ordered);
  };
  
  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="w-full border-b border-bgray-300 dark:border-darkblack-400">
          <th className="tw-1/7 px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full justify-center items-center space-x-2.5 text-center">
                <span className="w-full text-left text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Fecha
                </span>
              </div>
            </th>
            <th className="w-1/7 px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full justify-center items-center space-x-2.5 text-center">
                <span className="w-full text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Cliente
                </span>
              </div>
            </th>
            <th className="w-1/7 px-6 py-5 xl:px-0 whitespace-nowrap" >
              <div className="flex w-full items-center space-x-2.5 text-center">
                <span className="w-full font-medium text-bgray-600 dark:text-bgray-50">
                  Medio de pago
                </span>
              </div>
            </th>
            <th className="w-1/7 px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5 text-center">
                <span className="w-full text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Vendedor
                </span>
              </div>
            </th>
            {/* <th className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Productos
                </span>
              </div>
            </th> */}
            <th className="w-1/7 px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5 text-center">
                <span className="w-full text-base text-center font-medium text-bgray-600 dark:text-bgray-50">
                  Total
                </span>
              </div>
            </th>
            <th className="w-1/7 px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5 text-center">
                <span className="w-full text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Status
                </span>
              </div>
            </th>
            <th className="px-6 py-5 xl:px-0">
              
            </th>
          </tr>
        </thead>
        <tbody>
        {filteredTransactions?.map((transaction, index) =>
              pageSize ? (
                index + 1 <= pageSize && (
                  <TransactionInfo
                  key={transaction._id}
                  transaction={transaction}
                  bdSeller={bdSeller}
                  />
                )
              ) : index < 3 && (
                <TransactionInfo
                  key={transaction._id}
                  transaction={transaction}
                  bdSeller={bdSeller}
                />
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

TransactionTab.propTypes = {
  pageSize: ProtoTypes.number,
  searchFilter: ProtoTypes.string,
};

export default TransactionTab;
