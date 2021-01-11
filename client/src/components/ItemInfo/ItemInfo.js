import React from 'react';
import './ItemInfo.scss';

function ItemInfo({item}) {
    return (
        <div className="item-info">
            
                <h2 className="item-info__title">
                            {item.name}
                </h2>
            <div className="item-info__content">
                <div className="item-info__description">

                {
                    item.description ?
                    item.description :
                    'No description given'
                }
                </div>
                <div className="condition">
                <span className="condition__title">
                    condition:
                </span>
                {item.condition}
            </div>
            </div>
            
        </div>
    );
}

export default ItemInfo;