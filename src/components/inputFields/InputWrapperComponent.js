import { useTranslation } from "@/app/i18n/client";
import { Col, Label } from "reactstrap";
import NameConversion from "../../utils/customFunctions/NameConversion";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const InputWrapperComponent = (props) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  return (
    <div className="input-error">
      <div className={`mb-4 ${props.nolabel == "true" ? "form-floating" : "align-items-center row"}`}>
        {props.nolabel !== "true" && (
          <Col sm={2}>
            <Label className="col-form-label form-label-title">
              {t(NameConversion(props.name))}
              {props.require == "true" && <span className="theme-color ms-2 required-dot">*</span>}
            </Label>
          </Col>
        )}
        {props.nolabel !== "true" ? (
          <Col sm={10} className={props.classes ? props.classes : ""}>
            {props.children}
          </Col>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};

export default InputWrapperComponent;
