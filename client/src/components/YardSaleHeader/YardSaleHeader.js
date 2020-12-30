import React from 'react';
import './YardSaleHeader.scss';
import { useHistory } from 'react-router-dom';
import IconGroup from '../IconGroup/IconGroup';
import Button from '../Button/Button';
import SunsetCounter from '../SunsetCounter/SunsetCounter';
import SunsetBanner from '../SunsetBanner/SunsetBanner';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';

function YardSaleHeader({hours, percent}) {

    const navigate = useHistory();

    const handleGoBack = () => {
        navigate.goBack();
    }

    return (
        <div className="yard-sale-header">
            <Button buttonType="button" onButtonClick={handleGoBack} buttonModifier=" button--back">
                <BackArrow className="button__icon"/>
            </Button>
            <SunsetCounter hours={hours} percent={percent} />
            <IconGroup />
            <SunsetBanner hours={hours} percent={percent} />
        </div>
    );
}

export default YardSaleHeader;