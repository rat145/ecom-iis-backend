import React, { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";
import Pagination from "./Pagination";
import I18NextContext from "@/helper/i18NextContext";

const TableBottom = ({ current_page, total, per_page, setPage }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className="card-bottom">
     
      <Pagination current_page={current_page} total={total} per_page={per_page} setPage={setPage} />
    </div>
  );
};

export default TableBottom;
