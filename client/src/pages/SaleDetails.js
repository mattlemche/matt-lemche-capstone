import React, { Component } from 'react';
import axios from 'axios';
import { getSaleInfo } from '../util';
import Details from '../components/Details/Details';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';

class SaleDetails extends Component {

    state = {
        yardSale: null,
    }

    componentDidMount() {
        axios   
            .get(getSaleInfo(this.props.match.params.id))
            .then(response => {
                this.setState({ 
                    yardSale: response.data,
                })
            })
    }

    render() {

        if (!this.state.yardSale) {
            return (
                <div className="loading">
                    <h1 className="loading__title">
                        Just collecting some details!
                    </h1>
                    <Kettle className="loading__icon"/>
                </div>
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