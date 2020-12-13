import React, { Component } from 'react';
import axios from 'axios';
import { getUserInfo } from '../util';
import SaleThumb from '../components/SaleThumb/SaleThumb';



class MySales extends Component {

    state = ({ 
        currentUser: null,
    })
    
    componentDidMount() {
        const rummageLoggedIn = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
        console.log(getUserInfo(rummageLoggedIn.userLoggedIn));
        axios
            .get(getUserInfo(rummageLoggedIn.userLoggedIn))
            .then(response => {
                console.log(response.data);
                this.setState({
                    
                    currentUser: response.data,
                })
            })
    }

    render() {
        if (!this.state.currentUser) {
            return (
                <h1>Loading Your Sales...</h1>
            )
        }
        return (
            <ul>
                My Sales
                {this.state.currentUser.yardSales.map(sale => {
                    return (
                    <SaleThumb location={sale.location} key={sale.id} saleId={sale.id}/>
                    )
                })}
            </ul>
        );
    }
}

export default MySales;