import React, { Component } from 'react';
import axios from 'axios';
import { getSaleInfo } from '../util';
import Details from '../components/Details/Details';

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
                <section className="section">
                    <Details item={this.state.yardSale} />
                </section>
            );
        }
        
    }
}

export default SaleDetails;