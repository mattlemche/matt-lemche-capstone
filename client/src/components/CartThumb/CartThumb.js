import React from 'react';
import './CartThumb.scss';
import { useHistory } from 'react-router-dom';

const CartThumb = ({
    percent,
    itemName,
    image,
    price,
    id, 
    onDelete,
}) => {

    const navigate = useHistory();

    const handleItemCick = (e, id) => {
        navigate.push(`/item/${id}`)
    }

    const sunsetPricing = (remainder) => {

        if (remainder <= 25 && remainder > 10) {
            return (
            <div className="cart-thumb__price">
                {(price * 0.5).toFixed(2)}
            </div>
            )
        } else if (remainder <= 10 && remainder > 5) {
            return (
                <div className="cart-thumb__price">
                    {(price * 0.4).toFixed(2)}
                </div>
                )
        } else if (remainder <= 5) {
            return (
                <div className="cart-thumb__price">
                    {(price * 0.25).toFixed(2)}
                </div>
                )
        } else {
            return (
            <div className="cart-thumb__price">
                {price.toFixed(2)}
            </div>
            )
        }
    }
    
    return (
        <li className="cart-thumb">
            <div className="cart-thumb__image-container" onClick={(e) => handleItemCick(e, id)}>
                <img src={image} alt={itemName} className="cart-thumb__image"/>
            </div>
            <div className="cart-thumb__content">
                <span className="cart-thumb__name" onClick={(e) => handleItemCick(e, id)}>
                    {itemName}
                </span>
                <div className="cart-thumb__delete" onClick={(e) => onDelete(e, id)}>
                    Remove item
                </div>

            </div>
            {sunsetPricing(percent)}
        </li>
    );
};

export default CartThumb;