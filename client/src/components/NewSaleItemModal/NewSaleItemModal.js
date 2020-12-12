import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import { categories } from '../../util';
import axios from 'axios';
import { getAllItems } from '../../util';
import Button from '../Button/Button';
 
class NewSaleItemModal extends Component {
    state = {
        currentSaleId: '',
        itemName: '',
        description: '',
        condition: '',
        category: '',
        price: 0,
    }

    componentDidMount() {
        const currentSale = JSON.parse(sessionStorage.getItem("rummageCurrentSale"))
        ?
        JSON.parse(sessionStorage.getItem("rummageCurrentSale"))
        : {saleId: 0};

        this.setState({ 
            currentSaleId: currentSale.saleId ? currentSale.saleId : '',
        })
    }

    handleInputChange = (e) => {
        e.preventDefault();
        
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        
        const body = {
            itemName: this.state.itemName,
            description: this.state.description,
            image_URL: "something",
            category: this.state.category,
            condition: this.state.condition,
            price: this.state.price,
            yard_sale_id: this.state.currentSaleId,
            user_id: currentUser.userLoggedInId,
        }
        
        console.log("this is the body for the new item req", body)
        
        axios   
            .post(getAllItems, body)
            .then(response => {
                console.log("This is the response from new sale post", response)
            });
            // .then(response => {
            //     this.props.history.push('/new-sale-item');
            // });
            
    }

    render() {

        console.log(this.state)
        if (!sessionStorage.getItem("rummageCurrentSale")) {
            return (
                <h1>You aren't building a sale right now</h1>
            )
        }
    
        return (
            <>
                <form onSubmit={this.handleFormSubmit} className="form">
                   
                    <div>
                        The current sale id is: {this.state.currentSaleId}
                    </div>
                    <label htmlFor="itemName" className="form__label">
                        Item Name
                    </label>
                    <input onChange={this.handleInputChange} type="text" name="itemName" id="itemName" className="form__input"/>
                    <label htmlFor="description" className="form__label">
                        Description
                    </label>
                    <textarea onChange={this.handleInputChange} type="text" name="description" id="description" className="form__input"/>
                    <label htmlFor="condition" className="form__label">
                        Condition
                    </label>
                    <select onChange={this.handleInputChange} name="condition" id="condition" className="form__select">
                        <option value="well-used" className="form__option">Well Used</option>
                        <option value="fair" className="form__option">Fair</option>
                        <option value="good" className="form__option">Good</option>
                        <option value="lightly-used" className="form__option">Lightly Used</option>
                        <option value="like-new" selected={true} className="form__option">Like New</option>
                    </select>
                    <label htmlFor="category" className="form__label">
                        Category
                    </label>
                    <select onChange={this.handleInputChange} name="category" id="category" className="form__select">
                        <option selected={true} disabled={true} className="form__option">Please choose a category</option>
                        {categories.map(category => {
                            return (
                                <option value={category} key={category} className="form__option">
                                    {category}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="price" className="form__label">
                        Price
                    </label>
                    <input onChange={this.handleInputChange} type="number" name="price" id="price" className="form__input"/>
                    <Button buttonText="Add Item" buttonType="submit"/>
                </form>
                
            </>
           
        );
    };
}


export default NewSaleItemModal;