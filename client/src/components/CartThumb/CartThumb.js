import React from 'react';
import './CartThumb.scss';
import { useHistory } from 'react-router-dom';

const CartThumb = ({
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
            <div className="cart-thumb__price">
                {price ? price.toFixed(2) : ''}
            </div>
            
        </li>
    );
};

export default CartThumb;