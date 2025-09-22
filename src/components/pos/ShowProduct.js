import React, { useContext, useState } from "react";
import Image from "next/image";
import { Col } from "reactstrap";
import { RiAddLine } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import ProductVariationModal from "./ProductVariationModal";
import SettingContext from "../../helper/settingContext";
import { placeHolderImage } from "../../data/CommonPath";
import CreateCartContext from "../../helper/cartContext";
import I18NextContext from "@/helper/i18NextContext";

const ShowProduct = ({ productData, setFieldValue, values }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState();
  const { convertCurrency } = useContext(SettingContext)
  const { handleAddToCart } = useContext(CreateCartContext)
  const addProduct = (singleProduct, qty) => {
    if (singleProduct["type"] === "simple") {
      // API Call
      handleAddToCart(1, singleProduct)
      setModal(false)
    } else {
      setModal(singleProduct.id);
    }
  }
  return (
    <Col>
      <div className="product-box">
        <div className="product-image">
          <Image src={productData?.product_thumbnail?.original_url ?? placeHolderImage} alt="" className="img-fluid" width={100} height={100} />
        </div>
        <div className="product-detail">
          <h6 className="name name-2 h-100">{productData.name}</h6>
          <h6 className="sold weight text-content fw-normal">{productData?.unit}</h6>
          <div className="counter-box">
            <h6 className="sold theme-color">{productData["type"] == "classified" ? convertCurrency(productData.variations?.[0]?.price) : convertCurrency(productData?.sale_price)}</h6>
            <div className="addtocart_btn">
              <Btn className={`add-button addcart-button buy-button ${!productData.variations.length && (productData.stock_status !== 'in_stock') ? 'disabled' : ''}`} onClick={() => addProduct(productData, 1)}>
                <span>{productData.stock_status !== 'in_stock' ? t('Outofstock') : t('Add')}</span>
                {productData.stock_status == 'in_stock' && <RiAddLine />}
              </Btn>
            </div>
          </div>
        </div>
      </div>
      <ShowModal title={"ProductDetails"} open={productData.id == modal} setModal={setModal} modalAttr={{ className: "view-modal modal-lg theme-modal" }}>
        <ProductVariationModal productData={productData} values={values} setFieldValue={setFieldValue} setModal={setModal} />
      </ShowModal>
    </Col>
  );
};

export default ShowProduct;
