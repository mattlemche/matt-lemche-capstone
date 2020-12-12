import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NewSaleItemModal from '../NewSaleItemModal/NewSaleItemModal';

class ImageUpload extends Component {


    render() {
        return (
            <>
            <form>
                        <input 
                        type="file" 
                        mutiple={true} 
                        name="images" 
                        capture="environment" 
                        value={this.state.files}/> 
                        <div>
                            The current sale id is: {this.state.currentSaleId}
                        </div>
                </form>
                <Route path='/new-sale-item' render={() => {
                        <NewSaleItemModal />}} 
                />
                        
            </>
                
            
            
        );
    }
}

export default ImageUpload;