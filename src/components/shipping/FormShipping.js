import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useTranslation } from "@/app/i18n/client";
import React, { useContext } from "react";
import { Row } from "reactstrap";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import request from "../../utils/axiosUtils";
import { country, shipping } from "../../utils/axiosUtils/API";
import SuccessHandle from "../../utils/customFunctions/SuccessHandle";
import { ToastNotification } from "../../utils/customFunctions/ToastNotification";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import I18NextContext from "@/helper/i18NextContext";

const FormShipping = ({ open, setActive }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: [country], queryFn: () => request({ url: country }), select: (res) => res.data.map((country) => ({ id: country.id, name: country.name })) });
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => request({ url: shipping, data, method: "post" }),
    onSuccess: (resDta) => {
      SuccessHandle(resDta, false, false, t("ShippingCreatedSuccessFully"));
      setActive(false);
      queryClient.invalidateQueries({ queryKey: [shipping] });
    },
    onError: () => ToastNotification("error"),
  });
  return (
    <ShowModal title="CreateShipping" open={open} close={false}>
      <Formik
        enableReinitialize
        initialValues={{
          country_id: "",
          status: true,
        }}
        validationSchema={YupObject({
          country_id: nameSchema,
          status: nameSchema,
        })}
        onSubmit={(values) => {
          mutate({ ...values, status: Number(values.status) });
        }}
      >
        {() => (
          <Form>
            <Row>
              <SearchableSelectInput
                nameList={[
                  {
                    name: "country_id",
                    title: "Country",
                    inputprops: {
                      name: "country_id",
                      id: "country_id",
                      options: data || [],
                    },
                  },
                ]}
              />
            </Row>
            <div className="ms-auto save-back-button">
              <div className="button-box">
                <Btn className="btn-outline" form="permission-form" title="Cancel" onClick={() => setActive(false)} />
                <Btn className="btn-primary" type="submit" title="Save" loading={isLoading} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ShowModal>
  );
};

export default FormShipping;
