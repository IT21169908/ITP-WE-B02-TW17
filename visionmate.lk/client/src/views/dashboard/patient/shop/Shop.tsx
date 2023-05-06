import React, {useState, useEffect} from 'react';
import {Row, Col, Spin, Input} from 'antd';
import {HouseDoor, Search} from "react-bootstrap-icons";
import Spectacle from "../../../../models/Spectacle";
import {OrderService as SpectacleService} from "../../../../services/OrderService";
import ProductCard from "./ProductCard";
import {NotFoundWrapper} from "./style";
import Heading from "../../../../components/heading/Heading";
import {Main, TopToolBox} from "../../../../components/styled-components/styled-containers";
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";

function Product() {

    const PageRoutes = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/Patient',
        },
        {
            title: 'products',
        },
    ];

    const path = '.';


    const [products, setProducts] = useState<Spectacle[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Spectacle[]>([]);

    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = products.filter((item) => item.name.toUpperCase().startsWith(e.target.value.toUpperCase()));
        setFilteredProducts(data);
    };

    useEffect(() => {

    }, [filteredProducts])

    useEffect(() => {
        let isMounted = true;

        async function loadSpectacles() {
            try {
                const res = await SpectacleService.getAllSpectaclesForPatient();
                if (isMounted) {
                    setProducts(res.data);
                    setFilteredProducts(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        loadSpectacles();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Shop" routes={PageRoutes}/>
            <Main>
                <Row gutter={30}>
                    <Col className="product-content-col" xxl={19} lg={17} md={14} xs={24}>
                        <TopToolBox>
                            <Row gutter={0}>
                                <Col xxl={7} lg={12} xs={24}>
                                    <Input suffix={<Search/>} onChange={handleSearch}/>

                                </Col>
                                <Col xxl={7} lg={12} xs={24}>
                                    <p className="search-result">Showing {filteredProducts.length} results</p>
                                </Col>
                            </Row>
                        </TopToolBox>


                        <Row gutter={30}>
                            {filteredProducts.length <= 0 ? (
                                <Col xs={24}>
                                    <div className="spin">
                                        <Spin/>
                                    </div>
                                </Col>
                            ) : filteredProducts.length ? (
                                filteredProducts.map(product => {
                                    return (
                                        <Col xxl={6} lg={12} xs={24} key={product._id}>
                                            <ProductCard product={product}/>
                                        </Col>
                                    );
                                })
                            ) : (
                                <Col md={24}>
                                    <NotFoundWrapper>
                                        <Heading as="h1">Data Not Found</Heading>
                                    </NotFoundWrapper>
                                </Col>
                            )}
                        </Row>

                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default Product;
