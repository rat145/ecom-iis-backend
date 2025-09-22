"use client";
import ShowBox from "@/elements/alerts&Modals/ShowBox";
import I18NextContext from "@/helper/i18NextContext";
import { obscureEmail } from "@/utils/customFunctions/EmailFormates";
import LoginBoxWrapper from "@/utils/hoc/LoginBoxWrapper";
import NoSsr from "@/utils/hoc/NoSsr";
import { useTranslation } from "@/app/i18n/client";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Input } from "reactstrap";

const OtpVerification = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, "common");
  const [showBoxMessage, setShowBoxMessage] = useState();
  const cookies = Cookies.get("ue");
  const [seconds, setSeconds] = useState();
  const [otp, setOtp] = useState("");
  const handleChange = (e) => {
    if (e.target.value.length <= 5 && !isNaN(Number(e.target.value))) {
      setOtp(e.target.value);
    }
  };

  useEffect(() => {
    otp && otp.length === 5 && router.push(`/${i18Lang}/auth/update-password`)
  }, [otp]);

  useEffect(() => {
    const otpTimer =
      Boolean(seconds) && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => {
      clearInterval(otpTimer);
    };
  }, [seconds]);
  return (
    <>
      <div className="box-wrapper">
        <ShowBox showBoxMessage={showBoxMessage} />
        <LoginBoxWrapper>
          <div className="log-in-title">
            <h3 className="text-content">
              {t("PleasEnterTheOneTimePasswordToVerifyYourAccount")}
            </h3>
            <h5 className="text-content">
              {t("ACodeHasBeenSentTo") + " "}
              <span>
                <NoSsr>{obscureEmail(cookies)}</NoSsr>
              </span>
            </h5>
          </div>
          <div className="outer-otp">
            <div className="inner-otp">
              <Input
                type="text"
                maxLength="5"
                onChange={handleChange}
                value={otp}
              />
            </div>
          </div>
          <div className="send-box pt-4">
            {seconds ? (
              <h5>
                {t("PleaseWait")}
                <a className="theme-color fw-bold">
                  {seconds} <NoSsr>{t("second(s)")}</NoSsr>3
                </a>
                {t("BeforeRequestingANewOneTimePassword(OTP)")}.
              </h5>
            ) : (
              <h5>
                {t("Didn'tGetTheOTP")}?
                <a
                  className="theme-color fw-bold"
                  onClick={() => { router.push(`/${i18Lang}/auth/forgot-password`) 
                  setSeconds(60);
                  }}
                >
                  {t("ResendIt")}
                </a>
              </h5>
            )}
          </div>
        </LoginBoxWrapper>
      </div>
    </>
  );
};
export default OtpVerification;
