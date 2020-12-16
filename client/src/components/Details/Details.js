import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Details.scss';
import axios from 'axios';
import { getUserFavourites, favouriteDelete } from '../../util';
import Button from '../Button/Button';
import IconGroup from '../IconGroup/IconGroup';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';

import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';
import { ReactComponent as Heart } from '../../assets/icons/favourite-solid.svg';
import { ReactComponent as HeartO } from '../../assets/icons/favourite.svg';


export default function DetailsCopy({item}) {

    const [isFavourite, setIsFavourite] = useState();
    const [favouriteId, setFavouriteId] = useState();
    


    const currentUserId = JSON.parse(sessionStorage.getItem("rummageLoggedIn")).userLoggedInId;

    //check if item is already a favourite
    useEffect(() => {
        axios
            .get(getUserFavourites(currentUserId))
            .then(response => {
                const fav = response.data.favourites.filter((favourite) => {
                    return favourite.sale_item_id === item.id
                });

                return fav;
            })
            .then(response => {
                if (response.length === 0) {
                    setIsFavourite(false);
                    setFavouriteId('');
                } else {
                    setIsFavourite(true);
                    setFavouriteId(response[0].id);
                }
            });
    });

    // Add item to favourites
    const handleAddToFavourites = () => {
        let favourite = {
            ...item, 
            "user_id": currentUserId,
            "sale_item_id": item.id,
        };

        // yard_sale_id key not needed for favourite
        delete favourite.yard_sale_id;

        axios
            .post(getUserFavourites(currentUserId), favourite)
            .then(response => {
                setIsFavourite(true);
                setFavouriteId(response.data.id);
            });
    }

    // Un-favourite 
    const handleUnFavourite = () => {
        axios   
            .delete(favouriteDelete(favouriteId))
            .then(_response => {
                setIsFavourite(false);
                setFavouriteId('');
            });
    }

    const navigate = useHistory();

    const handleGoBack = () => {
        navigate.goBack();
    }


    // Add item to cart
    const handleAddtoCart = (_e, id) => {

        const updateCart = JSON.parse(localStorage.getItem("rummageCart"));

        // Check if item is already in cart
        if (updateCart.find(cartId => cartId === id)) {
            return;
        }

        updateCart.push(id);

        localStorage
            .setItem("rummageCart",
            JSON.stringify(updateCart));

    }


    return (

        
        <div className="details">
            <div className="details__header">
                <Button buttonType="button" onButtonClick={handleGoBack} buttonModifier=" button--back">
                    <BackArrow className="button__icon"/>
                </Button>

                {   // render image if url provided
                    item.image_URL ?
                    <img src={item.image_URL} alt={item.name} className="details__image"/> :
                    <IconGroup />
                }

                {   // renders time to end of sale if in yard sale view
                    item.price ?
                    '' :
                    <div className="details__sunset-container">
                        <div className="details__sunset"></div>
                        <span className="details__sunset-text">
                            14 hrs
                        </span>
                    </div>
                }
            </div>

            <div className="details__content">
                <h2 className="details__title">
                            {item.name}
                </h2>
                <div className="details__description">

                {
                    item.description ?
                    item.description :
                    'No description given'
                }
                </div>

                {
                    item.condition ?
                    <div className="details__condition">
                        <span className="details__condition-title">
                            condition:
                        </span>
                        {item.condition}
                    </div>
                        : 
                    ''
                }
            </div>

            {
                // show / hide favourite button in item / sale view

                item.price ?
                    <div className="details__favourite">
                        {   // conditionally display favorite button
                            isFavourite ?
                            <Button 
                            buttonType="button"
                            buttonModifier=" button--fav"
                            onButtonClick={handleUnFavourite}
                            >
                                <Heart className="button__icon button__icon--fav"/>
                            </Button> :
                            <Button 
                            buttonType="button"
                            buttonModifier=" button--un-fav"
                            onButtonClick={handleAddToFavourites}
                            >
                                <HeartO className="button__icon button__icon--fav"/>
                            </Button>

                        }
                    </div> : 
                    ''
            }

            {   /* conditionally show / hide pricing + add to cart 
                    when in item / sale viewing */

                item.price ? // if viewing item details, show price + add
                <div className="details__shop">
                    <div className="details__price">
                        {item.price}
                    </div>
                    <Button 
                    buttonType="button" 
                    onButtonClick={(e) => handleAddtoCart(e, item.id)}
                    buttonModifier=" button--cart">
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

