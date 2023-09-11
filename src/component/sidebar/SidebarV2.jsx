import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import logo from "../../assets/images/logo/logo-short.svg";
import logoW from "../../assets/images/logo/logo-short-white.svg";

function SidebarV2() {
  return (
    <aside className="relative hidden w-[96px] bg-white dark:bg-black sm:block">
      <div className="sidebar-wrapper-collapse relative top-0 z-30 w-full">
        <div className="sidebar-header sticky top-0 z-20 flex h-[108px] w-full items-center justify-center border-b border-r border-b-[#F7F7F7] border-r-[#F7F7F7] bg-white dark:border-darkblack-500 dark:bg-darkblack-600">
          <Link to="/">
            <img src={logo} className="block dark:hidden" alt="logo" />
            <img src={logoW} className="hidden dark:block" alt="logo" />
          </Link>
        </div>
        <div className="sidebar-body w-full pt-[14px]">
          <div className="flex flex-col items-center">
            <div className="nav-wrapper mb-[36px]">
              <div className="item-wrapper mb-5">
                <ul className="mt-2.5 flex flex-col items-center justify-center">
                  <li className="item px-[43px] py-[11px]">
                    <Link to="/">
                      <button>
                        <AiFillHome className="text-white text-xl hover:scale-105"/>
                      </button>
                    </Link>
                    
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link to="/clientes">
                      <button>
                      <BsFillPeopleFill className="text-white text-xl hover:scale-105"/>
                      </button>
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link to="/statistics">
                      <span className="item-ico">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 11C18 15.9706 13.9706 20 9 20C4.02944 20 0 15.9706 0 11C0 6.02944 4.02944 2 9 2C13.9706 2 18 6.02944 18 11Z"
                            fill="#1A202C"
                            className="path-1"
                          />
                          <path
                            d="M19.8025 8.01277C19.0104 4.08419 15.9158 0.989557 11.9872 0.197453C10.9045 -0.0208635 10 0.89543 10 2V8C10 9.10457 10.8954 10 12 10H18C19.1046 10 20.0209 9.09555 19.8025 8.01277Z"
                            fill="#22C55E"
                            className="path-2"
                          />
                        </svg>
                      </span>
                    </Link>
                    
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidebarV2;
