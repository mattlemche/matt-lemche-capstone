import React from 'react';
import './AllSaleItems.scss';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import axios from 'axios';
import { getAllItems } from '../../util';
import {ReactComponent as Search} from '../../assets/icons/search.svg';
import { ReactComponent as Kettle} from '../../assets/icons/kettle.svg';
import Button from '../Button/Button';


class AllSaleItems extends React.Component {

    state = {
        itemArray: null,
        search: '',
    }
    
    // Get all sale items from db
    getAllItems = () => {
        axios
            .get(getAllItems)
            .then(res => {
                this.setState({ itemArray: res.data });
            });
    }

    componentDidMount() {
        this.getAllItems();
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value,
        });
    }

    // Search functionality
    handleSearchParams = (e) => {
        e.preventDefault();
        axios
            .get(getAllItems)
            .then(response => {
                let newItemArray = response.data.filter(item => {

                    return item.name.toLowerCase().includes(`${this.state.search.toLowerCase()}`) || 
                    item.description.toLowerCase().includes(`${this.state.search.toLowerCase()}`);
                });
                this.setState({ 
                    itemArray: newItemArray,
                });
            });
        e.target.reset();
    }

    render() {     
        
        if (!this.state.itemArray) {
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
                        <form className="form form--search" onSubmit={this.handleSearchParams}>
                            <div className="form__icon-wrapper">
                                <Search className="form__icon" />
                                <input 
                                onChange={this.handleSearchChange}
                                value={this.state.search}
                                type="text"
                                name="search"
                                className="form__input form__input--search"/>
                            </div>
                            <Button buttonType="submit" buttonModifier=" button--search">Find</Button>
                        </form>
                    </div> 

                
                {
                    // If search results are empty, render:
                    this.state.itemArray.length === 0 ?
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
                    {this.state.itemArray.map((item) => {
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

        
    }

    
};

export default AllSaleItems;
