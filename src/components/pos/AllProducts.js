import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { Card, CardBody, Row } from "reactstrap";
import request from "../../utils/axiosUtils";
import { product } from "../../utils/axiosUtils/API";
import ShowProduct from "./ShowProduct";
import POSSkeletonLoader from "../../elements/posSkeletonLoader";
import ProductFilterSection from "./ProductFilterSection";
import NoDataFound from "../commonComponent/NoDataFound";
import Pagination from "../table/Pagination";

const AllProducts = ({ setFieldValue, values, dispatch, setCartData, CategoryData, getCategoryId, setStateProduct, setGetCategoryId }) => {
  const [page, setPage] = useState(1);
  const [productParams, setProductParams] = useState({ search: "", category_ids: [] })
  // Calling Product API
  const { data, refetch, fetchStatus } = useQuery({queryKey: [product, getCategoryId], queryFn: () => request({ url: product, params: { category_ids: getCategoryId || productParams.category_ids.join(','), search: productParams?.search, status: 1, paginate: 20, page } }), refetchOnWindowFocus: false, select: (data) => data.data });
  useEffect(() => {
    if (productParams?.category_ids?.length) {
      setGetCategoryId("");
    }
  }, [productParams.category_ids])
  useEffect(() => {
    refetch()
  }, [productParams, page])
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("uc", JSON.stringify(values));
    }
    setCartData(values)
  }, [values]);
  return (
    <>
      <Card>
        <CardBody className="theme-form">
          <Formik initialValues={{ parent_id: productParams?.category_ids }}>
            {({ setFieldValue, values }) => (
              <ProductFilterSection setFieldValue={setFieldValue} values={values} CategoryData={CategoryData} setProductParams={setProductParams} getCategoryId={getCategoryId} refetch={refetch} />
            )}
          </Formik>
          {fetchStatus == "fetching" ?
            <POSSkeletonLoader /> : <div className="product-section mt-4">
              <Row xxl={4} md={3} sm={2} xs={1} className="g-4">
                {data?.data?.length > 0 ? data?.data?.map((item) => (
                  <ShowProduct productData={item} key={item.id} setFieldValue={setFieldValue} values={values} dispatch={dispatch} setStateProduct={setStateProduct} />

                ))
                  : <NoDataFound customImage={"/assets/svg/no-product.svg"} title={"NoProductFound"} />}
              </Row>
            </div>
          }
          {data?.data?.length > 0 ? <Pagination current_page={data?.current_page} total={data?.total} per_page={data?.per_page} setPage={setPage} /> : null}
        </CardBody>
      </Card>
    </>
  );
};

export default AllProducts;
