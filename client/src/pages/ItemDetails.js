import React, { Component } from 'react';
import '../components/Details/Details.scss';
import axios from 'axios';
import { getItemInfo } from '../util';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';
import FavouriteButton from '../components/FavouriteButton/FavouriteButton';
import AddToCart from '../components/AddToCart/AddToCart';
import ItemHeader from '../components/ItemHeader/ItemHeader';
import ItemInfo from '../components/ItemInfo/ItemInfo';



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
                <section className="section section--item-details">
                    <ItemHeader item={this.state.saleItem}/>
                    <div className="details__content">
                        <ItemInfo item={this.state.saleItem}/>
                    </div>
                    <div className="details__favourite">
                        <FavouriteButton item={this.state.saleItem}/>
                    </div>
                    <div className="details__shop">
                        <AddToCart item={this.state.saleItem}/>
                    </div>
                </section>
            );
        }
    }
}

export default ItemDetails;