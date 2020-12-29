import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';


function AddToCart({item}) {

    const [isInCart, setIsInCart] = useState();

     // check if item is in cart
     useEffect(() => {
        if (JSON.parse(localStorage.getItem('rummageCart')).find(cartItem => cartItem === item.id )) {
            console.log('item is in cart');
            setIsInCart(true);
        } else {
            return null;
        }
    }, [item.id]
    );

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

        setIsInCart(true);

    }

    // Remove item from cart
    const handleRemoveFromCart = (_e, id) => {

        const updateCart = JSON.parse(localStorage.getItem("rummageCart"));

        const itemIndex = updateCart.indexOf(id);

        updateCart.splice(itemIndex, 1);

        localStorage
            .setItem("rummageCart",
            JSON.stringify(updateCart));
        
        setIsInCart(false);

    }

    return (
        <>
            <div className="details__price">
                {item.price.toFixed(2)}
            </div>
            <Button 
            buttonType="button" 
            onButtonClick={isInCart ? (e) => handleRemoveFromCart(e, item.id) : (e) => handleAddtoCart(e, item.id)}
            buttonModifier=" button--cart">
                {
                    isInCart ? 
                    "Remove from Cart" : 
                    "Add to Cart"
                }
            </Button> 
        </> 
    );
}

export default AddToCart;