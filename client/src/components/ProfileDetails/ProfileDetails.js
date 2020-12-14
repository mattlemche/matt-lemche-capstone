import React from 'react';
import './ProfileDetails.scss';
import { ReactComponent as Microscope } from '../../assets/icons/microscope.svg';

const ProfileDetails = ({currentUser}) => {

    const location = JSON.parse(currentUser.location);

    return (
    <div className="profile">
        <div className="profile__avatar">
            {
                currentUser.image_URL ?
                <img src={currentUser.image_URL} alt={currentUser.name} className="profile__image"/> :
                <Microscope className="profile__default-avatar"/>

            }
            
        </div>
        <div className="profile__content">
            <div className="profile__name">
            {`${currentUser.first_name} ${currentUser.last_name}`}
            </div>
            <div className="profile__detail-container">
                <div className="profile__detail">
                    <span className="profile__label">
                        Username:
                    </span>
                    {currentUser.username}
                </div>
                <div className="profile__detail">
                    <span className="profile__label">
                        Location:
                    </span>
                    {`${location.city}, ${location.province}`}
                </div>
                <div className="profile__detail">
                    <span className="profile__label">
                        Yard Sales:
                    </span>
                    {currentUser.yardSales.length}
                </div>
            </div>
        </div>
    </div>
    );
};

export default ProfileDetails;