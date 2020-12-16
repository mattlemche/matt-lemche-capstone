import React from 'react';
import './YardSaleList.scss';

const YardSaleList = (props) => {
    return (
        <ul className="yard-sale-list">
            {props.children}
        </ul>
    );
};

export default YardSaleList;