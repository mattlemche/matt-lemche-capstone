import React, { Component } from 'react';
import axios from 'axios';
import { getUserInfo, getFavourites } from '../util';
import ItemList from '../components/ItemList/ItemList';
import ItemThumb from '../components/ItemThumb/ItemThumb';

class Favourites extends Component {

    state = {
        favourites: [],
    }

    componentDidMount() {
        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        console.log(getUserInfo(currentUser.userLoggedInId));
        axios
            .get(getFavourites(currentUser.userLoggedInId))
            .then(response => {
                this.setState({ 
                    favourites: response.data
                    });
            });
    }


    render() {
        if (this.state.favourites === []) {
            return (
                <h1>Favs Loading...</h1>
            );
        } 
        
        return (
            <section className="section">
                <div className="section__header">
                    <h1 className="section__title">
                        My Favs
                    </h1>
                </div>
                <ItemList>
                    {this.state.favourites.map((item) => {
                        return (
                            <ItemThumb 
                                
                            key={item.id} 
                            itemId={item.id}
                            price={item.price}
                            image={item.image_URL}
                            imageAlt={item.name}
                            />
                        )
                    })}
                </ItemList>
            </section>
        );
    }
}

export default Favourites;