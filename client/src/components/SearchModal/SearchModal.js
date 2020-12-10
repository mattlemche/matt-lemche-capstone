import React from 'react';
import './SearchModal.scss';

const SearchModal = (props) => {

    const handleGoBack = () => {
        props.history.goBack();
    }

    console.log("search hist obj", props.history);

    return (
        <section className="search">

            This is search!
            <button type="button" onClick={handleGoBack} className="search__button">Done</button>
        </section>
    );
};

export default SearchModal;