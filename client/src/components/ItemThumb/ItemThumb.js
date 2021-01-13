import React from 'react';
import { useHistory } from 'react-router-dom';
import './ItemThumb.scss';
import placeholder from '../../assets/images/placeholder.png';
import SunsetBadge from '../SunsetBadge/SunsetBadge';

const ItemThumb = ({ 
    percent,
    duration,
    price,
    itemId,
    image,
    name
 }) => {

    const navigate = useHistory();

    const handleItemCick = (e, id) => {
        navigate.push(`/item/${id}`)
    }

    const sunsetPricing = (remainder) => {

        if (remainder <= 25 && remainder > 10) {
            return (
                <span className="item-thumb__price item-thumb__price--25">
                    {
                    duration > 0
                    ? ""
                    : percent <= 25
                        ?   <div className="item-thumb__sunset">
                                <SunsetBadge percent={percent}/>
                            </div>
                        : ""
                    }
                    {(price * 0.5).toFixed(2)}
                </span>
            )
        } else if (remainder <= 10 && remainder > 5) {
            return (
                <span className="item-thumb__price item-thumb__price--10">
                    {
                    duration > 0
                    ? ""
                    : percent <= 25
                        ?   <div className="item-thumb__sunset">
                                <SunsetBadge percent={percent}/>
                            </div>
                        : ""
                    }
                    {(price * 0.4).toFixed(2)}
                </span>
                )
        } else if (remainder <= 5) {
            return (
                <span className="item-thumb__price item-thumb__price--5">
                    {
                    duration > 0
                    ? ""
                    : percent <= 25
                        ?   <div className="item-thumb__sunset">
                                <SunsetBadge percent={percent}/>
                            </div>
                        : ""
                    }
                    {(price * 0.25).toFixed(2)}
                </span>
                )
        } else {
            return (
                <span className="item-thumb__price">
                    {
                    duration > 0
                    ? ""
                    : percent <= 25
                        ?   <div className="item-thumb__sunset">
                                <SunsetBadge percent={percent}/>
                            </div>
                        : ""
                    }
                    {price.toFixed(2)}
                </span>
            )
        }
    }

    return (
        <li onClick={(e) => {handleItemCick(e, itemId)}} className="item-thumb">
            
            
            <div className="item-thumb__image-container">
                <img src={!image ? placeholder : image} alt={name} className="item-thumb__image"/>
            </div>
            {sunsetPricing(percent)}
        </li>
    );
};

export default ItemThumb;