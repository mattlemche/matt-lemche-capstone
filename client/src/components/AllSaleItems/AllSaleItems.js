import React from 'react';
import ItemList from '../ItemList/ItemList';
import ItemThumb from '../ItemThumb/ItemThumb';
import axios from 'axios';
import { getAllItems } from '../../util';


class AllSaleItems extends React.Component {

    state = {
        itemArray: null,
    }

    getAllItems = () => {
        axios
            .get(getAllItems)
            .then(res => {
                this.setState({ itemArray: res.data });
            });
    }

    componentDidMount() {
       this.getAllItems()
    }

    
    componentDidUpdate(prevProps, prevState) {
        console.log("AllSaleItems is updated")
        if (prevProps != this.props) {
            this.getAllItems();
            let newItemArray = this.state.itemArray.map(item => {
                item.description.includes("globe")
            });

            this.setState({ 
                itemArray: newItemArray,
            })
        }
    }

    render() {

        console.log("Loggin props from AllSaleItems", this.props)

        if (!this.state.itemArray) {
            return (
                <h1>Items Loading...</h1>
            )
        } else {
            return (
                <section className="section">                   
                    <ItemList>
                        {this.state.itemArray.map((item) => {
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

    
};

export default AllSaleItems;
