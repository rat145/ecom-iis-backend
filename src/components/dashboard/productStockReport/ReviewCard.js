import { Rating } from 'react-simple-star-rating';
import { Table } from 'reactstrap';
import Link from 'next/link'
import DashboardWrapper from '../DashboardWrapper'
import { ReviewAPI } from '../../../utils/axiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import request from '../../../utils/axiosUtils';
import Avatar from '../../commonComponent/Avatar';
import { placeHolderImage } from '../../../data/CommonPath';

const ReviewCard = () => {
    const { data: reviewData } = useQuery({queryKey: [ReviewAPI], queryFn: () => request({ url: ReviewAPI, params: { paginate: 5 } }),
        refetchOnWindowFocus: false, select: (data) => data?.data?.data,
    });
    return (
        <DashboardWrapper classes={{ title: "LatestReviews", colProps: { sm: 12 }, headerRight: <Link href={'/review'} className='txt-primary'>View All</Link> }}>
            <div className='review-box table-responsive'>
                <Table>
                    <tbody>
                        {
                            reviewData?.slice(0, 4)?.map((elem, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className='review-content'>
                                            <div className="img-box">
                                                <Avatar data={elem?.product?.product_thumbnail} name={elem?.product?.name} placeHolder={placeHolderImage} />
                                            </div>
                                            <span>{elem?.product?.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span>{elem?.consumer?.name}</span>
                                    </td>
                                    <td>
                                        <Rating initialValue={elem?.rating} readonly={true} size={17} />
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </DashboardWrapper>
    )
}

export default ReviewCard