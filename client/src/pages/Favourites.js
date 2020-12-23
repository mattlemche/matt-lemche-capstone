import React, { Component } from 'react';
import axios from 'axios';
import { getUserFavourites } from '../util';
import ItemList from '../components/ItemList/ItemList';
import ItemThumb from '../components/ItemThumb/ItemThumb';

class Favourites extends Component {

    state = {
        favourites: [],
    }

    componentDidMount() {
        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        axios
            .get(getUserFavourites(currentUser.userLoggedInId))
            .then(response => {
                this.setState({ 
                    favourites: response.data.favourites,
                    });
            });
    }


    render() {
        if (this.state.favourites.length === 0) {
            return (
                <div className="loading">
                    <h3 className="loading__title">
                        You don't have any favourites yet!
                    </h3>
                </div>
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
                            itemId={item.sale_item_id ? item.sale_item_id : item.id} 
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