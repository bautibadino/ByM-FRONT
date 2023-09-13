import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const PaymentSelector = () =>{
  const [active, setActive] = useState(false);
  const [ payment, setPayment ] = useState("Filtra por medio de pago");
  const payments = [
    'Efectivo',
    'Tarjeta de crédito',
    'Tarjeta de débito',
    'Cheque',
    'Transferencia',
  ];

  const newPayment = (payment) => {
    setPayment(payment);
    setActive(false);
  }

  return (
    <div className="w-1/4 h-full relative mb-5">
      <button
        aria-label="none"
        onClick={() => setActive(!active)}
        type="button"
        className="w-full h-full flex justify-center items-center"
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-base text-bgray-600 dark:text-bgray-50 font-semibold">
            {payment}
          </span>
          <span>
            <MdOutlineKeyboardArrowDown className="text-darkblack-600 dark:text-white"/>
          </span>
        </div>
      </button>
      <div
        id="date-selector-filter"
        className={`rounded-lg shadow-lg bg-white w-full absolute right-0 z-10 top-5 overflow-hidden ${
          active ? "block" : "hidden"
        } `}
      >
        <ul>
          {
            payments.map((payment) => {
              return (
                <li
                  onClick={() => newPayment(payment)}
                  className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
                >
                  {payment}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default PaymentSelector;
