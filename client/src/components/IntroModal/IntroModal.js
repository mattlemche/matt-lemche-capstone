import React, { useState } from 'react';
import './IntroModal.scss';
import ImageSlider from '../ImageSlider/ImageSlider';
import Button from '../Button/Button';
import { slideList } from '../../util';
import { ReactComponent as Logo } from '../../assets/logo/rummage-wordmark.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

export default function IntroModal({navigate, close}) {

    const [currentSlide, setCurrentSlide] = useState(slideList[0]);

    const handleNextSlide = (_e, slide) => {
       let newIndex = slideList.findIndex( x => x.id === slide.id ) + 1;

       if (newIndex > (slideList.length - 1)) {
           return setCurrentSlide(slideList[0]);
       }
       setCurrentSlide(slideList[newIndex]);
    }
    
    const handleSignUp = () => {
        navigate.history.push('/signup');
    }

    const slideNavHighlight = (slide) => {
        if (slide.id === currentSlide.id) {
            return "slider__nav slider__nav--active"
        }
        return "slider__nav"
    }

    const handleSlideNav = (_e, id) => {
        let newSlide = slideList.find(slide => slide.id === id);
        setCurrentSlide(newSlide);
    }

    return (
        <section className="section section--grey-out">
            <div className="intro-modal">
                <div className="intro-modal__header">
                    <div className="intro-modal__close" onClick={close}>
                        <CloseIcon className="close-icon"/>
                    </div>
                    <p className="heading1">
                        Welcome to
                    </p>
                    <Logo className="intro-modal__logo"/>
                </div>
                <ImageSlider>
                    <div className="slider__container">
                        <div className="slider__slide">
                            <img 
                            src={currentSlide.imageUrl} 
                            alt={currentSlide.alt} 
                            className="slider__image"/>

                            <div className="slider__nav-container">
                                {
                                    slideList.map(slide => {
                                        return (
                                            <div 
                                            key={slide.id} 
                                            className={slideNavHighlight(slide)}
                                            onClick={(e) => handleSlideNav(e, slide.id)}
                                            ></div>
                                        )
                                    })
                                }
                            </div>
                            
                        </div>
                    </div>
                </ImageSlider>
                <div className="intro-modal__footer">
                    <div className="intro-modal__text">
                            {currentSlide.text}
                            <span className="intro-modal__subtitle">
                                {
                                    currentSlide.subtitle
                                    ? currentSlide.subtitle
                                    : ''
                                }
                            </span>
                    </div>
                    <Button 
                    className="button" 
                    buttonType="button" 
                    onButtonClick={currentSlide.id === (slideList.length)
                        ? handleSignUp
                        : (e) => handleNextSlide(e, currentSlide)}
                    > 
                        {
                            currentSlide.id === (slideList.length)
                            ? 'Sign Up'
                            : 'Next'
                        }
                    </Button>
                </div>
            </div>
        </section>
        
    );
};
