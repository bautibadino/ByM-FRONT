import ProtoTypes from "prop-types";
import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import OptionsTransactions from "./OptionsTransactions";

const TransactionInfo = ({transaction, bdSeller}) => {
  const {client, paymentType, seller, status, description, total} = transaction;
  const [sellerName, setSellerName] = useState('');
  console.log(bdSeller);
  //filtrar nombre de vendedor comparando id del vendedor de transaccion con el bdSeller

  const getSellerName = async () => {
    bdSeller.find((vendedor) => (vendedor._id === seller) ? setSellerName(vendedor.firstName) : null
    )
  }
  useEffect(() => {
    getSellerName();
  }, []);
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5 text-center">
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {client}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {paymentType}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {sellerName}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {description}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {total}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          {status}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-center">
          <button
            aria-label="Options"
            type="button"
            onClick={() => setOptionsActive(true)}
          >
          </button>
          {/* <OptionsTransactions/> */}
        </div>
            {/* <SlOptionsVertical /> */}
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
