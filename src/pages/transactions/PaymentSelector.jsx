import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const PaymentSelector = ({onPaymentChange, payment}) =>{
  const [active, setActive] = useState(false);


  const payments = [
    'Efectivo',
    'Tarjeta de crédito',
    'Tarjeta de débito',
    'Cheque',
    'Transferencia',
  ];

  const newPayment = (payment) => {
    setActive(false);
    onPaymentChange(payment)
  }
   

  return (
    <div className="selector w-full mt-8 md:w-1/3 relative md:mx-2 md:mb-5 h-[40px]">
      <span className="mb-2 text-darkblack-600 dark:text-white whitespace-nowrap">Filtra por medio de pago</span>
      <button
        aria-label="none"
        onClick={() => setActive(!active)}
        type="button"
        className="w-full h-full flex justify-center items-center bg-slate-100 rounded-md"

      >
        <div className="flex justify-between w-full items-center">
          <span className="text-base  text-darkblack-600 font-semibold w-full">
            {payment}
          </span>
          <span>
            <MdOutlineKeyboardArrowDown className="text-darkblack-600 dark:text-white"/>
          </span>
        </div>
      </button>
      <div
        id="date-selector-filter"
        className={`rounded-lg shadow-lg text-center bg-white w-full absolute right-0 z-10 top-15 overflow-hidden ${
          active ? "block" : "hidden"
        } `}
      >
        <ul>
          {
            payments.map((payment) => {
              return (
                <li
                  key={payment}
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
