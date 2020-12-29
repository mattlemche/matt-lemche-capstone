import React from 'react';

function YardSaleInfo({item}) {
    return (
        <>
            <h2 className="details__title">
                            {item.name}
            </h2>
            <div className="details__description">
            {
                item.description ?
                item.description :
                'Oh darn! No description was given.'
            }
            </div>
        </>
    );
}

export default YardSaleInfo;