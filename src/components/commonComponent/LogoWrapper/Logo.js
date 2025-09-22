import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import SettingContext from "../../../helper/settingContext";
import I18NextContext from "@/helper/i18NextContext";

const Logo = () => {
  const { state } = useContext(SettingContext);
  const { i18Lang } = useContext(I18NextContext);
  return (
    <Link href={`/${i18Lang}/dashboard`}>
      {state?.setLightLogo?.original_url ? <Image className="for-white" src={`${state?.setLightLogo?.original_url}`} alt="Light Logo" width={100} height={35} priority /> : <h2 className="text-white">FastKart</h2>}
    </Link>
  );
};

export default Logo;
