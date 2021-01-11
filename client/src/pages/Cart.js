import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { getAllItems } from '../util';
import CartList from '../components/CartList/CartList';
import CartThumb from '../components/CartThumb/CartThumb';
import CartTotal from '../components/CartTotal/CartTotal';
import Button from '../components/Button/Button';

function Cart({cartHandlerDelete}) {

    const [cartList, setCartList] = useState(null);
 
    useEffect(() => {

        if (!cartList) {
            getCartItems();
        }

        console.log("Logging cartlist from useEffect 1", cartList);
         
    }, [cartList]);

    const getCartItems = () => {

        if (JSON.parse(localStorage.getItem("rummageCart"))) {
            axios
            .get(getAllItems)
            .then(response => {

                console.log("Logging response from getCartItems", response)
                // retreive item ids from local storage

                const currentCart = JSON.parse(localStorage.getItem("rummageCart"));

                const updatedCart = currentCart.map(cartItem => {
                    return response.data.find(resItem => resItem.id === cartItem)
                })

                setCartList(updatedCart);
            });
        }
        
    }

    // Sunset pricing
    const sunsetPricing = (item) => {
        
        const currentDate = new Date();
        const saleDate = new Date(item.yard_sale_created_at);
        const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
        const hoursRemaining = item.yard_sale_duration * 24 - sinceSaleCreated;
        const percentRemaining = hoursRemaining / (item.yard_sale_duration * 24 / 100);

        if (percentRemaining <= 25 && percentRemaining > 10) {
            return item.price * 0.5;
        } else if (percentRemaining <= 10 && percentRemaining > 5) {
            return item.price * 0.4;
        } else if (percentRemaining <= 5) {
            return item.price * 0.25;
        } else {
            return item.price;
        }
    }


    // Tally prices for cart
    const getSum = (array) => {

        console.log("Logging cartlist from tally", cartList);

        let priceArray = array.map(item => sunsetPricing(item));

        console.log("Logging price array from cart", priceArray);

        let sum = 0;

        for (let i = 0; i < priceArray.length; i++) {
            console.log("Logging priceArray at i ", priceArray[i]);
            sum += priceArray[i];
        }
        return sum;
    }


    const handleDeleteItem = (e, id) => {
        cartHandlerDelete(e, id)
        getCartItems();

    }

    if (!cartList || cartList.length === 0) {
        return (
        <div className="loading">
            <h3 className="loading__title">
                You don't have anything in your cart at the moment...
            </h3>
        </div>
        )
    }

    return (
        <section className="section section--cart">
            <div className="section__header">
                <h1 className="section__title">
                    My Cart
                </h1>
            </div>
            <CartList>
                {cartList.map((item) => {
                    
                    return (
                        <CartThumb 
                        key={item.id}
                        id={item.id}
                        itemName={item.name}
                        price={sunsetPricing(item).toFixed(2)}
                        image={item.image_URL}
                        onDelete={handleDeleteItem}
                        />
                    )
                })}
            </CartList>
            <CartTotal>
                {getSum(cartList).toFixed(2).toString()}
            </CartTotal>
            <Button buttonType="button" buttonModifier=" button--checkout">Checkout</Button>
        </section>
    );
    
}

export default Cart;