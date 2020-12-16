import React from 'react';
import './MobileNav.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as FavIcon } from '../../assets/icons/favourite.svg';
import { ReactComponent as SaleIcon } from '../../assets/icons/my-sales.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';

const MobileNav = () => {
    return (
        <footer className='mobile-footer'>
            <nav className="mobile-nav">
                <ul className="mobile-nav__list">
                    <li className="mobile-nav__item">
                        <NavLink to='/browse' className="mobile-nav__link" activeClassName="mobile-nav__link--active">
                            <HomeIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                Home
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink to='/favourites' className="mobile-nav__link" activeClassName="mobile-nav__link--active">
                            <FavIcon className="mobile-nav__icon mobile-nav__icon--fav" />
                            <div className="mobile-nav__title">
                                Favs
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink to='/my-yard-sales' className="mobile-nav__link" activeClassName="mobile-nav__link--active">
                            <SaleIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                My Sales
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item">
                        <NavLink to='/cart' className="mobile-nav__link" activeClassName="mobile-nav__link--active">
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

export default MobileNav;