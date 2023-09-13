import ProtoTypes from "prop-types";
import { BsArrowDownUp } from "react-icons/bs";
import { useEffect, useState } from "react";
import ClientInfo from "./ClientInfo";

const TransactionTab = () => {
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
            <th className="px-6 py-5 xl:px-0" style={{ whiteSpace: "nowrap" }}>
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
          {/* <ClientInfo />  */}
          {/* <ClientInfo /> */}
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
