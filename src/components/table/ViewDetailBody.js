import { useContext } from "react"
import { useTranslation } from "@/app/i18n/client";
import { Table } from "reactstrap"
import SettingContext from "../../helper/settingContext"
import I18NextContext from "@/helper/i18NextContext";

const ViewDetailBody = ({ fullObj }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { convertCurrency } = useContext(SettingContext)
    return (
        <div className="border rounded-3">
            <Table className="all-package theme-table no-footer">
                <tbody>
                    {fullObj?.message && <tr>
                        <td className="text-start fw-semibold">{t("Message")}</td>
                        <td className="text-start">{fullObj?.message}</td>
                    </tr>}
                    {fullObj?.reason && <tr>
                        <td className="text-start fw-semibold">{t("Reason")}</td>
                        <td className="text-start">{fullObj?.reason}</td>
                    </tr>}
                    {fullObj?.amount && <tr>
                        <td className="text-start fw-semibold">{t("Amount")}</td>
                        <td className="text-start">{convertCurrency(fullObj?.amount)}</td>
                    </tr>}

                    {fullObj?.user?.payment_account && <> {fullObj?.user?.payment_account?.bank_name && <tr>
                        <td className="text-start fw-semibold">{t("BankName")} </td>
                        <td className="text-start"> {fullObj?.user?.payment_account?.bank_name}</td>
                    </tr>}
                        {fullObj?.user?.payment_account?.bank_holder_name && <tr>
                            <td className="text-start fw-semibold">{t("BankAccountName")} </td>
                            <td className="text-start">{fullObj?.user?.payment_account?.bank_holder_name}</td>
                        </tr>}
                        {fullObj?.user?.payment_account?.bank_account_no && <tr>
                            <td className="text-start fw-semibold">{t("BankAccountNumber")} </td>
                            <td className="text-start"> {fullObj?.user?.payment_account?.bank_account_no}</td>
                        </tr>}
                        {fullObj?.user?.payment_account?.ifsc && <tr>
                            <td className="text-start fw-semibold">{t("BankIFSCCode")} </td>
                            <td className="text-start">{fullObj?.user?.payment_account?.ifsc}</td>
                        </tr>}
                        {fullObj?.user?.payment_account?.swift && <tr>
                            <td className="text-start fw-semibold">{t("BankSWIFTCode")} </td>
                            <td className="text-start">{fullObj?.user?.payment_account?.swift}</td>
                        </tr>}</>}
                    <tr>
                        <td className="text-start fw-semibold">{t("PaymentMethod")} </td>
                        <td className="text-start">{fullObj?.payment_type?.toUpperCase()}</td>
                    </tr>
                    {fullObj?.status && <tr>
                        <td className="text-start fw-semibold">{t('Status')}</td>
                        <td className="text-start">
                            <div className={`status-${fullObj?.status}`}><span>{fullObj?.status}</span></div>
                        </td>
                    </tr>}
                </tbody>
            </Table>
        </div>
    )
}

export default ViewDetailBody