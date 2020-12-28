import React, { Component } from 'react';
import axios from 'axios';
import { getAllItems } from '../util';
import CartList from '../components/CartList/CartList';
import CartThumb from '../components/CartThumb/CartThumb';
import CartTotal from '../components/CartTotal/CartTotal';
import Button from '../components/Button/Button';

class Cart extends Component {

    state = {
        cartList: [],
    }

    componentDidMount() {
        this.getCartItems(); 
    }

    getCartItems = () => {

        if (JSON.parse(localStorage.getItem("rummageCart"))) {
            axios
            .get(getAllItems)
            .then(response => {

                // retreive item ids from local storage
                const currentCart = JSON.parse(localStorage.getItem("rummageCart"));

                // use ids to get item details from db
                const updatedCart = currentCart.map(cartItem => {
                    return response.data.find(resItem => resItem.id === cartItem)
                })

                this.setState({ 
                    cartList: updatedCart,
                });

            });
        }
        
    }

    // Tally prices for cart
    getSum = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].price
        }
        return sum;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.cartList.length !== prevState.cartList.length) {
            console.log("Component did update")
            this.getCartItems()
        }

        return null;
    }    

    handleDeleteItem = (_e, id) => {
        const currentCart = JSON.parse(localStorage.getItem("rummageCart"));

        const updatedCart = currentCart.filter(item => {
            return item !== id
        });

        localStorage
            .setItem("rummageCart",
            JSON.stringify(updatedCart));

        this.setState({
            cartList: updatedCart,
        })

    }

    render() {

       if (this.state.cartList.length === 0) {
           return (
            <div className="loading">
                <h3 className="loading__title">
                    You haven't anything in your cart at the moment...
                </h3>
            </div>
           )
       }

        return (
            <section className="section">
                <div className="section__header">
                    <h1 className="section__title">
                        My Cart
                    </h1>
                </div>
                <CartList>
                    {this.state.cartList.map((item) => {
                        return (
                            <CartThumb 
                            key={item.id}
                            id={item.id}
                            itemName={item.name}
                            price={item.price}
                            image={item.image_URL}
                            onDelete={this.handleDeleteItem}
                            />
                        )
                    })}
                </CartList>
                <CartTotal cartList={this.state.cartList} tally={this.getSum}/>
                <Button buttonType="button" buttonModifier=" button--checkout">Checkout</Button>
            </section>
        );
    }
}

export default Cart;