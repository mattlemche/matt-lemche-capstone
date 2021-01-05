import React, { Component } from 'react';
import YardSaleThumb from '../YardSaleThumb/YardSaleThumb';
import YardSaleList from '../YardSaleList/YardSaleList';
import axios from 'axios';
import { getAllSales } from '../../util';
import {ReactComponent as Kettle} from '../../assets/icons/kettle.svg';


class AllYardSales extends Component {

    state = {
        saleArray: null,
    }

    componentDidMount() {
        axios
            .get(getAllSales)
            .then(res => {
                this.setState({ saleArray: res.data });
            })
    }

    render() {

        if (!this.state.saleArray) {
            return (
                <div className="loading">
                    <h1 className="loading__title">
                        Just collecting all the Yard Sales near you!
                    </h1>
                    <Kettle className="loading__icon"/>
                </div>
            )
        }

        return (
            <section className="section">
        
                <YardSaleList>
                {this.state.saleArray.map((sale) => {

                    const currentDate = new Date();
                    const saleDate = new Date(sale.created_at);
                    const sinceSaleCreated = Math.floor((currentDate.getTime() - saleDate.getTime()) / 1000 / 60 / 60);
                    const hoursRemaining = sale.duration * 24 - sinceSaleCreated;
                    const percentRemaining = hoursRemaining / (sale.duration * 24 / 100);

                    console.log({
                        "Logging vars from all yard sales": '',
                        "currentDate": currentDate,
                        "saleDate": saleDate,
                        "sinceSaleCreated": sinceSaleCreated,
                        "hoursRemaining": hoursRemaining,
                        "percentRemaining": percentRemaining
                    })

                    return (
                        <YardSaleThumb 
                        key={sale.id} 
                        saleId={sale.id}
                        name={sale.name}
                        description={sale.description}
                        location={sale.location}
                        items={sale.saleItems}
                        hours={hoursRemaining}
                        percent={percentRemaining}
                        />
                    )
                })}
                </YardSaleList>        
            </section>
        );
        

        
    }
}

export default AllYardSales;