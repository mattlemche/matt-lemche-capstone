import React from 'react';
import './SunsetBanner.scss'
import SunsetBadge from '../SunsetBadge/SunsetBadge';

function SunsetBanner(props) {

    console.log("Logging props from sunset banner", props);
    return (
        <div className="sunset-banner">
            <div className="sunset-banner__sunset">
                <SunsetBadge />
            </div>
            <div className="sunset-banner__content">
                <h3 className="sunset-banner__title">
                    Sunset in Effect
                </h3>
                <p className="sunset-banner__description">
                    {`Prices are ${50}% off`}
                </p>
            </div>
        </div>
    );
}

export default SunsetBanner;