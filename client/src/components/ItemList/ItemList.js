import React from 'react';
import './ItemList.scss';

const ItemList = (props) => {
    return (
        <ul className="item-list">
            {props.children}
        </ul>
    );
};

export default ItemList;