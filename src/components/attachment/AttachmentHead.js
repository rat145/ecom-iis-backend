import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { RiAddLine, RiDeleteBin2Line, RiDeleteBinLine } from "react-icons/ri";
import Btn from "../../elements/buttons/Btn";
import request from "../../utils/axiosUtils";
import { attachmentDelete } from "../../utils/axiosUtils/API";
import SuccessHandle from "../../utils/customFunctions/SuccessHandle";
import AttachmentModal from "./AttachmentModal";
import ShowModal from "../../elements/alerts&Modals/Modal";
import usePermissionCheck from "../../utils/hooks/usePermissionCheck";
import I18NextContext from "@/helper/i18NextContext";

const AttachmentHead = ({ isattachment, state, dispatch, refetch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const [create, destroy] = usePermissionCheck(["create", "destroy"]);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const router = useRouter();
    const { mutate } = useMutation({mutationFn: (data) => request({ url: attachmentDelete, data: { ids: data }, method: "post" }),
        onSuccess: (resData) => {
            SuccessHandle(resData, router, "/attachment", "Deleted Sucessfully");
            resData.status == 200 && dispatch({ type: "DeleteSelectedImage", payload: [] });
            refetch()
        },
    });
    return (
        <>
            <div className="title-header option-title media-title">
                <div className="left-content">
                    <h5>{t("MediaLibrary")}</h5>
                    {state.deleteImage.length > 0 && <div className="selected-options">
                        <ul>
                            <li>{t("selected")}({state.deleteImage.length})</li>
                            {destroy && <li onClick={() => setDeleteModal(true)}><a href="#javascript"><RiDeleteBin2Line /></a></li>}
                            <ShowModal open={deleteModal} close={false}
                                buttons={
                                    <>
                                        <Btn title="No" onClick={() => setDeleteModal(false)} className="btn--no btn-md fw-bold" />
                                        <Btn title="Yes" className="btn-theme btn-md fw-bold" onClick={() => {
                                            mutate(state.deleteImage); setDeleteModal(false);
                                        }} />
                                    </>
                                }>
                                <div className="remove-box">
                                    <RiDeleteBinLine className="ri-delete-bin-line icon-box" />
                                    <h2>{t("DeleteItem")}?</h2>
                                    <p>{t("ThisItemWillBeDeletedPermanently") + " " + t("YouCan'tUndoThisAction!!")} </p>
                                </div>
                            </ShowModal>
                        </ul>
                    </div>}
                </div>
                {create && <div className="right-options">
                    <ul>
                        <li>
                            <Btn className="btn btn-solid btn-theme" onClick={() => setModal(true)}><RiAddLine />{t("AddMedia")}</Btn>
                        </li>
                    </ul>
                </div>}
            </div>
            <AttachmentModal modal={modal} setModal={setModal} isattachment={isattachment} noAPICall />
        </>
    );
};

export default AttachmentHead;