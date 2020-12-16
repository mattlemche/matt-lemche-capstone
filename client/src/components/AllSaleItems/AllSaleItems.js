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
                    this.state.itemArray.length === 0 ?
                    <div className="no-results">
                        <div className="no-results__content">
                            <h3 className="no-results__title">Oh shoot!</h3>
                            <span className="no-results__copy">
                            It doesn't seem that anyone is selling that currently.
                            </span>
                        </div>
                    </div> : 
                    ''
                }                  
                <ItemList>
                    {this.state.itemArray.map((item) => {
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
        
        
                </section>
            );
        }

        
    }

    
};

export default AllSaleItems;
