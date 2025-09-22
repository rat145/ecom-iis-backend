import React, { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";

const TableDeleteOption = ({ isCheck }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  const handleDelete = (deleteIds) => {
    // Delete ALL Logic Here
  };
  return (
    <>
      <a
        className="align-items-center btn btn-outline btn-sm d-flex"
        onClick={() => setModal(true)}
      >
        <RiDeleteBinLine /> {t("Delete")}
      </a>
      <ShowModal
        open={modal}
        close={false}
        setModal={setModal}
        buttons={
          <>
            <Btn
              title="No"
              onClick={() => {
                setModal(false);
              }}
              className="btn--no btn-md fw-bold"
            />
            <Btn
              title="Yes"
              className="btn-theme btn-md fw-bold"
              onClick={() => {
                handleDelete(isCheck);
              }}
            />
          </>
        }
      >
        <div className="remove-box">
          <RiDeleteBinLine className="icon-box" />
          <h2>{t("DeleteItem")}?</h2>
          <p>
            {t("ThisItemWillBeDeletedPermanently") +
              " " +
              t("YouCan'tUndoThisAction!!")}{" "}
          </p>
        </div>
      </ShowModal>
    </>
  );
};

export default TableDeleteOption;
