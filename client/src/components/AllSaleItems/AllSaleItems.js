import React, { useState, useEffect } from 'react';
import './AllSaleItems.scss';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import axios from 'axios';
import { getAllItems } from '../../util';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Kettle } from '../../assets/icons/kettle.svg';
import Button from '../Button/Button';


export default function AllSaleItems() {

    const [itemArray, setItemArray] = useState(null);
    const [search, setSearch] = useState('');

    // Get all sale items from db
    const getAllSaleItems = (bool) => {
        axios
            .get(getAllItems)
            .then(res => {
                if (bool) {
                    setItemArray(res.data);
                }
            });
    }

    useEffect(() => {
        let isMounted = true;
        if (!itemArray) {
            getAllSaleItems(isMounted);
        }
        
        return () => {isMounted = false};
    });

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    // Search functionality
    const handleSearchParams = (e) => {
        e.preventDefault();
        axios
            .get(getAllItems)
            .then(response => {
                let newItemArray = response.data.filter(item => {

                    return item.name.toLowerCase().includes(`${this.state.search.toLowerCase()}`) || 
                    item.description.toLowerCase().includes(`${this.state.search.toLowerCase()}`);
                });
                setItemArray(newItemArray);
            });
        e.target.reset();
    }
   
        
    if (!itemArray) {
        return (
            <div className="loading">
                <h1 className="loading__title">
                    Just collecting some great stuff!
                </h1>
                <Kettle className="loading__icon"/>
            </div>
        )
    } else {

        return (
            <section className="section"> 
                <div className={`search${window.location.pathname === '/search' ? ' search--show' : ''}`}>
                    <form className="form form--search" onSubmit={handleSearchParams}>
                        <div className="form__icon-wrapper">
                            <Search className="form__icon" />
                            <input 
                            onChange={handleSearchChange}
                            value={search}
                            type="text"
                            name="search"
                            className="form__input form__input--search"/>
                        </div>
                        <Button buttonType="submit" buttonModifier=" button--search">Find</Button>
                    </form>
                </div> 

            
            {
                // If search results are empty, render:
                itemArray.length === 0 ?
                <div className="no-results">
                    <div className="no-results__content">
                        <h3 className="no-results__title">Oh shoot!</h3>
                        <span className="no-results__copy">
                        Seems like no one is selling that currently.
                        </span>
                    </div>
                </div> : 
                ''
            }                  
            <ItemList>
                {itemArray.map((item) => {
                    const currentDate = new Date();
                    const saleDate = new Date(item.yard_sale_created_at);
                    const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
                    const hoursRemaining = item.yard_sale_duration * 24 - sinceSaleCreated;
                    const percentRemaining = hoursRemaining / (item.yard_sale_duration * 24 / 100);

                    return (
                        <ItemThumb 
                        key={item.id} 
                        itemId={item.id}
                        price={item.price}
                        image={item.image_URL}
                        imageAlt={item.name}
                        percent={percentRemaining}
                        />
                    )
                })}
            </ItemList>

            </section>
        );
    }

        
};

