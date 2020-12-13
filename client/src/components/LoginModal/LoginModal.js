import React, { Component } from 'react';
import axios from 'axios';
import './LoginModal.scss';
import { login } from '../../util';

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
                // console.log("Login attempt, response:", response);
                this.setState({
                    isLoggedIn: true,
                    userLoggedIn: username,
                    userLoggedInId: response.data.id
                    },
                    () => {
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
            .then(response => {
                // console.log("Response and hist obj", response, this.props.history);
                this.props.history.push('/');
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