import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import BrowseNav from '../components/BrowseNav/BrowseNav';
import AllSaleItems from '../components/AllSaleItems/AllSaleItems';
import AllYardSales from '../components/AllYardSales/AllYardSales';




class Home extends Component {
   

  render() {
    const {path} = this.props.match;

    if (!sessionStorage.getItem("rummageLoggedIn")) {
      this.props.history.push('/login');
    }

    return (
      <div>
        <BrowseNav>
          <NavLink to={`${path}`} exact className="browse-nav__link" activeClassName="browse-nav__link--active">Items</NavLink>
          <NavLink to={`${path}/yard-sales`} className="browse-nav__link" activeClassName="browse-nav__link--active">Yard Sales</NavLink>
        </BrowseNav>
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
