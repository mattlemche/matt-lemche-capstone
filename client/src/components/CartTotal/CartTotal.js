import React from 'react';
import './CartTotal.scss';

const CartTotal = ({cartList, tally}) => {
    return (
        <div className="total">
            <div className="total__title">
                total
            </div>
            <div className="total__amount">
                {tally(cartList)}
            </div>
        </div>
    );
};

export default CartTotal;