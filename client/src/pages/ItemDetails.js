import React, { Component } from 'react';
import axios from 'axios';
import { getItemInfo } from '../util';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';
import Details from '../components/Details/Details';



class ItemDetails extends Component {

    state = {
        saleItem: null,
    }

    componentDidMount() {
        axios   
            .get(getItemInfo(this.props.match.params.id))
            .then(response => {
                this.setState({ 
                    saleItem: response.data,
                })
            })
    }

    render() {

        if (!this.state.saleItem) {
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
                    <Details item={this.state.saleItem}/>
                </section>
            );
        }
    }
}

export default ItemDetails;