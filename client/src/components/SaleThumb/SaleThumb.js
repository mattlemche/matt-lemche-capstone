import React from 'react';
import { useHistory } from 'react-router-dom';

const SaleThumb = ({ saleId, location }) => {

    const navigate = useHistory();

    const handleItemCick = (e, id) => {
        navigate.push(`/yard-sale/${id}`)
    }


    return (
        <li onClick={(e) => {handleItemCick(e, saleId)}}>
        {location}
        </li>
    );
};

export default SaleThumb;