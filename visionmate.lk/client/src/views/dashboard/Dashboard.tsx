import React, { Suspense, lazy } from 'react';
import { Cards } from "../../components/cards/frame/CardFrame";
import Heading from "../../components/heading/Heading";
import { Main } from "../../components/styled-components/styled-containers";
import { Row, Col, Skeleton } from 'antd';
import PageHeaderBanner from '../../components/banners/PageHeaderBanner';
import { RoleName } from "../../enums/Role";
import { useAppSelector } from "../../hooks/redux-hooks";
import { RootState } from "../../redux/store";

// const Calender = lazy(() => import('../../../components/calendars/CalendarHead'));

function Dashboard() {
    const {authUser} = useAppSelector((state: RootState) => {
        return {
            authUser: state.auth.user,
        };
    });

    return (
        <Main>
            <Row gutter={25}>
                <Col xs={24}>
                    <Suspense
                        fallback={
                            <Cards headless>
                                <Skeleton active />
                            </Cards>
                        }
                    >
                        <PageHeaderBanner
                            title={`Welcome To ${authUser?.role ? RoleName[authUser?.role] : 'Loading...'} Dashboard : ${authUser?.name || 'Default user'}`}
                            subtitle="We Only Give Best Care To Your Eyes"
                            type={"default"}
                        />
                    </Suspense>
                </Col>
                <Col xxl={8} xl={10} xs={24}>
                    <Suspense
                        fallback={
                            <Cards headless>
                                <Skeleton active />
                            </Cards>
                        }
                    >
                        {/*<Calender />*/}
                    </Suspense>
                </Col>
            </Row>
        </Main>
    );
}

export default Dashboard;
