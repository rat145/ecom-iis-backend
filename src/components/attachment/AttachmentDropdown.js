import React, { useContext, useState } from "react";
import { useTranslation } from "@/app/i18n/client";
import { RiDeleteBin2Line, RiDeleteBinLine, RiMoreFill } from "react-icons/ri";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import I18NextContext from "@/helper/i18NextContext";

const AttachmentsDropdown = ({ state, dispatch, id }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [modal, setModal] = useState(false);
    const [destroy] = usePermissionCheck(["destroy"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    let temp = [...state.deleteImage];

    const openModal = (e) => {
        e.preventDefault()
        setModal(true)
    }

    const deleteImage = (id) => {
        temp.splice(temp.indexOf(id), 1);
        dispatch({ type: "DeleteSelectedImage", payload: temp });
        setModal(false)
    }
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle><RiMoreFill /></DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                {destroy ? <li>
                    <DropdownItem className="dropdown-item d-flex align-items-center" onClick={openModal}>
                        <RiDeleteBin2Line className="me-2" />{t("Delete")}
                    </DropdownItem>
                    <ShowModal open={modal} close={false}
                        buttons={
                            <>
                                <Btn title="No" onClick={() => setModal(false)} className="btn--no btn-md fw-bold" />
                                <Btn title="Yes" className="btn-theme btn-md fw-bold" onClick={() => {
                                    deleteImage(id)
                                }} />
                            </>
                        }>
                        <div className="remove-box">
                            <RiDeleteBinLine className="ri-delete-bin-line icon-box" />
                            <h2>{t("DeleteItem")}?</h2>
                            <p>{t("ThisItemWillBeDeletedPermanently") + " " + t("YouCan'tUndoThisAction!!")} </p>
                        </div>
                    </ShowModal>
                </li> : ""}
            </DropdownMenu>
        </Dropdown>
    );
};
export default AttachmentsDropdown;