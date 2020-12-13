import React, { Component } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { imageUpload } from '../../util';

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

        const saleItemId = JSON.parse(sessionStorage.getItem("rummageCurrentSaleItem"))
        
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
                    this.props.history.push('/my-new-yard-sale')
                }, 300)
                
            });
    }

    

    render() {

        if (this.state.uploadSuccess) {
            return (
                <h1>Your image has been successfully uploaded</h1>
            )
        }
        
        return (
            <>
                <Button buttonText="Back" onButtonClick={this.handleGoBack}/>
                <form onSubmit={this.handleImageUpload}>
                    <input 
                    onChange={this.handleImageChange}
                    accept="image/*"
                    type="file"
                    name="images" 
                    capture="environment" /> 
                    <Button buttonText="Add Image" buttonType="submit"/>
                </form>
                      
            </>

        );
    }
}

export default ImageUpload;