import React, { Component } from 'react';
import axios from 'axios';
import { getItemInfo } from '../util';

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
                <div>
                    {this.state.saleItem.price}
                </div>
            );
        }
        
    }
}

export default ItemDetails;