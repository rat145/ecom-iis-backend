import Image from "next/image";
import { dateFormate } from "../../utils/customFunctions/DateFormate";
import TableWrapper from "../../utils/hoc/TableWrapper";
import ShowTable from "../table/ShowTable";

const AllCategoriesTable = ({ data, ...props }) => {
  const formatData = (data) => {
    return data.map((item) => ({
      id: item.id,
      Name: item.name,
      Image: <Image src={item.media?.filter((item) => item.collection_name == "image")[0]?.original_url || "/assets/images/product/product-placeholder.png"} height="100" width="100" alt="" />,
      Icon: <Image src={item.media?.filter((item) => item.collection_name == "icon")[0]?.original_url || "/assets/images/product/product-placeholder.png"} height="100" width="100" alt="" />,
      CreateAt: dateFormate(item.created_at),
      status: item.status,
    }));
  };
  if (!data) return null;
  return <ShowTable {...props} data={formatData(data)} />;
};

export default TableWrapper(AllCategoriesTable);
