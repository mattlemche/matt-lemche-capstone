import React from 'react';
import './Details.scss';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import IconGroup from '../IconGroup/IconGroup';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';


const Details = ({item}) => {

    const navigate = useHistory();

    console.log("Hist obj", navigate);

    const handleGoBack = (props) => {
        navigate.goBack();
    }

    return (
        <div className="details">
            
            <div className="details__header">
                <Button buttonType="button" onButtonClick={handleGoBack} buttonModifier=" button--back">
                    <BackArrow className="button__icon"/>
                </Button>
                {
                    item.image_URL ?
                    <img src={item.image_URL} alt="" className="details__image"/> :
                    <IconGroup />
                }
            </div>
            <div className="details__content">
                <h2 className="details__title">
                    {item.name}
                </h2>
                <div className="description">
                {
                    item.description ?
                    item.description :
                    'No description given'
                }
                </div>
                
            </div>
            {
                item.price ?
                <div className="details__shop">
                    <div className="details__price">
                        {item.price}
                    </div>
                    <Button buttonType="button">
                        Add to Cart
                    </Button>
                </div> :
                <div className="details__items">
                    <h3 className="details__items-title">
                        Items for Sale
                    </h3>
                    <ItemList>
                    {item.saleItems.map((item) => {
                        return (
                            <ItemThumb 
                                
                            key={item.id} 
                            itemId={item.id}
                            price={item.price}
                            image={item.image_URL}
                            imageAlt={item.name}
                            />
                        )
                    })}
                </ItemList>
                </div>
            }
            
        </div>
    );
};

export default Details;