import React, { useState, useEffect } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import BrowseNav from '../components/BrowseNav/BrowseNav';
import AllSaleItems from '../components/AllSaleItems/AllSaleItems';
import AllYardSales from '../components/AllYardSales/AllYardSales';
import IntroModal from '../components/IntroModal/IntroModal';

export default function Home(props) {

  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (JSON.parse(localStorage.getItem("rummageVisted")) || JSON.parse(sessionStorage.getItem("rummageLoggedIn"))) {
        setFirstVisit(false);
      } else {
        setFirstVisit(true);
        localStorage
        .setItem("rummageVisted", 
        JSON.stringify(true));
        return () => { isMounted = false };
      }    
    }

    return () => { isMounted = false };
    
  }, [setFirstVisit]);

  const {path} = props.match;

  const showHideIntro = (bool) => {
    if (bool) {
        return 'section section--grey-out'
    }
    return 'section section--hide'
  }

  const handleClose = () => {
      setFirstVisit(false);
  }

  return (

    <>
      <IntroModal 
      navigate={props} 
      showHide={showHideIntro} 
      close={handleClose}
      firstVisit={firstVisit}/>
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
    </>
      
  );

        
    
};
