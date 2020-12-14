import React, { Component } from 'react';
import axios from 'axios';
import { getItemInfo } from '../util';

import SaleItemDetails from '../components/SaleItemDetails/SaleItemDetails';



class ItemDetails extends Component {

    state = {
        saleItem: null,
    }

    componentDidMount() {
        axios   
            .get(getItemInfo(this.props.match.params.id))
            .then(res => {
                this.setState({ 
                    saleItem: res.data,
                })
            })
    }

    render() {

        if (!this.state.saleItem) {
            return (
                <h1>Item loading...</h1>
            )
        } else {
            return (
                <section className="section">
                    <SaleItemDetails item={this.state.saleItem}/>
                </section>
            );
        }
        
    }
}

export default ItemDetails;