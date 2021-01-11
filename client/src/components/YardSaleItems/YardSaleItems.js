import React from 'react';
import './YardSaleItems.scss';

const YardSaleItems = (props) => {
    return (
        <div className="yard-sale-items">
            {props.children}
        </div>
    );
};

export default YardSaleItems;