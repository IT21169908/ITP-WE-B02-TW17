import React from 'react';
import {Rate} from 'antd';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import {ProductCard as ProductCardStyle} from './style';
import Spectacle from "../../../../models/Spectacle";
import product_thumb from '../../../../static/img/products/1.png'
import Heading from "../../../../components/heading/Heading";
import {Button} from "../../../../components/buttons/Button";
import {Box2Heart} from "react-bootstrap-icons";

function ProductCard({product}: { product: Spectacle }) {

    const popular = product.price > 100; // TODO: remove
    return (
        <ProductCardStyle style={{marginBottom: 30}}>
            <figure>
                <img src={product_thumb} alt={`img${product._id}`}/>
            </figure>
            <figcaption>
                <Link
                    onClick={() => null}
                    className={popular ? 'btn-heart favourite' : 'btn-heart'}
                    to="#"
                >
                    {popular ? <ReactSVG src={require(`../../../../static/icon/heart-fill.svg`).default}/> :
                        <Box2Heart/>}
                </Link>
                <Heading className="product-single-title" as="h5">
                    <Link to={`/patient/checkout/${product._id}`}>{product.name}</Link>
                </Heading>
                <div className="product-single-rating">
                    <Rate allowHalf defaultValue={3} disabled/> 4.9
                    <span className="total-reviews"> 778 Reviews</span>
                </div>
                <p className="product-single-price">
                    <span className="product-single-price__new">LKR {product.price} </span>
                </p>
                <div className="product-single-action">
                    {/*<Button size="small" type="white" className="btn-cart" outlined>
                        <UilShoppingBag/>
                        Add To Cart
                    </Button>*/}
                    <Button size="small" type="primary">
                        Buy Now
                    </Button>
                </div>
            </figcaption>
        </ProductCardStyle>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object,
};

export default ProductCard;
