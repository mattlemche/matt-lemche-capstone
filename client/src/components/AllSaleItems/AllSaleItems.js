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

    const [itemArray, setItemArray] = useState([]);
    const [search, setSearch] = useState('');

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    // Get all sale items from db
    const getAllSaleItems = () => {
        axios
            .get(getAllItems)
            .then(res => {
                setItemArray(res.data);
            })
            .catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                  console.log('Request canceled', thrown.message);
                } else {
                  // handle error
                  
                }
            });
    }

    useEffect(() => {
        let isMounted = true;

        if (itemArray.length === 0) {
            if (isMounted) {
                getAllSaleItems();
            }
        }
        
        return () => {isMounted = false};
        
    }, [itemArray]);

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

                    return item.name.toLowerCase().includes(`${search.toLowerCase()}`) || 
                    item.description.toLowerCase().includes(`${search.toLowerCase()}`);
                });

                if (newItemArray.length === 0) {
                   return setSearch('No results');
                } else {
                    setItemArray(newItemArray);
                }

                
            });
        e.target.reset();
    }

    source.cancel('Operation canceled by the user.');
   
    if (!itemArray) {
        return (
            <div className="loading">
                <h1 className="loading__title">
                    Just collecting some great stuff!
                </h1>
                <Kettle className="loading__icon"/>
            </div>
        )
    } 

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
            search === 'No results' ?
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
    

        
};

