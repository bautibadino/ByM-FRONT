import ProtoTypes from "prop-types";
import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import OptionsTransactions from "./OptionsTransactions";

const TransactionInfo = ({ transaction, bdSeller }) => {
  const {
    client,
    paymentType,
    seller,
    status,
    description,
    total,
    createdAt,
    formattedDate,
  } = transaction;
  const [sellerName, setSellerName] = useState("");
  const [optionsActive, setOptionsActive] = useState(false);
  if(optionsActive){
    console.log('eeeeee')
  }

  const getSellerName = async () => {
    bdSeller.find((vendedor) =>
      vendedor._id === seller ? setSellerName(vendedor.firstName) : null
    );
  };
  useEffect(() => {
    getSellerName();
  }, []);

  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-1/7 items-center space-x-2.5 text-center">
          <p className="text-base text-left w-full font-semibold text-bgray-900 dark:text-white">
            {formattedDate}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-1/7 items-center space-x-2.5 text-center">
          <p className="text-base  w-full font-semibold text-bgray-900 dark:text-white">
            {client}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-1/7 items-center space-x-2.5 text-center">
          <p className="text-base w-full  font-semibold text-bgray-900 dark:text-white">
            {
              {
                CASH: "Efectivo",
                CREDIT_CARD: "Tarjeta de crédito",
                DEBIT_CARD: "Tarjeta de débito",
                CHECK: "Cheque",
                TRANSFER: "Transferencia",
              }[paymentType]
            }
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-1/7 items-center space-x-2.5 text-center">
          <p className="text-base w-full  font-semibold text-bgray-900 dark:text-white">
            {sellerName}
          </p>
        </div>
      </td>
      {/* <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {description}
        </p>
      </td> */}
      <td className="px-6 py-5 xl:px-0 ">
        <div className="flex w-1/7 items-center space-x-2.5 text-center">
          <p className="text-base w-full  font-semibold text-bgray-900 dark:text-white">
            ${total}
          </p>
        </div>
      </td>
      {status === "PAID" ? (
        <td className="text-center ">
          <p className="text-base px-3 font-semibold text-bgray-900 dark:text-white bg-gradient-to-b from-green-700 to-green-500 rounded-xl">
            {status === "PAID" ? "PAGADO" : "FIADO"}
          </p>
        </td>
      ) : (
        <td className="text-center ">
          <p className="text-base px-3 font-semibold text-bgray-900 dark:text-white bg-gradient-to-b from-red-600 to-red-400 rounded-lg">
            {status === "PAID" ? "PAGADO" : "FIADO"}
          </p>
        </td>
      )}

      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button
            aria-label="Options"
            type="button"
            onClick={() => setOptionsActive(!optionsActive)}
          >
            <SlOptionsVertical />
          </button>
        </div>
      </td>
    </tr>
  );
};

TransactionInfo.propTypes = {
  img: ProtoTypes.string,
  name: ProtoTypes.string,
  email: ProtoTypes.string,
  location: ProtoTypes.string,
  spent: ProtoTypes.string,
};

export default TransactionInfo;
