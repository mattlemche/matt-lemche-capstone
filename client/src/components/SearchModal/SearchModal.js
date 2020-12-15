import React from 'react';
import './SearchModal.scss';
import IconGroup from '../IconGroup/IconGroup';
import Button from '../Button/Button';
import { ReactComponent as Search } from '../../assets/icons/search.svg';

const SearchModal = (props) => {


    console.log("search hist obj", props.history);

    return (
        <section className="search">

            <form className="form form--search">
                <div className="form__icon-wrapper">
                    <Search className="form__icon" />
                    <input type="text" className="form__input form__input--search"/>
                </div>
                <Button buttonType="submit" buttonModifier=" button--search">Search</Button>
            </form>
            <IconGroup />
        </section>
    );
};

export default SearchModal;