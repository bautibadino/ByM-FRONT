import ProtoTypes from "prop-types";
import { BsArrowDownUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import TransactionInfo from "./TransactionInfo";

const TransactionTab = ({bdSeller}) => {

  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const response = await fetch("http://localhost:4000/api/transactions");
    const data = await response.json();
    setTransactions(data.data.transaction)

  }
  const pageSize =20
  useEffect(() => {
    getTransactions();
  }
  , []);

  return (
    <div className="table-content w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="ml-4 border-b border-bgray-300 dark:border-darkblack-400">
            <th className="inline-block w-[250px] px-6 py-5 lg:w-auto xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="ml-8 text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Cliente
                </span>
              </div>
            </th>
            <th className="px-6 py-5 xl:px-0 whitespace-nowrap" >
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-center font-medium text-bgray-600 dark:text-bgray-50">
                  Medio de pago
                </span>
              </div>
            </th>
            <th className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Vendedor
                </span>
              </div>
            </th>
            <th className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Productos
                </span>
              </div>
            </th>
            <th className="w-[165px] px-6 py-5 xl:px-0">
              <div className="flex w-full items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Total
                </span>
              </div>
            </th>
            <th className="px-6 py-5 xl:px-0">
              <div className="flex items-center space-x-2.5">
                <span className="text-base font-medium text-bgray-600 dark:text-bgray-50">
                  Status
                </span>
              </div>
            </th>
            <th className="px-6 py-5 xl:px-0"></th>
          </tr>
        </thead>
        <tbody>
        {transactions?.map((transaction, index) =>
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
