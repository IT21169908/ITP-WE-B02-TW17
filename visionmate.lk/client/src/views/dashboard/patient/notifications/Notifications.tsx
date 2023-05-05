import { Col, Row } from 'antd';
import { Cards } from "../../../../components/cards/frame/CardFrame";
import { CardStyleWrapper } from "../../../../components/cards/styled-elements";

function Notifications() {

    return (
        <>
            <Cards title="Notifications" size="default">
                <div className="columnCardsWrapper">
                    <Row gutter={16}>
                        <Col sm={8} xs={24}>
                            <CardStyleWrapper>
                                <Cards title="Notifications 1" border={false} size="default">
                                    <p>content</p>
                                </Cards>
                            </CardStyleWrapper>
                        </Col>
                        <Col sm={8} xs={24}>
                            <CardStyleWrapper>
                                <Cards title="Notifications 1" border={false} size="default">
                                    <p>content</p>
                                </Cards>
                            </CardStyleWrapper>
                        </Col>
                        <Col sm={8} xs={24}>
                            <CardStyleWrapper>
                                <Cards title="Notifications 1" border={false} size="default">
                                    <p>content</p>
                                </Cards>
                            </CardStyleWrapper>
                        </Col>
                    </Row>
                </div>
            </Cards>
        </>
    )
}


export default Notifications;
