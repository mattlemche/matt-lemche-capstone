import React, { Component } from 'react';
import axios from 'axios';
import { getSaleInfo } from '../util';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';
import YardSaleHeader from '../components/YardSaleHeader/YardSaleHeader';
import YardSaleInfo from '../components/YardSaleInfo/YardSaleInfo';
import ItemList from '../components/ItemList/ItemList';
import ItemThumb from '../components/ItemThumb/ItemThumb';


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
                    <YardSaleHeader item={this.state.yardSale}/>
                    <div className="details__content">
                        <YardSaleInfo item={this.state.yardSale}/>
                    </div>
                    <div className="details__items">
                        <h3 className="details__items-title">
                            Items for Sale
                        </h3>
                        <ItemList>
                            {this.state.yardSale.saleItems.map((item) => {
                                return (
                                    <ItemThumb 
                                        
                                    key={item.id} 
                                    itemId={item.id}
                                    price={item.price}
                                    image={item.image_URL}
                                    imageAlt={item.name}
                                    />
                                )
                            })}
                        </ItemList>
                    </div>
                </section>
            );
        }
        
    }
}

export default SaleDetails;