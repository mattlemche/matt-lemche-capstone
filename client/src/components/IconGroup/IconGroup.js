import React from 'react';
import './IconGroup.scss';

import { ReactComponent as Kettle } from '../../assets/icons/kettle.svg';
import { ReactComponent as Bauble } from '../../assets/icons/bauble.svg';
import { ReactComponent as Earrings } from '../../assets/icons/earrings.svg';
import { ReactComponent as Suitcase } from '../../assets/icons/suitcase.svg';
import { ReactComponent as Microscope } from '../../assets/icons/microscope.svg';
import { ReactComponent as Bbq } from '../../assets/icons/bbq.svg';
import { ReactComponent as Handbag } from '../../assets/icons/handbag.svg';
import { ReactComponent as HairDryer } from '../../assets/icons/hair-dryer.svg';
import { ReactComponent as HorseShoe } from '../../assets/icons/horse-shoe.svg';
import { ReactComponent as Kite } from '../../assets/icons/kite.svg';
import { ReactComponent as Necklace } from '../../assets/icons/necklace.svg';
import { ReactComponent as Tv } from '../../assets/icons/tv.svg';


const IconGroup = () => {
    return (
        <div className="icon-group">
            <div className="icon-group__content">
                <Kettle className="icon-group__icon" />
                <Bauble className="icon-group__icon" />
                <Earrings className="icon-group__icon" />
                <Suitcase className="icon-group__icon" />
                <Microscope className="icon-group__icon" />
                <Bbq className="icon-group__icon" />
                <Handbag className="icon-group__icon" />
                <HairDryer className="icon-group__icon" />
                <HorseShoe className="icon-group__icon" />
                <Kite className="icon-group__icon" />
                <Necklace className="icon-group__icon" />
                <Tv className="icon-group__icon" />
            </div>
        </div>
    );
};

export default IconGroup;