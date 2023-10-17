import React, { useEffect, useState } from "react";
import { BsArrowBarDown } from "react-icons/bs";
import PaginationV2 from "../../component/Pagination/PaginationV2";
import PaginationV1 from "../../component/Pagination/PaginationV1";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

export const CheckTable = ({ cheques, searchTerm, filteredChecks, checkList }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    const newExpandedItems = cheques.map((check) => false);
    setExpandedItems(newExpandedItems);
  }, [cheques]);

  const handleModalExpand = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  const renderChecks = filteredChecks.slice(0, 30); // Tomar solo los primeros 30 cheques

  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-row items-center justify-around w-full mb-6 dark:text-white">
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Numero</span>
        </div>
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Monto</span>
        </div>
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Vencimiento</span>
        </div>
        <div className="w-1/4 text-center font-bold text-lg">
          <span>Ver mas</span>
        </div>
      </div>
      <ul className="w-full">
        {renderChecks.map((cheque, index) => {
          return (
            <li
              key={cheque._id}
              className="flex flex-col justify-around w-full mb-6 dark:text-white"
            >
              <div className="flex flex-row">
                <div className="w-1/4 text-center font-bold text-lg">
                  <span>{cheque.chequeNumber}</span>
                </div>
                <div className="w-1/4 text-center font-bold text-lg">
                  <span>$ {cheque.amount}</span>
                </div>
                <div className="w-1/4 text-center font-bold text-lg">
                  <span>{formatDate(cheque.expiredDate)}</span>
                </div>
                <div className="w-1/4 text-center font-bold text-lg">
                  <button onClick={() => handleModalExpand(index)}>
                    <BsArrowBarDown />
                  </button>
                </div>
              </div>
              {expandedItems[index] && (
                <div className="flex flex-col items-center justify-center">
                  <label htmlFor="">librador</label>
                  <input type="text" value={cheque.librador} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
