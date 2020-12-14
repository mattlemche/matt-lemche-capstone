import React from 'react';
import './MobileNav.scss';
import { Link } from 'react-router-dom';
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
                        <Link to='/browse' className="link link--mobile-nav">
                            <HomeIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                Home
                            </div>
                        </Link>
                    </li>
                    <li className="mobile-nav__item">
                        <Link to='/favourites' className="link link--mobile-nav">
                            <FavIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                Favs
                            </div>
                        </Link>
                    </li>
                    <li className="mobile-nav__item">
                        <Link to='/my-yard-sales' className="link link--mobile-nav">
                            <SaleIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                My Sales
                            </div>
                        </Link>
                    </li>
                    <li className="mobile-nav__item">
                        <Link to='/cart' className="link link--mobile-nav">
                            <CartIcon className="mobile-nav__icon" />
                            <div className="mobile-nav__title">
                                Cart
                            </div>
                        </Link>
                    </li>

                </ul>
            </nav>
            
        </footer>
    );
};

export default MobileNav;