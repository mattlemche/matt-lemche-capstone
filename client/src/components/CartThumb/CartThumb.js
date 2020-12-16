import React from 'react';
import './CartThumb.scss'

const CartThumb = ({
    itemName,
    image,
    price,
    id
}) => {
    return (
        <li className="cart-thumb">
            <div className="cart-thumb__image-container">
                <img src={image} alt={itemName} className="cart-thumb__image"/>
            </div>
            <div className="cart-thumb__content">
                {itemName}
            </div>
            <div className="cart-thumb__price">
                {price}
            </div>
            
        </li>
    );
};

export default CartThumb;