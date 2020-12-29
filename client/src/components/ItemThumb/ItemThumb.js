import React from 'react';
import { useHistory } from 'react-router-dom';
import './ItemThumb.scss';
import placeholder from '../../assets/images/placeholder.png';

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
                <img src={!image ? placeholder : image} alt={name} className="item-thumb__image"/>
            </div>
            <span className="item-thumb__price">{price.toFixed(2)}</span>
           
        </li>
    );
};

export default ItemThumb;