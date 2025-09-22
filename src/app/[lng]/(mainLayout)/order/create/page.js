'use client'
import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Card, Col, Row } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { AddtoCartAPI, Category } from "@/utils/axiosUtils/API";
import CreateCartContext from "@/helper/cartContext";
import TopCategories from "@/components/pos/TopCategories";
import AllProducts from "@/components/pos/AllProducts";
import PosDetailCard from "@/components/pos/PosDetailCard";
import Loader from "@/components/commonComponent/Loader";
import request from "@/utils/axiosUtils";

const POS = () => {
  const [getCategoryId, setGetCategoryId] = useState('')
  const { dispatch, setCartData, setCartState } = useContext(CreateCartContext);
  const { data: CategoryData, isLoading } = useQuery({queryKey: [Category], queryFn:() => request({ url: Category, params: { type: 'product', status: 1 } }), refetchOnWindowFocus: false, select: (data) => data.data.data});

  const { data: addToCartData, isLoading: addToCartLoader } = useQuery({queryKey: [AddtoCartAPI], queryFn:() => request({ url: AddtoCartAPI }), refetchOnWindowFocus: false, select: (res) => res?.data });
  const [initValues, setInitValues] = useState({ products: [], consumer_id: "", billing_address_id: "", shipping_address_id: "", shipping_total: 0, tax_total: 0, total: 0, variation_id: "" });
  useEffect(() => {
    if (addToCartData?.items?.length > 0) {
      setInitValues((prev) => {
        return {
          ...prev, // Preserve the existing values
          products: addToCartData?.items,
          total: addToCartData?.total
        };
      });
      setCartState(addToCartData?.items)
    }
  }, [addToCartLoader]);
  if (isLoading || addToCartLoader) return <Loader />
  return (
    <>
      <Formik
        initialValues={initValues}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Row>
              <Col xxl="8">
                <TopCategories CategoryData={CategoryData} setGetCategoryId={setGetCategoryId} getCategoryId={getCategoryId} />
                <div className="pos-product-sec">
                  <AllProducts setFieldValue={setFieldValue} values={values} dispatch={dispatch} setCartData={setCartData} CategoryData={CategoryData} getCategoryId={getCategoryId} setGetCategoryId={setGetCategoryId} />
                </div>
              </Col>
              <Col xxl="4">
                <Card className="pos-detail-card">
                  <PosDetailCard values={values} setFieldValue={setFieldValue} dispatch={dispatch} initValues={initValues} />
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default POS;
