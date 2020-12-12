import React, { Component } from 'react';
import Button from '../Button/Button';
import axios from 'axios';

class ImageUpload extends Component {

    state = {
        formData: {},
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            console.log(this.state)
        }
    }

    handleGoBack = () => {
        this.props.history.goBack();
    }

    handleImageUpload = (e) => {
        e.preventDefault();

        console.log(e.target.images.files);
        
        const formdata = new FormData();
        formdata.append("avatar", e.target.images.files[0], e.target.images.files[0].name);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        axios
            .post('http://localhost:8080/avatar-upload', formdata)
            .then(response => {
                console.log(response);
            })

        
    }

    handleImageChange = (event) => {
        // if (event.target.files && event.target.files[0]) {
        //     console.log("We got a live one", event.target.files[0]);
        //     const formData = new FormData();
        //     formData.append("image", event.target.files[0], "image-name.jpg");
        //     this.setState({
        //         formData,
        //     });

            
        // }
    }

    render() {
        
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