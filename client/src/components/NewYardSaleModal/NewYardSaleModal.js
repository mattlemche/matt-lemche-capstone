import React, { Component } from 'react';
import '../NewSaleItemModal/NewSaleItemModal.scss';
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

    // through line 48, create controlled components for form
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
                user_id: currentUser.userLoggedInId,
            }
    
            axios   
                .post(getAllSales, body)
                .then(response => {
                    sessionStorage.setItem("rummageCurrentSale", 
                        JSON.stringify({
                            saleId: response.data.id,
                            saleName: response.data.name
                        }));
                })
                .then(_response => {
                    this.props.history.push('/my-yard-sales');
                });
        } else {
            return alert("You need to be signed in to create a yard sale!");
        }

        axios   
            .post(getAllSales, body)
            .then(response => {
                sessionStorage.setItem("rummageCurrentSale", 
                    JSON.stringify({
                        saleId: response.data.id,
                        saleName: response.data.name
                    }));
            })
            .then(_response => {
                this.props.history.push('/my-yard-sales');
            })
            
    }

    render() {

        return (
            <section className="section">
                <div className="section__header">
                    <h1 className="section__title">
                        New Yard Sale
                    </h1>
                </div>
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
                    placeholder={this.state.name ? this.state.name : 'Give your yard sale a catchy name!'}
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
                    className="form__input form__input--long"
                    placeholder={this.state.description ? this.state.description : `Describe your yard sale. Grab buyers' attention with some highlights.`}
                    ></textarea>
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
                        placeholder={this.state.location.city ? this.state.location.city : 'Your city'}
                        />
                        <label htmlFor="province" className="form__label">
                            Province
                        </label>
                        <select
                        onChange={this.handleInputChange} 
                        value={this.state.location.province}
                        type="text" 
                        name="province" 
                        id="province" 
                        className="form__select"
                        placeholder={this.state.location.province ? this.state.location.province : ''}
                        >
                            <option value="" className="form__option">
                                Please select your province
                            </option>
                            <option value="AB" className="form__option">
                                AB
                            </option>
                            <option value="BC" className="form__option">
                                BC
                            </option>
                            <option value="MB" className="form__option">
                                MB
                            </option>
                            <option value="NB" className="form__option">
                                NB
                            </option>
                            <option value="NL" className="form__option">
                                NL
                            </option>
                            <option value="NT" className="form__option">
                                NT
                            </option>
                            <option value="NS" className="form__option">
                                NS
                            </option>
                            <option value="NU" className="form__option">
                                NU
                            </option>
                            <option value="ON" className="form__option">
                                ON
                            </option>
                            <option value="PE" className="form__option">
                                PE
                            </option>
                            <option value="QC" className="form__option">
                                QC
                            </option>
                            <option value="SK" className="form__option">
                                SK
                            </option>
                            <option value="YT" className="form__option">
                                YT
                            </option>
                        </select>
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
                        placeholder={this.state.location.postal ? this.state.location.postal : 'Your postal code'}
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
                        <div className="form__radio-pair">
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
                        </div>
                        <div className="form__radio-pair">
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
                        </div>
                    </fieldset>
                    <Button buttonType="submit">
                        Create Yard Sale
                    </Button>
                </form>
            </section>
        );
    }
}

export default NewYardSaleModal;