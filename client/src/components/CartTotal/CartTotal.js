import React from 'react';
import './CartTotal.scss';

const CartTotal = (props) => {
    return (
        <div className="total">
            <div className="total__title">
                total
            </div>
            <div className="total__amount">
                {props.children}
            </div>
        </div>
    );
};

export default CartTotal;