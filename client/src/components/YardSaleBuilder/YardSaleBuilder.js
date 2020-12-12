import React, { Component } from 'react';
import axios from 'axios';
import { getSaleInfo } from '../../util';

class YardSaleBuilder extends Component {

    state ={
        currentSale: null,
    }

    componentDidMount() {
        const currentSale = JSON.parse(sessionStorage.getItem("rummageCurrentSale"));

        axios
            .get(getSaleInfo(currentSale.saleId))
            .then(response => {
                this.setState({
                    currentSale: response.data,
                })
            })
    }

    render() {
        if (this.state.currentSale) {
            return (
                <h1>Loading Your Sale...</h1>
            )
        }

        console.log("Loggin state from Sale Builder", this.state)

        return (
            <div>
                
            </div>
        );
    }
}

export default YardSaleBuilder;