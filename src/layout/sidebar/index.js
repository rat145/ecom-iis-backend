import React, { useContext, useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import LogoWrapper from "../../components/commonComponent/LogoWrapper";
import MENUITEMS from "./MenuData";
import AccountContext from "../../helper/accountContext";
const MenuList = dynamic(() => import("./MenuList"), {
  ssr: false,
})
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState([]);
  const { role, setRole } = useContext(AccountContext)
  let storePermission = {};
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) storePermission = localStorage.getItem("account") && JSON.parse(localStorage.getItem("account"));
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, [])

  return (
    <div className={`sidebar-wrapper ${sidebarOpen ? "close_icon" : ""}`}>
      <div id="sidebarEffect" />
      <div className={`${mounted ? 'skeleton-loader' : ""}`}>
        <LogoWrapper setSidebarOpen={setSidebarOpen} />
        <nav className="sidebar-main">
          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              <MenuList menu={MENUITEMS} level={0} activeMenu={activeMenu} setActiveMenu={setActiveMenu} key={role} />
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
