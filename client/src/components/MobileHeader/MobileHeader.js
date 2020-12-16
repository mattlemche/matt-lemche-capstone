import React from 'react';
import './MobileHeader.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { ReactComponent as NewSaleIcon } from '../../assets/icons/new-sale-2.svg';
import { ReactComponent as Logo } from '../../assets/logo/rummage-wordmark.svg';

const MobileHeader = (props) => {

    let navigate = useHistory();

    const handleGoHome = () => {
        navigate.push('/');
    }

    return (
        <header className="mobile-header">
            <Logo className="logo logo--small" onClick={handleGoHome}/>
            <nav className="mobile-nav mobile-nav--header">
                <ul className="mobile-nav__list">
                    <li className="mobile-nav__item mobile-nav__item--header">
                        <NavLink to="/new-yard-sale" className="mobile-nav__link" activeClassName="mobile-nav__link--active">
                            <NewSaleIcon className="mobile-nav__icon"/>
                            <div className="mobile-nav__title">
                                Create
                            </div>
                        </NavLink>
                    </li>
                    <li className="mobile-nav__item mobile-nav__item--header">
                        <NavLink to="/profile" className="mobile-nav__link" activeClassName="mobile-nav__link--active">
                            <UserIcon className="mobile-nav__icon"/>
                            <div className="mobile-nav__title">
                                Profile
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            
        </header>
    );
};

export default MobileHeader;
