import { Col, Row } from "reactstrap"
import DashboardWrapper from "../DashboardWrapper"
import { blog } from "../../../utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import request from "../../../utils/axiosUtils";
import Avatar from "../../commonComponent/Avatar";
import { placeHolderImage } from "../../../data/CommonPath";
import { dateFormate } from "../../../utils/customFunctions/DateFormate";

const LatestBlogs = () => {
    const { data } = useQuery({queryKey: [blog], queryFn: () => request({ url: blog, params: { status: 1, paginate: 2 } }),
        refetchOnWindowFocus: false, select: (data) => data?.data?.data,
    });
    return (
        <DashboardWrapper classes={{ title: "LatestBlogs" }}>
            <Row>
                {data?.slice(0, 2)?.map((elem, i) => (
                    <Col xs={6} key={i}>
                        <div className="blog-box">
                            <a href="#javascript" className="blog-img">
                                <Avatar data={elem?.blog_thumbnail} customClass={"img-fluid"} noPrevClass={true} placeHolder={placeHolderImage} name={elem?.title} width={278} height={180} />
                            </a>
                            <div className="blog-content">
                                <a href="#javascript">{elem?.title}</a>
                                <h6>{dateFormate(elem?.created_at)}</h6>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </DashboardWrapper>
    )
}

export default LatestBlogs