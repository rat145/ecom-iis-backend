import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../utils/axiosUtils";
import { Category } from "../../utils/axiosUtils/API";
import SearchCategory from "./SearchCategory";
import Loader from "../commonComponent/Loader";
import CategoryContext from "../../helper/categoryContext";

const TreeForm = forwardRef(({ type }, ref) => {
  const [search, setSearch] = useState("")
  const [active, setActive] = useState([]);
  const { setCategoryState } = useContext(CategoryContext)

  // Get Category Data
  const { data, refetch, isLoading } = useQuery({queryKey: [Category], queryFn: () => request({ url: Category, params: { search: search, type: type } }), enabled: false, refetchOnWindowFocus: false, select: (data) => data.data.data });

  const deleteMutate = () => {
    // Category Delete Logic here
  }
  useImperativeHandle(ref, () => ({
    call() {
      refetch();
    }
  }));
  // Refetching data while create, delete and update
  useEffect(() => {
    refetch();
  }, [search])

  useEffect(() => {
    if (data) {
      setCategoryState((prev) => [...data])
    }
  }, [data, isLoading])

  if (isLoading) return <Loader />
  return (
    <SearchCategory mutate={deleteMutate} setSearch={setSearch} data={data} active={active} setActive={setActive} type={type} />
  );
});

export default TreeForm;
