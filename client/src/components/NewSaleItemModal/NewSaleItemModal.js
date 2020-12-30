import React, { Component } from 'react';
import './NewSaleItemModal.scss';
import { categories } from '../../util';
import axios from 'axios';
import { getAllItems, getSaleInfo } from '../../util';
import Button from '../Button/Button';
import placeholder from '../../assets/images/placeholder.png';
import {ReactComponent as Kettle} from '../../assets/icons/kettle.svg';
 
class NewSaleItemModal extends Component {
    
    state = {
        currentSaleId: '',
        saleName: '',
        saleDuration: null,
        saleCreatedAt: null,
        itemName: '',
        description: '',
        condition: '',
        category: '',
        price: 0,
    }

    componentDidMount() {
        axios
            .get(getSaleInfo(this.props.match.params.id))
            .then(response => {
                this.setState({ 
                    currentSaleId: response.data.id,
                    saleName: response.data.name,
                    saleDuration: response.data.duration,
                    saleCreatedAt: response.data.created_at,
                })
            })

        
    }

    handleInputChange = (e) => {
        e.preventDefault();
        
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        
        const body = {
            itemName: this.state.itemName,
            description: this.state.description,
            image_URL: placeholder,
            category: this.state.category,
            condition: this.state.condition,
            price: this.state.price,
            yard_sale_id: this.state.currentSaleId,
            yard_sale_duration: this.state.saleDuration,
            yard_sale_created_at: this.state.saleCreatedAt,
            user_id: currentUser.userLoggedInId,
        }

        console.log("Logging body from New Sale Item", body);
        
        axios   
            .post(getAllItems, body)
            .then(response => {
                sessionStorage.setItem("rummageCurrentSaleItem", 
                    JSON.stringify({
                        saleItemId: response.data.id
                    }));
            })
            .then(_response => {
                this.props.history.push(`/image-upload/${this.state.currentSaleId}`);
            }) 
    }

    render() {

        if (!this.state.currentSaleId) {
            return (
                <div className="loading">
                    <h1 className="loading__title">
                        We're having trouble retrieving that sale...
                    </h1>
                    <Kettle className="loading__icon"/>
                </div>
            )
        }
    
        return (
            <section className="section">
                <div className="section__header">
                    <div className="section__title-container">
                        <h1 className="section__title">
                            New Sale Item
                        </h1>
                    </div>
                    
                </div>
                <div className="section__super">
                        Adding an Item to <span className="bold">{this.state.saleName}</span> Yard Sale.
                </div>
                <form onSubmit={this.handleFormSubmit} className="form">
                   
                    <label htmlFor="itemName" className="form__label">
                        Item Name
                    </label>
                    <input 
                    onChange={this.handleInputChange} 
                    type="text" 
                    name="itemName" 
                    id="itemName" 
                    className="form__input"
                    placeholder={this.state.itemName ? this.state.itemName : "What are you selling?"}/>
                    <label htmlFor="description" className="form__label">
                        Description
                    </label>
                    <textarea 
                    onChange={this.handleInputChange} 
                    type="text" 
                    name="description" 
                    id="description" 
                    className="form__input form__input--long"
                    placeholder={this.state.description ? this.state.description : "Give your item an enticing description"}
                    >
                    </textarea>
                    <label htmlFor="condition" className="form__label">
                        Condition
                    </label>
                    <select 
                    onChange={this.handleInputChange} 
                    name="condition" 
                    id="condition" 
                    defaultValue="Like New"
                    className="form__select">
                        <option value="like-new" className="form__option">
                            Like New
                        </option>
                        <option value="lightly-used" className="form__option">
                            Lightly Used
                        </option>
                        <option value="good" className="form__option">
                            Good
                        </option>
                        <option value="fair" className="form__option">
                            Fair
                        </option>
                        <option value="well-used" className="form__option">
                            Well Used
                        </option>
                    </select>
                    <label htmlFor="category" className="form__label">
                        Category
                    </label>
                    <select 
                    onChange={this.handleInputChange} 
                    name="category" 
                    id="category" 
                    className="form__select"
                    defaultValue={this.state.category ? this.state.category : null} >
                        <option className="form__option">
                            Please choose a category
                        </option>
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
                    <input 
                    onChange={this.handleInputChange} 
                    type="number" 
                    name="price" 
                    id="price" 
                    className="form__input"
                    placeholder={this.state.price}
                    />
                    <Button buttonType="submit">
                        Add Item
                    </Button>
                </form>
                
            </section>
           
        );
    };
}


export default NewSaleItemModal;