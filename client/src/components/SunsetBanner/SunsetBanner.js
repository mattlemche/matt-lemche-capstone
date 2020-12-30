import React from 'react';
import './SunsetBanner.scss'
import SunsetBadge from '../SunsetBadge/SunsetBadge';

function SunsetBanner({hours, percent}) {


    const sunsetPercent = (remainder) => {

        if (remainder < 25 && remainder > 10) {
            return 50
        } else if (remainder < 10 && remainder > 5) {
            return 60
        } else if (remainder < 5) {
            return 75
        } else {
            return ""
        }
    }

    const sunsetDisplay = (remainder) => {
        if (remainder <= 25) {
            return "sunset-banner sunset-banner--show"
        } else {
            return "sunset-banner"
        }
    }


    return (
        <div className={sunsetDisplay(percent)}>
            <div className="sunset-banner__sunset">
                <SunsetBadge hours={hours} percent={percent}/>
            </div>
            <div className="sunset-banner__content">
                <h3 className="sunset-banner__title">
                    Sunset in Effect
                </h3>
                <p className="sunset-banner__description">
                    {`Prices are ${sunsetPercent(percent)}% off`}
                </p>
            </div>
        </div>
    );
}

export default SunsetBanner;