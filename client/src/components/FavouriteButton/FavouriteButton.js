import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserFavourites, favouriteDelete } from '../../util';
import Button from '../Button/Button';
import { ReactComponent as Heart } from '../../assets/icons/favourite-solid.svg';
import { ReactComponent as HeartO } from '../../assets/icons/favourite.svg';

function FavouriteButton({item}) {

    const [isFavourite, setIsFavourite] = useState();
    const [favouriteId, setFavouriteId] = useState();

    const currentUserId = JSON.parse(sessionStorage.getItem("rummageLoggedIn"))
        ? JSON.parse(sessionStorage.getItem("rummageLoggedIn")).userLoggedInId
        : '';

    //check if item is a favourite
    useEffect(() => {
        if (currentUserId) {
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
        }
    });

    // Add item to favourites
    const handleAddToFavourites = () => {
        if (currentUserId) {
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
        } else {
            alert("You need to be signed in to add a favourite!");
        }
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

    return (
 
        <Button 
        buttonType="button"
        buttonModifier={isFavourite ? " button--fav" : " button--un-fav"}
        onButtonClick={ isFavourite ? handleUnFavourite : handleAddToFavourites}
        >
            {
                isFavourite ?
                <Heart className="button__icon button__icon--fav"/> :
                <HeartO className="button__icon button__icon--fav"/>
            }
            
        </Button>

    );
}

export default FavouriteButton;