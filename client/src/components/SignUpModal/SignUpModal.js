import React, { Component } from 'react';
import axios from 'axios';
import {newUser} from '../../util';
import Button from '../Button/Button';

class SignUpModal extends Component {

    state = {
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        province: '',
        postal: '',
       
    }

    handleInputChange = (e) => {
        e.preventDefault();
        
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSignUpSubmit = (e) => {
        e.preventDefault();

        const body = {
            username: this.state.userName,
            password: this.state.password,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            profile_image: "",
            location: {
                city: this.state.city,
                province: this.state.province,
                postal: this.state.postal,
            },
        }

        axios
            .post(newUser, body)
            .then(response => {
                sessionStorage
                        .setItem("rummageLoggedIn", 
                        JSON.stringify({ 
                            isLoggedIn: true,
                            userLoggedIn: response.data.username,
                            userLoggedInId: response.data.id
                        }));
                        return response.data;
            })
            .then(response => {
                this.props.history.push(`/`)
            })
    }

    render() {
        return (
            <section className="section section--signup">
                <div className="section__header">
                    <h1 className="section__title">
                        Sign Up
                    </h1>
                </div>
                <form onSubmit={this.handleSignUpSubmit} className="form form--signup">
                   
                   <label htmlFor="userName" className="form__label">
                       UserName
                   </label>
                   <input 
                   onChange={this.handleInputChange} 
                   value={this.state.username}
                   type="text" 
                   name="userName" 
                   id="userName" 
                   className="form__input"/>
                   <label htmlFor="password" className="form__label">
                       Password
                   </label>
                   <input 
                   onChange={this.handleInputChange} 
                   value={this.state.password} 
                   type="password" 
                   name="password" 
                   id="password" 
                   className="form__input"/>
                   <fieldset className="form__group">
                   <label htmlFor="firstName" className="form__label">
                      First Name
                   </label>
                   <input 
                   onChange={this.handleInputChange} 
                   value={this.state.firstName}
                   type="text" 
                   name="firstName" 
                   id="firstName" 
                   className="form__input"/>
                   <label htmlFor="lastName" className="form__label">
                      Last Name
                   </label>
                   <input 
                   onChange={this.handleInputChange} 
                   value={this.state.lastName}
                   type="text" 
                   name="lastName" 
                   id="lastName" 
                   className="form__input"/>
                   <label htmlFor="email" className="form__label">
                      Email Address
                   </label>
                   <input 
                   onChange={this.handleInputChange} 
                   value={this.state.email}
                   type="email" 
                   name="email" 
                   id="email" 
                   className="form__input"/>
                   <label htmlFor="phone" className="form__label">
                      Phone Number
                   </label>
                   <input 
                   onChange={this.handleInputChange}
                   value={this.state.phone}
                   type="text" 
                   name="phone" 
                   id="phone" 
                   className="form__input"/>
                   </fieldset>
                   <fieldset name="location" className="form__group">
                        <label htmlFor="city" className="form__label">
                            City
                        </label>
                        <input
                        onChange={this.handleInputChange} 
                        value={this.state.city}
                        type="text" 
                        name="city" 
                        id="city" 
                        className="form__input"
                        placeholder={this.state.city ? this.state.city : 'Your city'}
                        />
                        <label htmlFor="province" className="form__label">
                            Province
                        </label>
                        <select
                        onChange={this.handleInputChange} 
                        value={this.state.province}
                        type="text" 
                        name="province" 
                        id="province" 
                        className="form__select"
                        placeholder={this.state.province ? this.state.province : ''}
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
                        value={this.state.postal}
                        type="text" 
                        name="postal" 
                        id="postal" 
                        className="form__input"
                        placeholder={this.state.postal ? this.state.postal : 'Your postal code'}
                        />
                    </fieldset>
                  
                   <Button buttonType="submit">
                       Sign Up
                   </Button>
               </form>
                
            </section>
        );
    }
}

export default SignUpModal;