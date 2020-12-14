import React from 'react';
import './Details.scss';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import IconGroup from '../IconGroup/IconGroup';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import { newFavourite } from '../../util';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';
import { ReactComponent as Heart } from '../../assets/icons/favourite-solid.svg';


const Details = ({item}) => {

    const navigate = useHistory();

    console.log("Hist obj", navigate);

    const handleGoBack = () => {
        navigate.goBack();
    }

    const handleFavourite = () => {

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));

        const body = {
            description: item.description,
            image_URL: item.image_URL,
            condition: item.condition,
            category: item.category,
            price: item.price,
            sale_item_id: item.id,
            user_id: currentUser.userLoggedInId,
        }

        console.log("Logging body from fav req post", body)

        axios
            .post(newFavourite, body)
            .then(response => {
                console.log("res from fav", response);
            })

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

                {
                    item.price ? // if viewing item details, show favourite button
                    <Button 
                    buttonType="button"
                    buttonModifier=" button--fav"
                    onButtonClick={handleFavourite}
                    >
                        <Heart className="button__icon button__icon--fav"/>
                    </Button> : // if viewing sale details, hide favourite button
                    ''
                }
                
            </div>
            {
                item.price ? // if viewing item details, show price + add
                <div className="details__shop">
                    <div className="details__price">
                        {item.price}
                    </div>
                    <Button buttonType="button">
                        Add to Cart
                    </Button>
                </div> : // if viewing sale details, show item list
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