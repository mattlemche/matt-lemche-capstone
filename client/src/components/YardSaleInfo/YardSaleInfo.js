import React from 'react';
import './YardSaleInfo.scss';

function YardSaleInfo({item}) {
    return (
        <div className="yard-sale-info">
            <h2 className="yard-sale-info__title">
                            {item.name}
            </h2>
            <div className="yard-sale-info__description">
            {
                item.description ?
                item.description :
                'Oh darn! No description was given.'
            }
            </div>
        </div>
    );
}

export default YardSaleInfo;