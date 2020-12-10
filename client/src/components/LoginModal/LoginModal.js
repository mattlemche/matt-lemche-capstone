import React, { Component } from 'react';
import axios from 'axios';
import './LoginModal.scss';

class LoginModal extends Component {

    state = {
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
        axios
            .get(`http://localhost:8080/user/${username}`)
            .then(response => {
                console.log("Login attempt, response:", response)
            })
    }


    render() {
        return (
            <div className="login-modal">
                <form className="form form--login" onSubmit={this.handleLoginSubmit}>
                    <label htmlFor="userName" className="form__label">Username</label>
                    <input name="userName" type="text" className="form__input" onChange={this.handleInputChange} value={this.state.username}/>
                    <label htmlFor="password" className="form__label">Password</label>
                    <input name="password" type="password" className="form__input" onChange={this.handleInputChange} value={this.state.password}/>
                    <button type="submit" className="form__submit">Login</button>
                </form>
            </div>
        );
    }
}

export default LoginModal;