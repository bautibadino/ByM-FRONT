import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const MonthSelector = ({onMonthChange, month}) =>{
  const [active, setActive] = useState(false);

  
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  const newMonth = (month) => {
    setActive(false);
    onMonthChange(month)
  }

  return (
    <div className="w-1/3 h-full relative mb-5">
      <span className="mb-2 text-darkblack-600 dark:text-white whitespace-nowrap">Filtra por mes</span>
 
      <button
        aria-label="none"
        onClick={() => setActive(!active)}
        type="button"
        className="w-full h-full flex justify-center items-center bg-slate-100 rounded-md"
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-base  text-darkblack-600 font-semibold w-full">
            {month}
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
            months.map((month) => {
              return (
                <li
                  key={month}
                  onClick={() => newMonth(month)}
                  className="text-sm  text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
                >
                  {month}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default MonthSelector;
