import React, { useState, useEffect} from 'react';
import './MobileHeader.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as NewSaleIcon } from '../../assets/icons/new-sale-2.svg';
import { ReactComponent as Logo } from '../../assets/logo/rummage-wordmark.svg';

export default function MobileHeader(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (props.isLoggedIn && !isLoggedIn) {
            setIsLoggedIn(true);
        }

        return null;
    }, [isLoggedIn, props.isLoggedIn]);

   
    return (
        <header className="mobile-header">
            <NavLink  to='/' className="home-link">
                <Logo className="logo logo--small"/>
            </NavLink>
            <nav className="mobile-nav mobile-nav--header">
                <ul className="mobile-nav__list">
                    <li className="mobile-nav__item mobile-nav__item--header">
                        <NavLink 
                        to="/new-yard-sale" 
                        className="mobile-nav__link" 
                        activeClassName="mobile-nav__link--active">
                            <NewSaleIcon className="mobile-nav__icon"/>
                            <div className="mobile-nav__title">
                                Create
                            </div>
                        </NavLink>
                    </li>
                    
                    {
                        !isLoggedIn
                        ? <li className="mobile-nav__item mobile-nav__item--header">
                            <NavLink 
                            to="/login" 
                            className="mobile-nav__link" 
                            activeClassName="mobile-nav__link--active">
                                <UserIcon className="mobile-nav__icon"/>
                                <div className="mobile-nav__title">
                                    Login
                                </div>
                            </NavLink>
                            </li>
                        : <li className="mobile-nav__item mobile-nav__item--header">
                            <NavLink 
                            to="/profile" 
                            className="mobile-nav__link" 
                            activeClassName="mobile-nav__link--active">
                                <UserIcon className="mobile-nav__icon"/>
                                <div className="mobile-nav__title">
                                    Profile
                                </div>
                            </NavLink>
                            </li>
                    }
                </ul>
            </nav>
            
        </header>
    );
    
};