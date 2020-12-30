import React from 'react';
import './SunsetBadge.scss';

const SunsetBadge = ({percent}) => {

    const sunsetColour = () => {

        if (percent < 25 && percent > 10) {
            return "sunset-badge sunset-badge--25"
        } else if (percent < 10 && percent > 5) {
            return "sunset-badge sunset-badge--10"
        } else if (percent < 5) {
            return "sunset-badge sunset-badge--5"
        } else {
            return "sunset-badge"
        }
    }

    return (
        <div className={sunsetColour()}></div>
    );
};

export default SunsetBadge;