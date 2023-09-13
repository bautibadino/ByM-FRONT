import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
const SellerSelector = () =>{
  const [active, setActive] = useState(false);
  const [seller, setSeller] = useState("Filtra por vendedor");

  const sellers = [
    "Ariel Monti",
    "Cesar Badino",
  ];

  const newSeller = (seller) => {
    setSeller(seller);
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
            {seller}
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
        <ul className="contain">
          {
            sellers.map((seller) => {
              return (
                <li
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
