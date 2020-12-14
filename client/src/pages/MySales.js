import React, { Component } from 'react';
import axios from 'axios';
import { getUserInfo } from '../util';
import YardSaleList from '../components/YardSaleList/YardSaleList';
import YardSaleThumb from '../components/YardSaleThumb/YardSaleThumb';



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
                console.log("Respomnse from get user info", response.data);
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
        console.log("State", this.state.currentUser);
        return (

            <section className="section">
                <div className="section__header">
                    <h1 className="section__title">
                        My Sales
                    </h1>
                </div>
                <YardSaleList>
                    {this.state.currentUser.yardSales.map((sale) => {
                        return (
                            <YardSaleThumb 
                            key={sale.id} 
                            saleId={sale.id}
                            name={sale.name}
                            description={sale.description}
                            location={sale.location}
                            />
                        )
                    })}
                </YardSaleList>
            </section>
            

            
        );
    }
}

export default MySales;