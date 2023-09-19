import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import logo from "../../assets/images/logo/logo-short.svg";
import logoW from "../../assets/images/logo/logo-short-white.svg";
import { GrTransaction } from "react-icons/gr";

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
                        <AiFillHome className="text-darkblack-600 dark:text-white hover:text-yellow-400 text-xl hover:scale-105"/>
                      </button>
                    </Link>
                    
                  </li>
                  <li className="item px-[43px] py-[11px]">
                    <Link to="/clientes">
                      <button className="dark:text-white">
                      <BsFillPeopleFill className=""/>
                      </button>
                    </Link>
                  </li>
                  <li className="item px-[43px] py-[11px] dark:text-white">
                    <Link to="/transacciones">
                      <span className="">
                      <GrTransaction className="dark:text-white"/>
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
