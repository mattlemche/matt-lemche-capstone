import React, { Component } from 'react';
import axios from 'axios';
import { getUserInfo } from '../util';



class Profile extends Component {

    state = ({ 
        currentUser: null,
    })
    
    componentDidMount() {
        const rummageLoggedIn = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        console.log(getUserInfo(rummageLoggedIn.userLoggedIn));
        axios
            .get(getUserInfo(rummageLoggedIn.userLoggedIn))
            .then(response => {
                this.setState({
                    currentUser: response.data,
                })
            })
    }

    render() {
        if (!this.state.currentUser) {
            return (
                <h1>Profile Loading...</h1>
            )
        }
        return (
            <div>
                Profile
                <h1>{this.state.currentUser.first_name}</h1>
            </div>
        );
    }
}

export default Profile;