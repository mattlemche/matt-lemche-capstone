import React from 'react';
import './YardSaleThumb.scss'
import { useHistory, Link } from 'react-router-dom';
import { ReactComponent as YardSaleIcon } from '../../assets/icons/my-sales.svg';
import { ReactComponent as Trash } from '../../assets/icons/trash-2.svg';
import Button from '../Button/Button';

const SaleThumb = ({ 
    saleId, 
    name, 
    description,
    location,
    items,
    onDelete
    }) => {

    const navigate = useHistory();

    const handleItemCick = (_e, id) => {
        navigate.push(`/yard-sale/${id}`)
    }

    const handleSaleAddItem = (_e, id) => {
        navigate.push(`/new-sale-item/${id}`)
    }


    const saleLocation = JSON.parse(location);

    return (
        <li className="yard-sale-thumb">

            {
                items ? // if viewing in browse, show item count
                <div className="yard-sale-thumb__counter">
                <YardSaleIcon className="yard-sale-thumb__icon"/>
            <span className="yard-sale-thumb__item-count">{`${items.length} Items`}</span>
                </div> : // if viewing in my sales, show edit buttons 
                <div className="yard-sale-thumb__edit">
                    
                    <Button buttonType="button" onButtonClick={(e) => handleSaleAddItem(e, saleId)} buttonModifier=" button--edit">
                        <span className="plus">+</span>
                        Add Item
                    </Button>
                </div>
            }
            
            <div className="yard-sale-thumb__content" onClick={(e) => {handleItemCick(e, saleId)}}>
                <h3 className="yard-sale-thumb__name">
                    {name}
                </h3>
                <p className="yard-sale-thumb__description">
                    {description}
                </p>
                {
                    items ? // if viewing in browse, hide sale detail link
                    '' : //if viewing in my sales, show sale detail link
                    <Link to={`/yard-sale/${saleId}`} className="yard-sale-thumb__link">View details</Link>
                
                }
            </div>
            {
                items ? // if viewing in browse, show location
                <div className="yard-sale-thumb__location">     
                    {saleLocation.city}, {saleLocation.province}
                </div> : // if viewing in my sales, hide location and show delete button
                <Button buttonType="button" onButtonClick={(e) => onDelete(e, saleId)} buttonModifier=" button--delete">
                    <Trash className="button__icon button__icon--delete" />
                </Button>
            }
            
        
        </li>
    );
};

export default SaleThumb;