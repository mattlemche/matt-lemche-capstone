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

function App() {
  return (
    <Router>
      <MobileHeader />
      <main className="main">
      <Switch>
        <Route path='/browse' component={Home}/>
        <Route path='/profile' component={Profile} />
        <Route path='/my-yard-sales' component={MySales} />
        <Route path='/favourites' component={Favourites} />
        <Route path='/cart' component={Cart} />
        <Route path='/search' component={Search} />
        <Route path='/login' component={Login} />
        <Route path='/item/:id' component={ItemDetails} />
        <Route path='/yard-sale/:id' component={SaleDetails}/>
        <Redirect from='/' to='/browse' />
  
      </Switch>
       
      </main>
      <MobileNav />
    </Router>
  );
}

export default App;
