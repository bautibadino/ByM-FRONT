import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const SellerSelector = ({onSellerChange, seller}) =>{
  const [active, setActive] = useState(false);

  const sellers = [
    "Ariel Monti",
    "Cesar Badino",
    "Damian Massimino",
    "Bautista Badino",
  ];

  const newSeller = (seller) => {
    setActive(false);
    onSellerChange(seller);
  }
  return (
    <div className="w-1/3 h-full relative mb-5">
      <span className="mb-2 text-darkblack-600 dark:text-white whitespace-nowrap">Filtra por vendedor</span>
      <button
        aria-label="none"
        onClick={() => setActive(!active)}
        type="button"
        className="w-full h-full flex justify-center items-center bg-slate-100 rounded-md "
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-base ext-bgray-50 font-semibold w-full text-darkblack-600">
            {seller}
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
        <ul className="contain">
          {
            sellers.map((seller) => {
              return (
                <li
                  key={seller}
                  onClick={() => newSeller(seller)}
                  className="text-sm whitespace-nowrap text-bgray-90 cursor-pointer px-5 py-2 hover:bg-bgray-100 font-semibold"
                >
                  {seller}
                </li>
              )
            })
          }

        </ul>
      </div>
    </div>
  );
}

export default SellerSelector;
