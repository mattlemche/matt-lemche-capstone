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
        } else {
            return (
                <section className="section">
            
                    <YardSaleList>
                    {this.state.saleArray.map((sale) => {
                        return (
                            <YardSaleThumb 
                            key={sale.id} 
                            saleId={sale.id}
                            name={sale.name}
                            description={sale.description}
                            location={sale.location}
                            items={sale.saleItems}
                            />
                        )
                    })}
                    </YardSaleList>        
                </section>
            );
        }

        
    }
}

export default AllYardSales;