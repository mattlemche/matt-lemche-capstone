import React from 'react';
import './CartList.scss'

const CartList = (props) => {
    return (
        <ul className="cart-list">
            {props.children}            
        </ul>
    );
};

export default CartList;