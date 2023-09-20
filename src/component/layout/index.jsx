import ProtoTypes from "prop-types";
import Sidebar from "../sidebar";
import Overlay from "../overlay";
import SidebarV2 from "../sidebar/SidebarV2";
import HeaderOne from "../header/HeaderOne";
import HeaderTwo from "../header/HeaderTwo";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

function Layout({ bg, overlay, children }) {
  const [sidebar, setSidebar] = useState(true);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "" || localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : ""
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`layout-wrapper ${sidebar && "active"}  w-full`}>
        <div className="relative flex w-full min-h-screen">
          <Sidebar handleActive={() => setSidebar(!sidebar)} />
          {overlay ? overlay : <Overlay />}
          <SidebarV2 />
          <div
            className={`body-wrapper flex-1 overflow-x-hidden ${
              bg ? bg : "dark:bg-darkblack-500"
            } `}
          >
            <HeaderOne handleSidebar={() => setSidebar(!sidebar)} />
            {/* <HeaderTwo handleSidebar={() => setSidebar(!sidebar)} /> */}
            {children}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  bg: ProtoTypes.string,
  overlay: ProtoTypes.node,
  children: ProtoTypes.node,
};

export default Layout;
