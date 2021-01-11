import React from 'react';
import './SunsetCounter.scss';
import SunsetBadge from '../SunsetBadge/SunsetBadge';

function SunsetCounter({hours, percent}) {


    return (
        <div className="sunset-counter">
            <div className="sunset-counter__sunset">
                <SunsetBadge percent={percent}/>
            </div>
            <span className="sunset-counter__hours">
                {`${hours}hrs`}
            </span>
        </div>
    );
}

export default SunsetCounter;