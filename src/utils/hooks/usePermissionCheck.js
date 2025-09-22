import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import request from "../axiosUtils";
import { selfData } from "../axiosUtils/API";
import ConvertPermissionArr from "../customFunctions/ConvertPermissionArr";

const usePermissionCheck = (permissionTypeArr, keyToSearch) => {
  const [ansData, setAnsData] = useState([]);
  const path = usePathname();
  const moduleToSearch = keyToSearch ? keyToSearch : path.split("/")[2]
  const { data, isLoading, refetch } = useQuery({queryKey: [selfData], queryFn: () => request({ url: selfData }),
    enabled: true, refetchOnWindowFocus: false
  });
  useEffect(() => {
    if (data) {
      const securePaths = ConvertPermissionArr(data?.data?.permission);
      setAnsData(permissionTypeArr.map((permissionType) => Boolean(securePaths?.find((permission) => moduleToSearch == permission.name)?.permissionsArr.find((permission) => permission.type == permissionType))));
    }
  }, [isLoading]);
  return ansData;
};

export default usePermissionCheck;
