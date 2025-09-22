import Image from 'next/image';

const TrackingPanel = ({ orderStatusData, orderStatus }) => {
    return (
        <ul>
            {
                orderStatusData?.map((elem, index) => (
                    <li className={(elem?.sequence >= orderStatus?.sequence && orderStatus?.slug == 'cancelled') || elem?.slug == 'cancelled' ? "d-none" : elem?.sequence <= orderStatus?.sequence ? "active" : ""} key={index}>
                        <div className="panel-content">
                            <div className="icon">
                                <Image className='img-fluid' src={`/assets/images/tracking/${elem.slug}.svg`} alt="tracking status" height={40} width={40} />
                            </div>
                            <div className="status">
                                {elem?.name}
                            </div>
                        </div>
                    </li>
                ))
            }
            {orderStatus?.slug == 'cancelled' && <li className="active cancelled-box">
                <div className="panel-content">
                    <div className="icon">
                        <Image src={`/assets/images/tracking/${orderStatus.slug}.svg`} alt="image" height={40} width={40} />
                    </div>
                    <div className="status">{orderStatus?.name}</div>
                </div>
            </li>
            }
        </ul>
    )
}

export default TrackingPanel