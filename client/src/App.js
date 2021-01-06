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
import Login from './components/LoginModal/LoginModal';
import SignUpModal from './components/SignUpModal/SignUpModal';
import NewYardSaleModal from './components/NewYardSaleModal/NewYardSaleModal';
import NewSaleItemModal from './components/NewSaleItemModal/NewSaleItemModal';
import ImageUpload from './components/ImageUpload/ImageUpload';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';


class App extends Component {

  constructor() {
    super();

    const rummageLoggedIn = JSON.parse(sessionStorage.getItem("rummageLoggedIn"));
    const rummageCart = JSON.parse(localStorage.getItem("rummageCart"));

    this.state = {
      isLoggedIn: rummageLoggedIn ? rummageLoggedIn.isLoggedIn : '' || false,
      username: "",
      cartContents: rummageCart || [],
    };
  }

  componentDidMount() {

    if (!localStorage.getItem("rummageCart")) {
      localStorage
      .setItem("rummageCart", 
      JSON.stringify([]));
    }     
  }

  handleUserStatus = (status) => {
    if (status) {
      this.setState({
        isLoggedIn: true
      })
    } else {
      return false;
    }
  }

  handleCartAdd = (_e, id) => {
    const updateCart = JSON.parse(localStorage.getItem("rummageCart"));

    // Check if item is already in cart
    if (updateCart.find(cartId => cartId === id)) {
        return;
    }

    updateCart.push(id);

    localStorage
        .setItem("rummageCart",
        JSON.stringify(updateCart));

    this.setState({cartContents: updateCart});
  }

  handleCartDelete = (_e, id) => {
    const updateCart = JSON.parse(localStorage.getItem("rummageCart"));

    const itemIndex = updateCart.indexOf(id);

    updateCart.splice(itemIndex, 1);

    localStorage
        .setItem("rummageCart",
        JSON.stringify(updateCart));

    this.setState({cartContents: updateCart});
  }

  render() {

    console.log("Logging state from App.js", this.state);
    return (
      <Router>
        <ScrollToTop />
        <MobileHeader isLoggedIn={this.state.isLoggedIn}/>
        <main className="main">
        <Switch>
          
          <Route path='/login' render={(routeprops) => {
            return (
            <Login {...routeprops} userStatus={this.handleUserStatus} />
            )
          }} />
          <Route path='/signup' component={SignUpModal} />
          <Route path='/browse' component={Home}/>
          <Route path='/profile' component={Profile} />
          <Route path='/my-yard-sales' component={MySales} />
          <Route path='/favourites' component={Favourites} />
          <Route path='/item/:id' render={(routeprops) => {
            return (
              <ItemDetails 
              {...routeprops} 
              cartHandlerAdd={this.handleCartAdd}
              cartHandlerDelete={this.handleCartDelete}/>
            )
          }}/>
          <Route path='/yard-sale/:id' component={SaleDetails}/>
          <Route path='/cart' render={routeprops => {
            return (
              <Cart 
              {...routeprops} 
              cartHandlerDelete={this.handleCartDelete}/>
            )
          }} />
          <Route path='/new-yard-sale' component={NewYardSaleModal} />
          <Route path='/new-sale-item/:id' component={NewSaleItemModal} />
          <Route path='/image-upload/:id' component={ImageUpload} />
          <Redirect from='/' to='/browse' />
    
        </Switch>
         
        </main>
        <MobileNav cartArray={this.state.cartContents} />
      </Router>
    );
  }
}

export default App;