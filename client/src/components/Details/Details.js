import React, { Component } from 'react';
import './Details.scss';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import IconGroup from '../IconGroup/IconGroup';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import { newFavourite, favouriteDelete } from '../../util';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';
import { ReactComponent as Heart } from '../../assets/icons/favourite-solid.svg';
import { ReactComponent as HeartO } from '../../assets/icons/favourite.svg';


class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFavourite: false,
            favouriteId: null,
            currentUser: {},
        }
    }

    componentDidMount() {

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"))

        axios
            .get(newFavourite)
            .then(response => {
                console.log("Res from fav get", response);
                const currentItem = response.data.find(item => item.sale_item_id === this.props.item.id);

                console.log({
                    "Current User": currentUser,
                    "Current Item": currentItem,
                    "Props": this.props,
                    "History": this.props.history,
                })

                if (currentItem.user_id === currentUser.userLoggedInId) {
                    this.setState({
                        isFavourite: true,
                    })
                } else {
                    this.setState({
                        isFavourite: false,
                    })
                }
            })
    }

    handleGoBack = () => {
        this.props.history.goBack();
    }

    handleFavourite = () => {

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));

        const body = {
            description: this.props.item.description,
            image_URL: this.props.item.image_URL,
            condition: this.props.item.condition,
            category: this.props.item.category,
            price: this.props.item.price,
            sale_item_id: this.props.item.id,
            user_id: currentUser.userLoggedInId,
        }

        console.log("Logging body from fav req post", body)

        axios
            .post(newFavourite, body)
            .then(response => {
                console.log("res from fav", response);
            })

    }

    handleUnFavourite = () => {

        const currentUser = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));

        // axios
        //     .delete(favouriteDelete(this.props.))
    }

    render() {

        console.log( this.state.isFavourite ? 'Fav' : 'Not a fav')
        return (
            <div className="details">
                
                <div className="details__header">
                    <Button buttonType="button" onButtonClick={this.handleGoBack} buttonModifier=" button--back">
                        <BackArrow className="button__icon"/>
                    </Button>
                    {
                        this.props.item.image_URL ?
                        <img src={this.props.item.image_URL} alt="" className="details__image"/> :
                        <IconGroup />
                    }
                </div>
                <div className="details__content">
                    <h2 className="details__title">
                        {this.props.item.name}
                    </h2>
                    <div className="description">
                    {
                        this.props.item.description ?
                        this.props.item.description :
                        'No description given'
                    }
                    </div>
    

                    {
                        this.state.isFavourite ?
                        <Button 
                        buttonType="button"
                        buttonModifier=" button--fav"
                        onButtonClick={this.handleFavourite}
                        >
                           <Heart className="button__icon button__icon--fav"/>
                        </Button> :
                        <Button 
                        buttonType="button"
                        buttonModifier=" button--un-fav"
                        onButtonClick={this.handleUnFavourite}
                        >
                            <HeartO className="button__icon button__icon--fav"/>
                        </Button>

                    }
                    
                    
                </div>
                {
                    this.props.item.price ? // if viewing item details, show price + add
                    <div className="details__shop">
                        <div className="details__price">
                            {this.props.item.price}
                        </div>
                        <Button buttonType="button">
                            Add to Cart
                        </Button>
                    </div> : // if viewing sale details, show item list
                    <div className="details__items">
                        <h3 className="details__items-title">
                            Items for Sale
                        </h3>
                        <ItemList>
                        {this.props.item.saleItems.map((item) => {
                            return (
                                <ItemThumb 
                                    
                                key={this.props.item.id} 
                                itemId={this.props.item.id}
                                price={this.props.item.price}
                                image={this.props.item.image_URL}
                                imageAlt={this.props.item.name}
                                />
                            )
                        })}
                    </ItemList>
                    </div>
                }
                
            </div>
        );
    }
}

export default Details;