import React, { Component } from 'react';
import axios from 'axios';
import { getAllItems } from '../util';
import CartList from '../components/CartList/CartList';
import CartThumb from '../components/CartThumb/CartThumb';
import CartTotal from '../components/CartTotal/CartTotal';
import Button from '../components/Button/Button';

class Cart extends Component {

    state = {
        cartList: []
    }

    componentDidMount() {

        axios
            .get(getAllItems)
            .then(response => {
                console.log("Logging response from get in cart", response.data);
                this.setState({ 
                    cartList: response.data,
                });

            })
    }

    getSum = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i].price
        }
        return sum;
    }

    render() {
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