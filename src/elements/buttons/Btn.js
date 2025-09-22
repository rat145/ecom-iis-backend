import React, { useContext } from "react";
import { Button } from "reactstrap";
import I18NextContext from "@/helper/i18NextContext";
import { useTranslation } from "@/app/i18n/client";

const Btn = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const loading = props.loading ||false
  return (
    <Button {...props}>
      <div className={`d-flex align-items-center position-relative${loading? " spinning" : ""}`}>
        {props.children}
        {t(props.title)}
      </div>
    </Button>
  );
};
export default Btn;
