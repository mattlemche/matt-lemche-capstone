import React from 'react';
import './CartThumb.scss'

const CartThumb = ({
    itemName,
    image,
    price,
    id, 
    onDelete,
}) => {
    return (
        <li className="cart-thumb">
            <div className="cart-thumb__image-container">
                <img src={image} alt={itemName} className="cart-thumb__image"/>
            </div>
            <div className="cart-thumb__content">
                <span className="cart-thumb__name">
                    {itemName}
                </span>
                <div className="cart-thumb__delete" onClick={onDelete(id)}>
                    Remove item
                </div>
            </div>
            <div className="cart-thumb__price">
                {price}
            </div>
            
        </li>
    );
};

export default CartThumb;