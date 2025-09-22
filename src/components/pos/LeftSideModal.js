import Image from 'next/image'
import React from 'react'
import { Col } from 'reactstrap'

const LeftSideModal = ({ cloneVariation, productData }) => {
    return (
        <Col lg="6">
            <div className="slider-image">
                <Image src={cloneVariation?.selectedVariation?.variation_image ? cloneVariation?.selectedVariation?.variation_image?.original_url
                    : (productData?.product_thumbnail?.original_url ? productData?.product_thumbnail?.original_url : '/assets/images/product.png')}
                    className="img-fluid" alt="" width={369} height={369} />
            </div>
        </Col>
    )
}

export default LeftSideModal