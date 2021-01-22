import React from 'react';
import './ImageSlider.scss';

function ImageSlider(props) {

    return (
        <section className="slider">
            {props.children}
        </section>
    );
}

export default ImageSlider;