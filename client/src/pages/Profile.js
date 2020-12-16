import React, { Component } from 'react';
import axios from 'axios';
import { getUserInfo } from '../util';
import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';



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
                <div className="loading">
                    <h1 className="loading__title">
                        Just loading your profile!
                    </h1>
                    <Kettle className="loading__icon"/>
                </div>
            )
        }
        return (
            <section className="section">
                <div className="section__header">
                    <h1 className="section__title">
                        Profile
                    </h1>
                </div>
                <ProfileDetails currentUser={this.state.currentUser}/>
            </section>
        );
    }
}

export default Profile;