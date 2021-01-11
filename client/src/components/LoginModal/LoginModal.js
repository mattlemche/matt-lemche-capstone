import React, { Component } from 'react';
import axios from 'axios';
import './LoginModal.scss';
import { Link } from 'react-router-dom';
import { login } from '../../util';
import Button from '../Button/Button';
import { ReactComponent as Logo } from '../../assets/logo/rummage-wordmark.svg';
import { ReactComponent as HorseShoe } from '../../assets/icons/horse-shoe.svg';
import { ReactComponent as HandBag } from '../../assets/icons/handbag.svg';
import { ReactComponent as Kettle } from '../../assets/icons/kettle.svg';

class LoginModal extends Component {

    state = {
        isLoggedIn: false,
        userLoggedIn: '',
        userLoggedInId: '',
        userName: '',
        password: '',
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ 
            [e.target.name]: e.target.value,
         });
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        const username = e.target.userName.value

        const body = {
            username: username,
            password: e.target.password.value,
        }

        axios
            .post(login(username), body)
            .then(response => {
                this.setState({
                    isLoggedIn: true,
                    userLoggedIn: username,
                    userLoggedInId: response.data.id
                    },
                    () => {
                        // add user info to session storage
                    sessionStorage
                        .setItem("rummageLoggedIn", 
                        JSON.stringify({ 
                            isLoggedIn: this.state.isLoggedIn, 
                            userLoggedIn: this.state.userLoggedIn,
                            userLoggedInId: this.state.userLoggedInId
                        }));
                    }
                );
            })
            .then(_response => {
                this.props.userStatus(true)
                
            })
            .then(_response => {
                //direct user to home screen
                return this.props.history.push('/');
            })
            .catch(error => {
                alert("You've entered an incorrect username or password. Please try again.");
                console.log("Error from login", error);
            })
    }


    render() {
        return (
            <section className="section section--login">
                <Logo className="section__logo"/>
                <div className="sun"></div>
                <form className="form form--login" onSubmit={this.handleLoginSubmit}>
                    <label htmlFor="userName" className="form__label">
                        Username
                    </label>
                    <input 
                    name="userName" 
                    type="text" c
                    lassName="form__input" 
                    onChange={this.handleInputChange} 
                    value={this.state.username}/>
                    <label htmlFor="password" className="form__label">
                        Password
                    </label>
                    <input 
                    name="password" 
                    type="password" 
                    className="form__input" 
                    onChange={this.handleInputChange} 
                    value={this.state.password}/>
                    <Button buttonType="submit" buttonModifier=" button--login">
                        Login
                    </Button>
                    <Link to='/signup' className="link link--signup">
                        Sign Up
                    </Link>
                    
                </form>
                <div className="icon-bubble-container">
                    <div className="icon-bubble">
                        <Kettle className="icon-bubble__icon"/>
                    </div>
                    <div className="icon-bubble">
                    <HorseShoe className="icon-bubble__icon"/>
                    </div>
                    <div className="icon-bubble">
                    <HandBag className="icon-bubble__icon"/>
                    </div>
                </div>
                
            </section>
        );
    }
}

export default LoginModal;