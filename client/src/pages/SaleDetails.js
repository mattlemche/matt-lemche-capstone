import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { getSaleInfo } from '../util';
import { ReactComponent as Kettle } from '../assets/icons/kettle.svg';
import YardSaleHeader from '../components/YardSaleHeader/YardSaleHeader';
import YardSaleInfo from '../components/YardSaleInfo/YardSaleInfo';
import YardSaleItems from '../components/YardSaleItems/YardSaleItems';
import ItemList from '../components/ItemList/ItemList';
import ItemThumb from '../components/ItemThumb/ItemThumb';
import Button from '../components/Button/Button';


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

    const handleAddItem =(_e, saleId) => {
        props.history.push(`/new-sale-item/${saleId}`)
    }

    if (!yardSale) {
        return (
            <div className="loading">
                <h1 className="loading__title">
                    Just collecting some details!
                </h1>
                <Kettle className="loading__icon"/>
            </div>
        )
    }

    const currentDate = new Date();
    const saleDate = new Date(yardSale.created_at);
    const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
    const hoursRemaining = yardSale.duration * 24 - sinceSaleCreated;
    const percentRemaining = hoursRemaining / (yardSale.duration * 24 / 100);

    return (
        <section className="section">
            <YardSaleHeader percent={percentRemaining} hours={hoursRemaining}/>
            <YardSaleInfo item={yardSale}/>
            <YardSaleItems>
                <h3 className="yard-sale-items__header">
                    Items for Sale
                </h3>

                {
                    yardSale.saleItems.length === 0 
                    ?   <div className="yard-sale-items__add-item">
                            <h3 className="yard-sale-items__title">
                                Add an item to your Yard Sale!
                            </h3>
                            <Button buttonType="button" onButtonClick={(e) => handleAddItem(e, yardSale.id)}>
                                Add Item
                            </Button>
                        </div>
                    : ''
                }
                <ItemList>
                    {yardSale.saleItems.map((item) => {
                        return (
                            <ItemThumb 
                            percent={percentRemaining}
                            duration={item.yard_sale_duration}
                            key={item.id} 
                            itemId={item.id}
                            price={item.price}
                            image={item.image_URL}
                            imageAlt={item.name}
                            />
                        )
                    })}
                </ItemList>
            </YardSaleItems>
        </section>
    );
    
    
}


export default SaleDetails;