import React, { useState, useEffect } from 'react';
import './MobileNav.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as FavIcon } from '../../assets/icons/favourite.svg';
import { ReactComponent as SaleIcon } from '../../assets/icons/my-sales.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';

export default function MobileNav({cartArray}) {

    const [cartCounter, setCartCounter] = useState([]);

    useEffect(() => {
        if (cartArray && cartArray.length !== cartCounter) {
            setCartCounter(cartArray.length);
        } else {
            return [];
        }
    }, [cartArray, cartCounter, setCartCounter]);

    console.log("Logging state from mobile nav (footer)", cartCounter)

    return (
        <footer className='mobile-footer'>
            <nav className="mobile-nav">
                <ul className="mobile-nav__list">
                    <li className="mobile-nav__item">
                        <NavLink 
                        to='/browse' 
                        className="mobile-nav__link" 
                        activeClassName="mobile-nav__link--active">
                            <HomeIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                Home
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink 
                        to='/favourites' 
                        className="mobile-nav__link" 
                        activeClassName="mobile-nav__link--active">
                            <FavIcon className="mobile-nav__icon mobile-nav__icon--fav" />
                            <div className="mobile-nav__title">
                                Favs
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink 
                        to='/my-yard-sales' 
                        className="mobile-nav__link" 
                        activeClassName="mobile-nav__link--active">
                            <SaleIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                My Sales
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink 
                        to='/cart' 
                        className="mobile-nav__link" 
                        activeClassName="mobile-nav__link--active">
                            <div className="mobile-nav__counter">
                                <div className={cartCounter > 0 ? "mobile-nav__cart-count mobile-nav__cart-count--show" : "mobile-nav__cart-count"}>
                                    {cartCounter}
                                </div>
                            </div>
                            <CartIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                Cart
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

