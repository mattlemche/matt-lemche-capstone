import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink, Switch } from 'react-router-dom';

import AllSaleItems from '../components/AllSaleItems/AllSaleItems';
import AllYardSales from '../components/AllYardSales/AllYardSales';


class Home extends Component {
   
   

    

    componentDidMount() {
        axios
            .get('http://localhost:8080/user')
            .then(response => {
            })
    }

  render() {
      const {path} = this.props.match;
    return (
        <div>
        <h1>This is the home page</h1>
        <div className="links">
         
          <NavLink to={`${path}`} exact className="link">Items</NavLink>
          <NavLink to={`${path}/yard-sales`} className="link">Yard Sales</NavLink>
        </div>
        <div className="tabs">
          <Switch>
            <Route path={`${path}`} exact component={() => <AllSaleItems />} />
            <Route path={`${path}/yard-sales`} component={() => <AllYardSales />} />
          </Switch>
        </div>
      </div>
        
    );
  }
        
    
}

export default Home;
