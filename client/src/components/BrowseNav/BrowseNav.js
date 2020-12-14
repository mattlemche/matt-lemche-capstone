import React from 'react';
import './BrowseNav.scss';

const BrowseNav = (props) => {
    return (
        <nav className="browse-nav">
          {props.children}
        </nav>
    );
};

export default BrowseNav;