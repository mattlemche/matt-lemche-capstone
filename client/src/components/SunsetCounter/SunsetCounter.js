import React from 'react';
import SunsetBadge from '../SunsetBadge/SunsetBadge';

function SunsetCounter({duration, startDate}) {

    const currentDate = new Date();
    const saleDate = new Date(startDate);
    const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
    const hoursRemaining = duration * 24 - sinceSaleCreated;

    return (
        <div className="details__sunset-container">
            <SunsetBadge duration={duration} startDate={startDate}/>
            <span className="details__sunset-text">
                {`${hoursRemaining}hrs`}
            </span>
        </div>
    );
}

export default SunsetCounter;