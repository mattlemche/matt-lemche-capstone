import React from 'react';
import ItemThumb from '../ItemThumb/ItemThumb';
import axios from 'axios';
import { getAllItems } from '../../util';


class AllSaleItems extends React.Component {

    state = {
        itemArray: null,
    }

    componentDidMount() {
        axios
            .get(getAllItems)
            .then(res => {
                this.setState({ itemArray: res.data });
            })
    }

    render() {

        if (!this.state.itemArray) {
            return (
                <h1>Items Loading...</h1>
            )
        } else {
            return (
                <section className="section">
                    THIS IS ITEMS
                   
                    <ul className="rummage-list">
                        {this.state.itemArray.map((item) => {
                            return (
                                <ItemThumb price={item.price} key={item.id} itemId={item.id}/>
                            )
                        })}
                    </ul>
        
        
                </section>
            );
        }

        
    }

    
};

export default AllSaleItems;
