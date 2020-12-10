import React, { Component } from 'react';
import axios from 'axios';
import { getSaleInfo } from '../util';

class SaleDetails extends Component {

    state = {
        yardSale: null,
    }

    componentDidMount() {
        axios   
            .get(getSaleInfo(this.props.match.params.id))
            .then(res => {
                this.setState({ 
                    yardSale: res.data,
                })
            })
    }

    render() {

        if (!this.state.yardSale) {
            return (
                <h1>Sale loading...</h1>
            )
        } else {
            return (
                <div>
                    {this.state.yardSale.location}
                </div>
            );
        }
        
    }
}

export default SaleDetails;