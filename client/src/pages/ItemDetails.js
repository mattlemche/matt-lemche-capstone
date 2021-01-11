import React, { useState, useEffect} from 'react';
import '../components/FavouriteButton/FavouriteButton.scss';
import axios from 'axios';
import { getItemInfo, getSaleInfo } from '../util';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';
import FavouriteButton from '../components/FavouriteButton/FavouriteButton';
import ItemBuy from '../components/ItemBuy/ItemBuy';
import ItemHeader from '../components/ItemHeader/ItemHeader';
import ItemInfo from '../components/ItemInfo/ItemInfo';



function ItemDetails(props) {

    const [saleItem, setSaleItem] = useState(null);
    const [yardSale, setYardSale] = useState(null);

    useEffect(() => {
        if (!saleItem) {
            axios   
            .get(getItemInfo(props.match.params.id))
            .then(response => {
                setSaleItem(response.data);
                return response.data
            })
            .then(response => {
                axios
                    .get(getSaleInfo(response.yard_sale_id))
                    .then(response => {
                        setYardSale(response.data);
                    })
            });
        }
    });  

    if (!saleItem || !yardSale) {
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
            <section className="section section--item-details">
                
                    <ItemHeader item={saleItem}/>
                    <ItemInfo item={saleItem}/>
                    <div className="favourite">
                        <FavouriteButton item={saleItem}/>
                    </div>
                    
                    <ItemBuy 
                    item={saleItem} 
                    percent={percentRemaining}
                    cartHandlerAdd={props.cartHandlerAdd}
                    cartHandlerDelete={props.cartHandlerDelete}/>
                           
            </section>
        );
        }
}


export default ItemDetails;