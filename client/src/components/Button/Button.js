import React from 'react';

const Button = ({
    buttonText,
    buttonType,
    onButtonClick,
    buttonModifier
    }) => {
        
    return (
        <button onClick={onButtonClick} type={buttonType} className={`button${buttonModifier ? buttonModifier : ''}`}>
            {buttonText}
        </button>
    );
};

export default Button;