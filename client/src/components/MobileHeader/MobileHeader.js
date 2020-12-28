import React, { Component } from 'react';
import './MobileHeader.scss';
import { NavLink } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as NewSaleIcon } from '../../assets/icons/new-sale-2.svg';
import { ReactComponent as Logo } from '../../assets/logo/rummage-wordmark.svg';

class MobileHeader extends Component {

    state = {
        isLoggedIn: false
    }

    componentDidMount() {
        // if (JSON.parse(sessionStorage.getItem("rummageLoggedIn"))) {
        //     this.setState({ isLoggedIn: true });
        // }

        if (this.props.isLoggedIn) {
            this.setState({ isLoggedIn: true });
        }

        return null;
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            console.log("Working");
        }

        return null;
    }
    

    render() {
        console.log("props from header Nav", this.props);
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
                            !this.state.isLoggedIn
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
    }
}

export default MobileHeader;