import React, { Component } from 'react';
import axios from 'axios';
import { getSaleInfo } from '../../util';
import Button from '../Button/Button';
import ItemThumb from '../ItemThumb/ItemThumb';

class YardSaleBuilder extends Component {

    state ={
        currentSale: null,
    }

    componentDidMount() {
        const currentSale = JSON.parse(sessionStorage.getItem("rummageCurrentSale"));

        axios
            .get(getSaleInfo(currentSale.saleId))
            .then(response => {
                console.log("Logging response from get request in sale builder", response);
                this.setState({
                    currentSale: response.data,
                });
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            const currentSale = JSON.parse(sessionStorage.getItem("rummageCurrentSale"));

            axios
                .get(getSaleInfo(currentSale.saleId))
                .then(response => {
                    console.log("Logging response from get request in sale builder", response);
                    this.setState({
                        currentSale: response.data,
                    });
                });
        }
    }

    handleAddSaleItem = (e) => {
        e.preventDefault();
        this.props.history.push('/new-sale-item')
    }

    render() {
        if (!this.state.currentSale) {
            return (
                <h1>Loading Your Sale...</h1>
            )
        }

        console.log("Loggin state from Sale Builder", this.state)

        return (
            <div>
                <h2>{this.state.currentSale.name}</h2>
                <ul>
                    {this.state.currentSale.saleItems.map(item => {
                        return (
                            <ItemThumb price={item.price} key={item.id} itemId={item.id}/>
                        )
                    })}
                </ul>
                <Button buttonText="New Yard Sale Item" onButtonClick={this.handleAddSaleItem}/>
            </div>
        );
    }
}

export default YardSaleBuilder;