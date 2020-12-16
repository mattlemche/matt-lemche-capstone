import React from 'react';
import "./Button.scss"

const Button = ({
    buttonType,
    onButtonClick,
    buttonModifier,
    children
    }) => {
        
    return (
        <button onClick={onButtonClick} type={buttonType} className={`button${buttonModifier ? buttonModifier : ''}`}>
            {children}
        </button>
    );
};

export default Button;