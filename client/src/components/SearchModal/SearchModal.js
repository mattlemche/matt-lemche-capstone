import React, { Component } from 'react';
import './SearchModal.scss';
import IconGroup from '../IconGroup/IconGroup';
import Button from '../Button/Button';
import { ReactComponent as Search } from '../../assets/icons/search.svg';

class SearchModal extends Component {

    state = {
        search: '',
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value,
        })
    }

    handleSearchParams = (e) => {
        e.preventDefault();
        console.log("Search string", this.state.search);
        this.props.history.push('/bike');
    }

    render() {
        console.log("search hist obj", this.props.history);
        return (
            <section className="search">
    
                <form className="form form--search" onSubmit={this.handleSearchParams}>
                    <div className="form__icon-wrapper">
                        <Search className="form__icon" />
                        <input 
                        onChange={this.handleSearchChange}
                        value={this.state.search}
                        type="text"
                        name="search"
                        className="form__input form__input--search"/>
                    </div>
                    <Button buttonType="submit" buttonModifier=" button--search">Search</Button>
                </form>
                <IconGroup />
            </section>
        );
    }
}

export default SearchModal;