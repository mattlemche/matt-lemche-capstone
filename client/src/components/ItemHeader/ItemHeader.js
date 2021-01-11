import React from 'react';
import './ItemHeader.scss';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';

function ItemHeader({item}) {

    const navigate = useHistory();

    const handleGoBack = () => {
        navigate.goBack();
    }

    return (
        <div className="item-header">
            <Button buttonType="button" onButtonClick={handleGoBack} buttonModifier=" button--back">
                <BackArrow className="button__icon"/>
            </Button>
                <img src={item.image_URL} alt={item.name} className="item-header__image"/>
        </div>
    );
}

export default ItemHeader;