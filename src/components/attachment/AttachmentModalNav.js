import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Nav, NavItem, NavLink } from 'reactstrap'
import usePermissionCheck from '../../utils/hooks/usePermissionCheck';
import I18NextContext from "@/helper/i18NextContext";

const AttachmentModalNav = ({ tabNav, setTabNav, isattachment }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [create] = usePermissionCheck(["create"], "attachment");
    return (
        <Nav className="nav-tabs" role="tablist">
            {!isattachment && <NavItem>
                <NavLink className={tabNav === 1 ? "active" : ""} onClick={() => setTabNav(1)}>{t("SelectFile")} </NavLink>
            </NavItem >}
            {create && <NavItem className="nav-item">
                <NavLink className={tabNav === 2 ? "active" : ""} onClick={() => setTabNav(2)}>{t("UploadNew")}</NavLink>
            </NavItem>}

        </Nav>
    )
}

export default AttachmentModalNav