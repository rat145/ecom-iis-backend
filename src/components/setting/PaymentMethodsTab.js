import React, { Fragment, useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import { SettingPaymentMethodTab } from "../../data/TabTitleListData";
import TabTitle from "../coupon/TabTitle";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";

const PaymentMethodsTab = ({ errors, touched }) => {
  const PaypalProvider = {
    paypal: ["client_id", "client_secret", "sandbox_mode", "status"]
  };
  const StripeProvider = {
    stripe: ["key", "secret", "status"],
  };
  const RazorpayProvider = {
    razorpay: ["key", "secret", "status"],
  };
  const CashOnDeliveryProvider = {
    status: ["status"],
  };
  const MollieProvider = {
    mollie: ["secret_key", "status"]
  };
  const toggleInputs = ["status", "sandbox_mode"];
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div className="inside-horizontal-tabs">
      <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={SettingPaymentMethodTab} errors={errors} touched={touched} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1"> <>{Object.keys(PaypalProvider).map((key) => (
          <div key={key}>
            {PaypalProvider[key].map((item) => (
              <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][payment_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][payment_methods][${key}][${item}]`, title: item }]} />}</Fragment>
            ))}
          </div>
        ))}</></TabPane>
        <TabPane tabId="2"> {Object.keys(StripeProvider).map((key) => (
          <div key={key}>
            {StripeProvider[key].map((item) => (
              <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][payment_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][payment_methods][${key}][${item}]`, title: item }]} />}</Fragment>
            ))}
          </div>
        ))}</TabPane>
        <TabPane tabId="3">{Object.keys(RazorpayProvider).map((key) => (
          <div key={key}>
            {RazorpayProvider[key].map((item) => (
              <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][payment_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][payment_methods][${key}][${item}]`, title: item }]} />}</Fragment>
            ))}
          </div>
        ))}</TabPane>
        <TabPane tabId="4"> {Object.keys(CashOnDeliveryProvider).map((key) => (
          <div key={key}>
            {CashOnDeliveryProvider[key].map((item) => (
              <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][payment_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][payment_methods][${key}][${item}]`, title: item }]} />}</Fragment>
            ))}
          </div>
        ))}</TabPane>
        <TabPane tabId="5">{Object.keys(MollieProvider).map((key) => (
          <div key={key}>
            {MollieProvider[key].map((item) => (
              <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][payment_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][payment_methods][${key}][${item}]`, title: item }]} />}</Fragment>
            ))}
          </div>
        ))}</TabPane>
      </TabContent>
    </div>
  );
};

export default PaymentMethodsTab;
