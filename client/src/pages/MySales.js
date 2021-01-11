import React, { Component } from 'react';
import axios from 'axios';
import { yardSaleDelete } from '../util';
import { getUserInfo } from '../util';
import {ReactComponent as Kettle} from '../assets/icons/kettle.svg';
import YardSaleList from '../components/YardSaleList/YardSaleList';
import YardSaleThumb from '../components/YardSaleThumb/YardSaleThumb';
import Button from '../components/Button/Button';



class MySales extends Component {

    state = ({ 
        userSales: null,
        userId: '',
        
    })
    
    componentDidMount() {
        const currentUserId = JSON.parse(sessionStorage.getItem("rummageLoggedIn")).userLoggedIn;
        this.setState({ userId: currentUserId });
        this.getSales(currentUserId);
        
    }

    getSales = (id) => {
        axios
        .get(getUserInfo(id))
        .then(response => {
            this.setState({
                userSales: response.data.yardSales,
            })
        });
    }

    handleSaleDelete = (_e, id) => {
        axios
            .delete(yardSaleDelete(id))
            .then(_response => {
                this.getSales(this.state.userId)
            })
    }

    handleCreateSale = () => {
        this.props.history.push('/new-yard-sale')
    }

    render() {
        if (!sessionStorage.getItem("rummageLoggedIn")) {
            return (
                <div className="loading">
                    <h3 className="loading__title">
                        You don't seem to be signed in!
                    </h3>
                    <Link to='/login' className="button">
                        Login / Signup
                    </Link>
                </div>
            )
        }


        if (!this.state.userSales) {
            return (
                <div className="loading">
                    <h1 className="loading__title">
                        Just collecting your sales!
                    </h1>
                    <Kettle className="loading__icon"/>
                </div>
            )
        }

        if (this.state.userSales.length === 0) {
            return (
                <div className="loading">
                    <h3 className="loading__title">
                        You don't have any Yard Sales yet!
                    </h3>
                    <Button buttonType="button" onButtonClick={this.handleCreateSale}>
                        Create a Yard Sale
                    </Button>
                </div>
            );
        }

        return (

            <section className="section">
                <div className="section__header">
                    <h1 className="section__title">
                        My Sales
                    </h1>
                </div>
                <YardSaleList>
                    {this.state.userSales.map((sale) => {
                        return (
                            <YardSaleThumb 
                            key={sale.id} 
                            saleId={sale.id}
                            name={sale.name}
                            description={sale.description}
                            location={sale.location}
                            onDelete={this.handleSaleDelete}
                            />
                        )
                    })}
                </YardSaleList>
            </section>
            

            
        );
    }
}

export default MySales;