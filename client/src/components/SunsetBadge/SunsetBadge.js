import React from 'react';

const SunsetBadge = ({duration, startDate}) => {

    const currentDate = new Date();
    const saleDate = new Date(startDate);

    const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
    const hoursRemaining = duration * 24 - sinceSaleCreated;

    const sunsetColour = () => {
        const percentRemaining = hoursRemaining / (duration * 24 / 100);

        if (percentRemaining < 25 && percentRemaining > 10) {
            return "details__sunset details__sunset--25"
        } else if (percentRemaining < 10 && percentRemaining > 5) {
            return "details__sunset details__sunset--10"
        } else if (percentRemaining < 5) {
            return "details__sunset details__sunset--5"
        } else {
            return "details__sunset"
        }
    }

    return (
        <div className={sunsetColour()}></div>
    );
};

export default SunsetBadge;