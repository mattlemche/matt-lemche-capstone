import React from 'react';
import { useHistory } from 'react-router-dom';
import IconGroup from '../IconGroup/IconGroup';
import Button from '../Button/Button';
import SunsetCounter from '../SunsetCounter/SunsetCounter';
import SunsetBanner from '../SunsetBanner/SunsetBanner';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';

function YardSaleHeader({item}) {

    console.log("Loggin props from Yard Sale Header", item);

    const navigate = useHistory();

    const handleGoBack = () => {
        navigate.goBack();
    }


    return (
        <div className="details__header">
            <Button buttonType="button" onButtonClick={handleGoBack} buttonModifier=" button--back">
                <BackArrow className="button__icon"/>
            </Button>
            <SunsetCounter duration={item.duration} startDate={item.created_at}/>
            <IconGroup />
            <SunsetBanner duration={item.duration} />
        </div>
    );
}

export default YardSaleHeader;