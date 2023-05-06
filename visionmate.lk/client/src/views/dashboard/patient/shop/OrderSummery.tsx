import React, {useEffect} from 'react';
import {OrderSummary} from './style';
import {Cards} from "../../../../components/cards/frame/CardFrame";
import Heading from "../../../../components/heading/Heading";
import Spectacle from "../../../../models/Spectacle";

function Ordersummary({subtotal, product}: { subtotal: number, product: Spectacle }) {

    const shipping_fee = 300;

    useEffect(() => {

    }, []);


    return (
        <Cards
            bodyStyle={{
                borderRadius: '20px',
            }}
            className="ninjadash-order-summery"
            headless
        >
            <OrderSummary>
                <Heading className="summary-table-title" as="h4">
                    Order Summary
                </Heading>
                <Cards
                    bodyStyle={{
                        borderRadius: '10px',
                    }}
                    headless
                >
                    <div className="order-summary-inner">
                        <ul className="summary-list">
                            <li>
                                <span className="summary-list-title">Product :</span>
                                <span className="summary-list-text">{product.name}</span>
                            </li>
                            <li>
                                <span className="summary-list-title">Subtotal :</span>
                                <span className="summary-list-text">{`LKR ${subtotal}`}</span>
                            </li>
                            <li>
                                <span className="summary-list-title">Shipping Charge :</span>
                                <span className="summary-list-text">{`LKR ${shipping_fee}`}</span>
                            </li>
                        </ul>

                        <Heading className="summary-total" as="h4">
                            <span className="summary-total-label">Total : </span>
                            <span className="summary-total-amount">{`LKR ${subtotal + shipping_fee}`}</span>
                        </Heading>

                    </div>
                </Cards>
            </OrderSummary>
        </Cards>
    );
}

export default Ordersummary;
