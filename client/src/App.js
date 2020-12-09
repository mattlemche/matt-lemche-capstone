import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import MySales from './pages/MySales';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/profile/:id' component={Profile} />
        <Route path='/my-sales/:id' component={MySales} />
        <Route path='/favourites/:id' component={Favourites} />
        <Route path='/cart/:id' component={Cart} />
      </Switch>

    </Router>
  );
}

export default App;
