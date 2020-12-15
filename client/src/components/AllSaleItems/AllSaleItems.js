import React from 'react';
import './AllSaleItems.scss'
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import axios from 'axios';
import { getAllItems } from '../../util';
import {ReactComponent as Search} from '../../assets/icons/search.svg';
import Button from '../Button/Button';


class AllSaleItems extends React.Component {

    state = {
        itemArray: null,
    }

    getAllItems = () => {
        axios
            .get(getAllItems)
            .then(res => {
                this.setState({ itemArray: res.data });
            });
    }

    componentDidMount() {
        axios
            .get(getAllItems)
            .then(res => {
                this.setState({ itemArray: res.data });
            })
            .then(res => {
                let newItemArray = this.state.itemArray.filter(item => {
                    return item.description.includes("globe")
                });
                console.log("Updated with search param", newItemArray);
                this.setState({ 
                    itemArray: newItemArray,
                })
            })
        
    }

    
    componentDidUpdate(prevProps, prevState) {
        console.log("AllSaleItems is updated")
        if (prevProps !== this.props) {
            this.getAllItems();
            let newItemArray = this.state.itemArray.map(item => {
                return item.description.includes("globe")
            });
            console.log("Updated with search param", newItemArray);
            this.setState({ 
                itemArray: newItemArray,
            })
        }
    }

    render() {

        console.log("Loggin props from AllSaleItems", this.props)

        if (!this.state.itemArray) {
            return (
                <h1>Items Loading...</h1>
            )
        } else {
            return (
                <section className="section"> 
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
