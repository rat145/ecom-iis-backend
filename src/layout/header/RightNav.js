import Link from "next/link";
import { RiMoonLine, RiSearchLine } from "react-icons/ri";
import { Col } from "reactstrap";
import useOutsideDropdown from "../../utils/hooks/customHooks/useOutsideDropdown";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import Language from "./Language";
import NotificationBox from "./NotificationBox";
import ProfileNav from "./ProfileNav";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";

const RightNav = ({ setMode, setOpenSearchBar }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [isProductCreate] = usePermissionCheck(["create"], "product");
  const [isOrderCreate] = usePermissionCheck(["create"], "order");
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  return (
    <Col className="nav-right pull-right right-header p-0">
      <div className="header-btns d-none d-lg-flex">
        {isProductCreate && <Link href={`/${i18Lang}/product/create`} className="btn btn-outline">{t("AddProduct")}</Link>}
        {isOrderCreate && <Link href={`/${i18Lang}/order/create`} className="btn btn-animation">{t("AddOrder")}</Link>}
      </div>
      <ul className="nav-menus" ref={ref}>
        <li>
          <span className="header-search" onClick={() => setOpenSearchBar(true)}>
            <RiSearchLine />
          </span>
        </li>
        <Language isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
        <NotificationBox isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
        <li>
          <div className="mode">
            <RiMoonLine className="ri-moon-line" onClick={() => setMode((prev) => !prev)} />
          </div>
        </li>
        <ProfileNav isComponentVisible={isComponentVisible} setIsComponentVisible={setIsComponentVisible} />
      </ul>
    </Col>
  );
};

export default RightNav;
