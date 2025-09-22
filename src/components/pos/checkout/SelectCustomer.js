import React, { useContext, useEffect, useState } from "react";
import { RiAddLine, RiUserLine } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import ShowModal from "../../../elements/alerts&Modals/Modal";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";
import UserForm from "../../user/UserForm";
import CheckoutCard from "./common/CheckoutCard";
import I18NextContext from "@/helper/i18NextContext";

const SelectCustomer = ({ values, setFieldValue, userData, userRefetch, setSearch }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  useEffect(() => {
    userRefetch();
  }, [])

  useEffect(() => {
    setFieldValue("billing_address_id", "");
    setFieldValue("shipping_address_id", "");
  }, [values["consumer_id"]]);

  return (
    <CheckoutCard icon={<RiUserLine />}>
      <div className="checkout-title">
        <h4>{t("SelectCustomer")}</h4>
        <a className="d-flex align-items-center fw-bold" onClick={() => setModal(true)}>
          <RiAddLine className="me-1"></RiAddLine>
          {t("AddNew")}
        </a>
      </div>
      <SearchableSelectInput
        nameList={[
          {
            name: "consumer_id",
            notitle: "true",
            inputprops: {
              name: "consumer_id",
              id: "consumer_id",
              options: userData?.map((item) => ({ name: item.name, id: item.id })) || [],
              defaultOption: "Select Customer",
              setsearch: setSearch,
            },
          },
        ]}
      />
      <ShowModal modalAttr={{ className: "modal-lg" }} title={"Addcustomer"} open={modal} setModal={setModal} >
        <UserForm noRoleField setModal={setModal} />
      </ShowModal>
    </CheckoutCard>
  );
}

export default SelectCustomer;
