import React, { useContext } from "react";
import ToggleButton from "./ToggleButton";
import Logo from "./Logo";
import Image from "next/image";
import SettingContext from "../../../helper/settingContext";

const LogoWrapper = ({ setSidebarOpen }) => {
  const { state } = useContext(SettingContext)
  return (
    <div className="logo-wrapper logo-wrapper-center">
      <Logo />
      <Image className="img-fluid logo-sm w-auto" src={state?.setTinyLogo?.original_url ? state?.setTinyLogo?.original_url : "/assets/images/logo/logo.png"} alt="Tiny Logo" width={100} height={100} />
      <ToggleButton setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default LogoWrapper;
