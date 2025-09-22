import { useQuery } from "@tanstack/react-query";
import request from "../../utils/axiosUtils";
import { tax } from "../../utils/axiosUtils/API";
import CheckBoxField from "../inputFields/CheckBoxField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "@/app/i18n/client";
import { useContext } from "react";
import I18NextContext from "@/helper/i18NextContext";

const ShippingTaxTab = () => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const { data: taxData } = useQuery({queryKey: [tax], queryFn: () => request({ url: tax, params: { status: 1 } }), refetchOnWindowFocus: false, select: (data) => data.data.data });
  return (
    <>
      <CheckBoxField name="is_free_shipping" title="FreeShipping" />
      <SearchableSelectInput
        nameList={[
          {
            name: "tax_id",
            title: "Tax",
            require: "true",
            inputprops: {
              name: "tax_id",
              id: "tax_id",
              options: taxData || [],
            },
          },
        ]}
      />
      <SimpleInputField nameList={[{
        name: "estimated_delivery_text", placeholder: t("EnterEstimatedDeliveryText"), title: "EstimatedDeliveryText", helpertext: "*Specify delivery text e.g Your order is likely to reach you within 5 to 10 days."
      }, { name: "return_policy_text", placeholder: t("EnterReturnPolicyText"), title: "ReturnPolicyText", helpertext: "*Specify return text e.g Hassle free 7, 15 and 30 days return might be available." }]} />
    </>
  );
};

export default ShippingTaxTab;
