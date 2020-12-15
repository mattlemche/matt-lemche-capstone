import { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch,  Redirect, Route } from 'react-router-dom';
import MobileNav from './components/MobileNav/MobileNav';
import MobileHeader from './components/MobileHeader/MobileHeader';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import MySales from './pages/MySales';
import Cart from './pages/Cart';
import ItemDetails from './pages/ItemDetails';
import SaleDetails from './pages/SaleDetails';
import Search from './components/SearchModal/SearchModal';
import Login from './components/LoginModal/LoginModal';
import NewYardSaleModal from './components/NewYardSaleModal/NewYardSaleModal';
import NewSaleItemModal from './components/NewSaleItemModal/NewSaleItemModal';
import ImageUpload from './components/ImageUpload/ImageUpload';
import NoMatchPage from './pages/NoMatchPage';

class App extends Component {

  constructor() {
    super();

    const rummageLoggedIn = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));

    this.state = rummageLoggedIn || {
      isLoggedIn: false,
      username: "",
    };
  }
  
  render() {
    console.log("logging state from home page", this.state);

    return (
      <Router>
        <MobileHeader />
        <main className="main">
        <Switch>
          
          <Route path='/login' component={Login} />
          <Route path='/browse' component={Home}/>
          <Route path='/profile' component={Profile} />
          <Route path='/my-yard-sales' component={MySales} />
          <Route path='/favourites' component={Favourites} />
          <Route path='/item/:id' component={ItemDetails} />
          <Route path='/yard-sale/:id' component={SaleDetails}/>
          <Route path='/cart' component={Cart} />
          <Route path='/search' component={Search} />
          <Route path='/new-yard-sale/' component={NewYardSaleModal} />
          <Route path='/new-sale-item/:id' component={NewSaleItemModal} />
          <Route path='/image-upload' component={ImageUpload} />
          <Redirect from='/' to='/browse' />
          <Route component={NoMatchPage} />
    
        </Switch>
         
        </main>
        <MobileNav />
      </Router>
    );
  }
}

export default App;