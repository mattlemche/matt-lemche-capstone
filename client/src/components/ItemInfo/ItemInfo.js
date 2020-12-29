import React from 'react';

function ItemInfo({item}) {
    return (
        <>
            <h2 className="details__title">
                        {item.name}
            </h2>
            <div className="details__description">

            {
                item.description ?
                item.description :
                'No description given'
            }
            </div>
            <div className="details__condition">
                <span className="details__condition-title">
                    condition:
                </span>
                {item.condition}
            </div>
        </>
    );
}

export default ItemInfo;