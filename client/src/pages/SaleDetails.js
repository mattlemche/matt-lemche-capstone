import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { getSaleInfo } from '../util';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';
import YardSaleHeader from '../components/YardSaleHeader/YardSaleHeader';
import YardSaleInfo from '../components/YardSaleInfo/YardSaleInfo';
import ItemList from '../components/ItemList/ItemList';
import ItemThumb from '../components/ItemThumb/ItemThumb';


function SaleDetails(props) {

    const [yardSale, setYardSale] = useState(null);

    useEffect(() => {
        if (!yardSale) {
            axios   
            .get(getSaleInfo(props.match.params.id))
            .then(response => {
                setYardSale(response.data);
            });
        }
        
    });

    if (!yardSale) {
        return (
            <div className="loading">
                <h1 className="loading__title">
                    Just collecting some details!
                </h1>
                <Kettle className="loading__icon"/>
            </div>
        )
    } else {

        const currentDate = new Date();
        const saleDate = new Date(yardSale.created_at);
        const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
        const hoursRemaining = yardSale.duration * 24 - sinceSaleCreated;
        const percentRemaining = hoursRemaining / (yardSale.duration * 24 / 100);

        return (
            <section className="section">
                <YardSaleHeader percent={percentRemaining} hours={hoursRemaining}/>
                <div className="details__content">
                    <YardSaleInfo item={yardSale}/>
                </div>
                <div className="details__items">
                    <h3 className="details__items-title">
                        Items for Sale
                    </h3>
                    <ItemList>
                        {yardSale.saleItems.map((item) => {
                            return (
                                <ItemThumb 
                                percent={percentRemaining}
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


export default SaleDetails;