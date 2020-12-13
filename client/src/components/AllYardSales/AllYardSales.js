import React, { Component } from 'react';
import SaleThumb from '../SaleThumb/SaleThumb';
import axios from 'axios';
import { getAllSales } from '../../util';


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
                <h1>Sales Loading...</h1>
            )
        } else {
            return (
                <section className="section">
                    THIS IS SALES
                    
                    <ul className="rummage-list">
                        {this.state.saleArray.map((sale) => {
                            return (
                                <SaleThumb location={sale.location} key={sale.id} saleId={sale.id}/>
                            )
                        })}
                    </ul>
        
        
                </section>
            );
        }

        
    }
}

export default AllYardSales;