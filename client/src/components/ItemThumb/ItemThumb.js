import React from 'react';
import { useHistory } from 'react-router-dom';
import './ItemThumb.scss';

const ItemThumb = ({ 
    price,
    itemId,
    image,
    name
 }) => {

    const navigate = useHistory();

    const handleItemCick = (e, id) => {
        navigate.push(`/item/${id}`)
    }

    return (
        <li onClick={(e) => {handleItemCick(e, itemId)}} className="item-thumb">
            <div className="item-thumb__image-container">
                <img src={image} alt={name} className="item-thumb__image"/>
            </div>
            <span className="item-thumb__price">{price}</span>
           
        </li>
    );
};

export default ItemThumb;