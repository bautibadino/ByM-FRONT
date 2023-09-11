import ProtoTypes from "prop-types";
import bg from "../../assets/images/bg/upgrade-bg.png";
import logo from "../../assets/images/logo/logo-color.svg";
import logoW from "../../assets/images/logo/logo-white.svg";
import profileImg from "../../assets/images/avatar/profile-xs.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar({ handleActive }) {
  const [activeDashboard, setActiveDashboard] = useState(false);
  return (
    <aside className="sidebar-wrapper fixed top-0 z-30 block h-full w-[308px] bg-white dark:bg-darkblack-600 sm:hidden xl:block">
      <div className="sidebar-header relative z-30 flex h-[108px] w-full items-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] pl-[50px] dark:border-darkblack-400">
        <Link to="/">
          <img src={logo} className="block dark:hidden" alt="logo" />
          <img src={logoW} className="hidden dark:block" alt="logo" />
        </Link>
        <button
          aria-label="none"
          type="button"
          onClick={handleActive}
          className="drawer-btn absolute right-0 top-auto"
          title="Ctrl+b"
        >
          <span>
            <svg
              width="16"
              height="40"
              viewBox="0 0 16 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H16V40H10C4.47715 40 0 35.5228 0 30V10Z"
                fill="#22C55E"
              />
              <path
                d="M10 15L6 20.0049L10 25.0098"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
      <div className="sidebar-body overflow-style-none relative z-30 h-screen w-full overflow-y-scroll pb-[200px] pl-[48px] pt-[14px]">
        <div className="nav-wrapper mb-[36px] pr-[50px]">
          <div className="item-wrapper mb-5">
            <h4 className="border-b border-bgray-200 text-sm font-medium leading-7 text-bgray-700 dark:border-darkblack-400 dark:text-bgray-50">
              Menu
            </h4>
            <ul className="mt-2.5">
            <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Link to="/transaction">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-text text-lg font-medium leading-none">
                        Productos
                      </span>
                    </div>
                  </div>
                </Link>
              </li>

              <li className="item py-[11px] text-bgray-900 dark:text-white">
                <Link to="/clientes">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="item-text text-lg font-medium leading-none">
                        Clientes
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
        </div>
        

    </aside>
  );
}

Sidebar.propTypes = {
  handleActive: ProtoTypes.func,
};

export default Sidebar;
