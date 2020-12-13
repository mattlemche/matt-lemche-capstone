import React, { Component } from 'react';
import axios from 'axios';
import { getUserInfo, getFavourites } from '../util';

class Favourites extends Component {

    state = {
        favourites: [],
    }

    componentDidMount() {
        const rummageLoggedIn = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        console.log(getUserInfo(rummageLoggedIn.userLoggedIn));
        axios
            .get(getUserInfo(rummageLoggedIn.userLoggedIn))
            .then(response => {
                const userId = response.data.id;

                axios
                    .get(getFavourites(userId))
                    .then(response => {
                        this.setState({ 
                            favourites: response.data
                         });
                    })
            })
    }


    render() {
        if (this.state.favourites === []) {
            return (
                <h1>Favs Loading...</h1>
            );
        } 
        
        return (
            <div>
                {this.state.favourites.map(favourite => {
                    return (
                    <div key={favourite.id}>{favourite.description}</div>
                    )
                })
                }
            </div>
        );
    }
}

export default Favourites;