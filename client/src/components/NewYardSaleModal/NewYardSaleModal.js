import React, { Component } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { getAllSales } from '../../util';

class NewYardSaleModal extends Component {

    state = {
        saleName: '',
        description: '',
        location: {
            city: '',
            province: '',
            postal: '',
        },
        duration: 0,
        retrieval: false,
    }

    handleInputChange = (event) => {
        event.preventDefault();
        let newValue = event.target.value;  
        
        this.setState({
            saleName: event.target.name === 'saleName' ? newValue : this.state.saleName,
            description: event.target.name === 'description' ? newValue : this.state.description,
            location:{
                city: event.target.name === 'city' ? newValue : this.state.location.city,
                province: event.target.name === 'province' ? newValue : this.state.location.province,
                postal: event.target.name === 'postal' ? newValue : this.state.location.postal
            },
            duration: event.target.name === 'duration' ? newValue : this.state.duration,
        })
    }

    handleShipping = () => {
        this.setState({
            retrieval: true,
        })
    }

    handlePickup = () => {
        this.setState({
            retrieval: false,
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        
        const body = {
            location: this.state.location,
            name: this.state.saleName,
            description: this.state.description,
            duration: this.state.duration,
            status: "active",
            user_id: currentUser.userLoggedInId,
        }

        
        axios   
            .post(getAllSales, body)
            .then(response => {
                console.log("This is the response from new sale post", response)
                sessionStorage.setItem("rummageCurrentSale", 
                    JSON.stringify({
                        saleId: response.data.id
                    }));
            })
            .then(_response => {
                this.props.history.push('/my-new-yard-sale');
            })
            
    }

    render() {

        return (
            <>
                <form onSubmit={this.handleFormSubmit} className="form">
                    <label htmlFor="saleName" className="form__label">
                        Yard Sale Name
                    </label>
                    <input 
                    onChange={this.handleInputChange} 
                    value={this.state.saleName} 
                    type="text" 
                    name="saleName" 
                    id="saleName" 
                    className="form__input"
                    />
                    <label htmlFor="description" className="form__label">
                        Description
                    </label>
                    <textarea 
                    onChange={this.handleInputChange} 
                    value={this.state.description} 
                    type="text" 
                    name="description" 
                    id="description" 
                    className="form__input"
                    />
                    <fieldset name="location" className="form__group">
                        <label htmlFor="city" className="form__label">
                            City
                        </label>
                        <input
                        onChange={this.handleInputChange} 
                        value={this.state.location.city}
                        type="text" 
                        name="city" 
                        id="city" 
                        className="form__input"
                        />
                        <label htmlFor="province" className="form__label">
                            Province
                        </label>
                        <input
                        onChange={this.handleInputChange} 
                        value={this.state.location.province}
                        type="text" 
                        name="province" 
                        id="province" 
                        className="form__input"
                        />
                        <label htmlFor="postal" className="form__label">
                            Postal Code
                        </label>
                        <input 
                        onChange={this.handleInputChange} 
                        value={this.state.location.postal}
                        type="text" 
                        name="postal" 
                        id="postal" 
                        className="form__input"
                        />
                    </fieldset>
                    <label htmlFor="duration" className="form__label">
                        Yard Sale Duration
                    </label>
                    <select 
                    onChange={this.handleInputChange} 
                    value={this.state.duration} 
                    name="duration" 
                    id="duration" 
                    className="form__select">
                        <option className="form__option">
                            0
                        </option>
                        <option value={1} className="form__option">
                            1 Day
                        </option>
                        <option value={2} className="form__option">
                            2 Days
                        </option>
                        <option value={3} className="form__option">
                            3 Days
                        </option>
                    </select>
                    <fieldset className="form__group">
                        <input 
                        onChange={this.handleShipping} 
                        type="radio" 
                        name="retrieval" 
                        id="shipping" 
                        value="true" 
                        className="form__radio"
                        />
                        <label htmlFor="shipping" className="form__label">
                            Shipping Available
                        </label>
                        <input 
                        onChange={this.handlePickup}
                        type="radio" 
                        name="retrieval" 
                        id="pick-up" 
                        value="false" 
                        className="form__radio"
                        />
                        <label htmlFor="pick-up" className="form__label">
                            Pick-up Only
                        </label>
                    </fieldset>
                    <Button buttonText="Create Yard Sale" buttonType="submit"/>
                </form>
                
                
            </>
        );
    }
}

export default NewYardSaleModal;