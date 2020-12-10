import React from 'react';
import { useHistory } from 'react-router-dom';

const ItemThumb = ({ price, itemId }) => {

    const navigate = useHistory();

    const handleItemCick = (e, id) => {
        navigate.push(`/item/${id}`)
    }

    return (
        <li onClick={(e) => {handleItemCick(e, itemId)}}>
            {price}
        </li>
    );
};

export default ItemThumb;