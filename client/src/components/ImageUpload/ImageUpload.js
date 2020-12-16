import React, { Component } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { imageUpload } from '../../util';
import { ReactComponent as BackArrow } from '../../assets/icons/back.svg';

class ImageUpload extends Component {

    state = {
        uploadSuccess: false,
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState !== this.state) {
            console.log(this.state)
        }
    }

    handleGoBack = () => {
        this.props.history.goBack();
    }

    handleImageUpload = (e) => {
        e.preventDefault();

        const saleItemId = JSON.parse(sessionStorage.getItem("rummageCurrentSaleItem"));
        
        const formdata = new FormData();
        formdata.append("avatar", e.target.images.files[0], e.target.images.files[0].name);

        axios
            .put(imageUpload(saleItemId.saleItemId), formdata)
            .then(_response => {
                this.setState({
                    uploadSuccess: true,
                })
            })
            .then(_response => {
                setTimeout(() => {
                    this.props.history.push(`/yard-sale/${this.props.match.params.id}`)
                }, 300)
                
            });
    }

    

    render() {

        console.log("Logging props from image upload", this.props)

        if (this.state.uploadSuccess) {
            return (
                <h1>Your image has been successfully uploaded</h1>
            )
        }
        
        return (
            <section className="section">
                <div className="section__header">
                    Image Upload
                </div>
                <Button buttonType="button" onButtonClick={this.handleGoBack} buttonModifier=" button--previous">
                    <BackArrow className="button__icon button__icon--previous"/> Back
                </Button>
                <form onSubmit={this.handleImageUpload} className="form">
                    <input 
                    onChange={this.handleImageChange}
                    accept="image/*"
                    type="file"
                    name="images" 
                    capture="environment"
                    className="form__input form__input--image-upload" /> 
                    <Button buttonType="submit" buttonModifier=" button--add-image">
                        Add Image
                    </Button>
                </form>
                      
            </section>

        );
    }
}

export default ImageUpload;