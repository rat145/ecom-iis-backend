'use client'
import Loader from "@/components/commonComponent/Loader";
import NoDataFound from "@/components/commonComponent/NoDataFound";
import FormShipping from "@/components/shipping/FormShipping";
import DeleteButton from "@/components/table/DeleteButton";
import Btn from "@/elements/buttons/Btn";
import I18NextContext from "@/helper/i18NextContext";
import request from "@/utils/axiosUtils";
import { shipping } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import usePermissionCheck from "@/utils/hooks/usePermissionCheck";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useContext, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";

const Shipping = () => {
  const [create, edit, destroy] = usePermissionCheck(["create", "edit", "destroy"]);
  const [active, setActive] = useState(false);
  const { data, isLoading } = useQuery({queryKey: [shipping], queryFn: () => request({ url: shipping }),
    refetchOnWindowFocus: false, select: (data) => data.data,
  });
  const { i18Lang } = useContext(I18NextContext);
  if (isLoading) return <Loader />
  return (
    <>
      <FormWrapper title="Shipping" modal={
        create && <Btn className="align-items-center btn-theme add-button" title="SelectCountry" onClick={() => setActive("create")}>
          <FiPlus /></Btn>
      }>
        <FormShipping open={"create" === active ? true : false} setActive={setActive} />
        {
          data.length > 0 ?
            <ul className="country-list">
              {data?.map((elem, index) => (
                <li key={index}>
                  <h5>{elem.country.name}</h5>
                  {edit && <Link href={`/${i18Lang}/shipping/update/${elem?.id}`}><RiPencilLine className="text-success" />
                  </Link>}
                  {destroy && <DeleteButton id={elem?.id}  />}
                </li>
              ))}
            </ul>
            : <NoDataFound />
        }
      </FormWrapper>
    </>
  );
};

export default Shipping;
